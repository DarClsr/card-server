
import axios from "axios";
import jsZip from "jszip"
import {join} from "path"
import {readFileSync,createWriteStream,statSync,createReadStream} from "fs"
import {PassThrough} from "stream"
import crypto from "crypto"
import {request} from "http"
import FormData from "form-data";
const http=axios.create({
    baseURL:" https://openapi.baidu.com/"
})

let baseURL="https://openapi.baidu.com/oauth/2.0/authorize"

const disk={
    client_id:"Br2KUvxV6FZeSwC4SpSyMX04PgEjbu41",
    redirect_uri:"oob",
    client_secret:"79alTrC5VC1aL9RT5fycM7ByDThShdSi"
}


export class AuthService {
    accessToken:string
    constructor(){
        this.accessToken="121.6df65cb71b5709d7330a3e0ca96b0d5d.YlIbFeE-oplb4DA5ut-XACKo428GYfXdtey33in.W6Nv-Q"
    }

    /**
     * 
     * 获取code
     */
    getDiskCode(){
       let params:any={
        response_type:"code",
        scope:"basic,netdisk",
        client_id:disk.client_id,
        redirect_uri:disk.redirect_uri,
        force_login:1,
       }
       const querys=Object.keys(params).map(key=>`${key}=${params[key]}`).join("&");
       return baseURL+"?"+querys
    }

      /**
     * 
     * 获取Token
     */
    async getAccessToken(code="adab800c78bb6404cd2ebe6c9a663059"){
       try{
        const res=await http.get("oauth/2.0/token",{
            params:{
                grant_type:"authorization_code",
                code,
                client_secret:disk.client_secret,
                client_id:disk.client_id,
                redirect_uri:disk.redirect_uri
            }
        })

        return res.data;
       }catch(e:any){
           console.log(e.response.data)
       }

    }


  /**
     * 
     * 创建压缩包
     */
    async createZip(){
        const zipFile=new jsZip();
        let fileList=[
            "01.mp4",
            "02.mp4"
        ]
        const zipDir = zipFile.folder("素材");

        if(!zipDir){
            return false;
        }
        const basePath=join(__dirname,"../../public/file")

        for(let file of fileList){
            const fileData=readFileSync(join(basePath,file));
            zipDir.file(file, fileData);
        }
        const zipFileBlob=await zipFile.generateAsync({type:"nodebuffer"});
        // buffer转成可读流
        const bufferStream= new PassThrough();
        const readStream=bufferStream.end(zipFileBlob);
        const writer = createWriteStream(join(basePath,"example.zip"))
        let len=0;

        readStream.on('data', function (chunk) {
            console.log(chunk.length);
            len += chunk.length;
            writer.write(chunk, ()=>{
                console.log("写入了一个chunk");
            })
        });
        readStream.on('end', function () {
           writer.close();
           console.log("write end success")
        });
    }

    /**
     * 获取需要上传的文件信息
     * 
     */
    async getFileInfo(url:string):Promise<{size:number,num:number}>{
        const info=statSync(url);
        const size= 4 * 1024 * 1024
        return {
            size: info.size,
            num:  Math.ceil(info.size / size)
        }
    }

    /**
     * 
     * 获取分片文件信息
     */

     getfile(url:string,i:number){
        const size= 4 * 1024 * 1024
        return new Promise((resolve,reject)=>{
                let data:any = '';
            let start = i * size
            let end = (i + 1) * size - 1
            const stream = createReadStream(url, {
                start,
                end
            })
            stream.on('data', (chunk) => {
                if (!data) {
                    data = chunk
                } else {
                    data = Buffer.concat([data, chunk])
                }
            });
            stream.on('end', () => {
                resolve(data)
            });
        })
    }

    get formatStr(){
          return (obj:any)=>Object.keys(obj).map(key=>`${key}=${obj[key]}`).join("&");
    }

    /**
     * 生成md5值
     * 
     */
     async getmd5list(url:string,info:{size:number,num:number}){
       let promistlist = []
        // fs.createReadStream
        for (let i = 0; i < info.num; i++) {
            let data:any = await this.getfile( url, i)
            const hash = crypto.createHash('md5'); // 创建一个md5加密的hash
            hash.update(data); // 更新内容
            const md5 = hash.digest('hex'); // 返回计算内容
            console.log(md5);
            promistlist.push(md5)
        }
        return promistlist
     }

    /**
     * 预上传 第一步 
     */
    async preUploadFile(){
        console.log("预上传开始")
        const basePath=join(__dirname,"../../public/file","example.zip")
        const info=await  this.getFileInfo(basePath);
        console.log(basePath,info)
        let block_list:any = await this.getmd5list(basePath, info)
        block_list = JSON.stringify(block_list)
        let data:{
            [key:string]:string|number|[]
        } = {
            path: encodeURI("/apps/test/exmaple.zip"), //这是你的上传地址 需要进行url编码
            size: info.size, //上传大小
            isdir: 0, // 是不是文件夹 0 文件 1 文件夹
            autoinit: 1,
            block_list, // md5的list 注意按顺序
            rtype: 1, 
        }
       
        const preUplaodUrl=`http://pan.baidu.com/rest/2.0/xpan/file?method=precreate&access_token=${this.accessToken}`
        const res:any=await http.post(preUplaodUrl,this.formatStr(data))
        this.upload({
            url:basePath,
            info,
            uploadid: res.data.uploadid,
            pian: res.data.block_list
        })

        
    }
    /**
     * 
     * 根据预上传接口 来完成分片上传 和 分片合并
     */
    async upload(params:{url:string,info:any,uploadid:string,pian:any}){
        let fileList=[];
        for (let i of params.pian) {
            console.log(`上传第${i}个分片开始`)
            let data = await  this.getfile( params.url, i )
            const superInfo=await this.uploadSuperFile(i,data,params.uploadid) // 循环上传需要上传的分片
            fileList.push(superInfo.md5)
            console.log(`上传第${i}个分片完成`)
        }

        // 创建文件 合并分片
        console.log(`上传分片完成`)
        console.log(`合并分片开始`)
        console.log(fileList)
        await this.mergeFile(params.info,params.uploadid,fileList);
    }
    /**
     * 上传分片接口 
     */
    async uploadSuperFile(i:number,data:any,uploadid:string){
        let urls = `https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?` // 请求地址
        
            let params={
                path: encodeURI("/apps/test/exmaple.zip"), 
                access_token: this.accessToken, // 你的token
                method: 'upload', // 默认
                type: "tmpfile", // 默认
                uploadid, //还是返回的uploadid
                partseq: i // 这个是分片的编号
            }

                const res=await http.put(urls+this.formatStr(params),
                data,
                {
                    headers: {
                        'Content-Type':'multipart/form-data', //这是格式
                      }
                }
                )
                console.log(res.data)
                return res.data
            
    }

    /**
     * 
     *合并文件接口
     */
    async mergeFile(info:any,uploadid:string,fileList:any){
        const mergeUrl=`https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=${this.accessToken}`;
        let data:{
            [key:string]:string|number|[]
        } = {
            path: encodeURI("/apps/test/exmaple.zip"), //这是你的上传地址 需要进行url编码
            size: info.size, //上传大小
            isdir: 0, // 是不是文件夹 0 文件 1 文件夹
            uploadid,
            block_list:JSON.stringify(fileList), // md5的list 注意按顺序
            rtype: 1, 
        }
        try{
            const res=await http.post(mergeUrl,this.formatStr(data))
        return  res.data
        }catch(e){
            console.log(e,"error") 
        }

      
    }

} 

export default new AuthService()