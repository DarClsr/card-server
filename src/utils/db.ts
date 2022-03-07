import mongoose from "mongoose";


export const connectDb=async ()=>{
    const url:string=process.env.DBURL||"";
    try{
    await mongoose.connect(url); 
    }catch(e){
        console.log(e)
        process.exit(1)
    }
    
}