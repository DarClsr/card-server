"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var axios_1 = __importDefault(require("axios"));
var jszip_1 = __importDefault(require("jszip"));
var path_1 = require("path");
var fs_1 = require("fs");
var stream_1 = require("stream");
var crypto_1 = __importDefault(require("crypto"));
var http = axios_1.default.create({
    baseURL: " https://openapi.baidu.com/"
});
var baseURL = "https://openapi.baidu.com/oauth/2.0/authorize";
var disk = {
    client_id: "Br2KUvxV6FZeSwC4SpSyMX04PgEjbu41",
    redirect_uri: "oob",
    client_secret: "79alTrC5VC1aL9RT5fycM7ByDThShdSi"
};
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.accessToken = "121.6df65cb71b5709d7330a3e0ca96b0d5d.YlIbFeE-oplb4DA5ut-XACKo428GYfXdtey33in.W6Nv-Q";
    }
    /**
     *
     * 获取code
     */
    AuthService.prototype.getDiskCode = function () {
        var params = {
            response_type: "code",
            scope: "basic,netdisk",
            client_id: disk.client_id,
            redirect_uri: disk.redirect_uri,
            force_login: 1,
        };
        var querys = Object.keys(params).map(function (key) { return "".concat(key, "=").concat(params[key]); }).join("&");
        return baseURL + "?" + querys;
    };
    /**
   *
   * 获取Token
   */
    AuthService.prototype.getAccessToken = function (code) {
        if (code === void 0) { code = "adab800c78bb6404cd2ebe6c9a663059"; }
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, http.get("oauth/2.0/token", {
                                params: {
                                    grant_type: "authorization_code",
                                    code: code,
                                    client_secret: disk.client_secret,
                                    client_id: disk.client_id,
                                    redirect_uri: disk.redirect_uri
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1.response.data);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
       *
       * 创建压缩包
       */
    AuthService.prototype.createZip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zipFile, fileList, zipDir, basePath, _i, fileList_1, file, fileData, zipFileBlob, bufferStream, readStream, writer, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zipFile = new jszip_1.default();
                        fileList = [
                            "01.mp4",
                            "02.mp4"
                        ];
                        zipDir = zipFile.folder("素材");
                        if (!zipDir) {
                            return [2 /*return*/, false];
                        }
                        basePath = (0, path_1.join)(__dirname, "../../public/file");
                        for (_i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
                            file = fileList_1[_i];
                            fileData = (0, fs_1.readFileSync)((0, path_1.join)(basePath, file));
                            zipDir.file(file, fileData);
                        }
                        return [4 /*yield*/, zipFile.generateAsync({ type: "nodebuffer" })];
                    case 1:
                        zipFileBlob = _a.sent();
                        bufferStream = new stream_1.PassThrough();
                        readStream = bufferStream.end(zipFileBlob);
                        writer = (0, fs_1.createWriteStream)((0, path_1.join)(basePath, "example.zip"));
                        len = 0;
                        readStream.on('data', function (chunk) {
                            console.log(chunk.length);
                            len += chunk.length;
                            writer.write(chunk, function () {
                                console.log("写入了一个chunk");
                            });
                        });
                        readStream.on('end', function () {
                            writer.close();
                            console.log("write end success");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取需要上传的文件信息
     *
     */
    AuthService.prototype.getFileInfo = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var info, size;
            return __generator(this, function (_a) {
                info = (0, fs_1.statSync)(url);
                size = 4 * 1024 * 1024;
                return [2 /*return*/, {
                        size: info.size,
                        num: Math.ceil(info.size / size)
                    }];
            });
        });
    };
    /**
     *
     * 获取分片文件信息
     */
    AuthService.prototype.getfile = function (url, i) {
        var size = 4 * 1024 * 1024;
        return new Promise(function (resolve, reject) {
            var data = '';
            var start = i * size;
            var end = (i + 1) * size - 1;
            var stream = (0, fs_1.createReadStream)(url, {
                start: start,
                end: end
            });
            stream.on('data', function (chunk) {
                if (!data) {
                    data = chunk;
                }
                else {
                    data = Buffer.concat([data, chunk]);
                }
            });
            stream.on('end', function () {
                resolve(data);
            });
        });
    };
    Object.defineProperty(AuthService.prototype, "formatStr", {
        get: function () {
            return function (obj) { return Object.keys(obj).map(function (key) { return "".concat(key, "=").concat(obj[key]); }).join("&"); };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 生成md5值
     *
     */
    AuthService.prototype.getmd5list = function (url, info) {
        return __awaiter(this, void 0, void 0, function () {
            var promistlist, i, data, hash, md5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promistlist = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < info.num)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getfile(url, i)];
                    case 2:
                        data = _a.sent();
                        hash = crypto_1.default.createHash('md5');
                        hash.update(data); // 更新内容
                        md5 = hash.digest('hex');
                        console.log(md5);
                        promistlist.push(md5);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, promistlist];
                }
            });
        });
    };
    /**
     * 预上传 第一步
     */
    AuthService.prototype.preUploadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var basePath, info, block_list, data, preUplaodUrl, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("预上传开始");
                        basePath = (0, path_1.join)(__dirname, "../../public/file", "example.zip");
                        return [4 /*yield*/, this.getFileInfo(basePath)];
                    case 1:
                        info = _a.sent();
                        console.log(basePath, info);
                        return [4 /*yield*/, this.getmd5list(basePath, info)];
                    case 2:
                        block_list = _a.sent();
                        block_list = JSON.stringify(block_list);
                        data = {
                            path: encodeURI("/apps/test/exmaple.zip"),
                            size: info.size,
                            isdir: 0,
                            autoinit: 1,
                            block_list: block_list,
                            rtype: 1,
                        };
                        preUplaodUrl = "http://pan.baidu.com/rest/2.0/xpan/file?method=precreate&access_token=".concat(this.accessToken);
                        return [4 /*yield*/, http.post(preUplaodUrl, this.formatStr(data))];
                    case 3:
                        res = _a.sent();
                        this.upload({
                            url: basePath,
                            info: info,
                            uploadid: res.data.uploadid,
                            pian: res.data.block_list
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * 根据预上传接口 来完成分片上传 和 分片合并
     */
    AuthService.prototype.upload = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fileList, _i, _a, i, data, superInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileList = [];
                        _i = 0, _a = params.pian;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        console.log("\u4E0A\u4F20\u7B2C".concat(i, "\u4E2A\u5206\u7247\u5F00\u59CB"));
                        return [4 /*yield*/, this.getfile(params.url, i)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, this.uploadSuperFile(i, data, params.uploadid)]; // 循环上传需要上传的分片
                    case 3:
                        superInfo = _b.sent() // 循环上传需要上传的分片
                        ;
                        fileList.push(superInfo.md5);
                        console.log("\u4E0A\u4F20\u7B2C".concat(i, "\u4E2A\u5206\u7247\u5B8C\u6210"));
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        // 创建文件 合并分片
                        console.log("\u4E0A\u4F20\u5206\u7247\u5B8C\u6210");
                        console.log("\u5408\u5E76\u5206\u7247\u5F00\u59CB");
                        console.log(fileList);
                        return [4 /*yield*/, this.mergeFile(params.info, params.uploadid, fileList)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 上传分片接口
     */
    AuthService.prototype.uploadSuperFile = function (i, data, uploadid) {
        return __awaiter(this, void 0, void 0, function () {
            var urls, params, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urls = "https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?" // 请求地址
                        ;
                        params = {
                            path: encodeURI("/apps/test/exmaple.zip"),
                            access_token: this.accessToken,
                            method: 'upload',
                            type: "tmpfile",
                            uploadid: uploadid,
                            partseq: i // 这个是分片的编号
                        };
                        return [4 /*yield*/, http.put(urls + this.formatStr(params), data, {
                                headers: {
                                    'Content-Type': 'multipart/form-data', //这是格式
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res.data);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     *
     *合并文件接口
     */
    AuthService.prototype.mergeFile = function (info, uploadid, fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var mergeUrl, data, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mergeUrl = "https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=".concat(this.accessToken);
                        data = {
                            path: encodeURI("/apps/test/exmaple.zip"),
                            size: info.size,
                            isdir: 0,
                            uploadid: uploadid,
                            block_list: JSON.stringify(fileList),
                            rtype: 1,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, http.post(mergeUrl, this.formatStr(data))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2, "error");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
exports.default = new AuthService();
