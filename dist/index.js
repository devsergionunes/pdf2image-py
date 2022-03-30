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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPDFToImage = void 0;
;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
// instancia do processo filho que ira executar o script em python
function runConverter({ pdfPath, outPutFolder, outNameFile, dpi, fmt, timeout, threadCount, 
// size,
fistPage, lastPage, }) {
    return new Promise((resolve, reject) => {
        const initPythonScript = path_1.default.join(__dirname, "pdf.py");
        const pyprog = (0, child_process_1.spawn)('python3', [
            initPythonScript,
            JSON.stringify({
                pdfPath,
                outPutFolder,
                outNameFile,
                dpi,
                fmt,
                threadCount,
                fistPage,
                lastPage,
            })
        ], {
            timeout,
        });
        pyprog.stdout.on('data', (data) => {
            resolve(data);
        });
        pyprog.stderr.on('data', (data) => {
            reject(data);
        });
        pyprog.on('error', (error) => {
            reject(error);
        });
        pyprog.on('close', (code) => {
            if (code == 0)
                resolve(true);
            else
                reject(new Error("erro na conversão do pdf"));
        });
    });
}
function convertPDFToImage({ pdfPath, outPutFolder, outNameFile, dpi, fmt, fistPage, lastPage, 
// size,
timeout, threadCount,
// thumbnailWidth
 }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                pdfPath,
                outPutFolder,
                dpi: dpi || 100,
                fmt: fmt || "jpeg",
                outNameFile: outNameFile || "image",
                timeout: timeout || 1000 * 60,
                threadCount: threadCount || 4,
                fistPage: fistPage || false,
                lastPage: lastPage || false,
                // size: Object.keys(size as {}).length > 0 ?{
                //   width: size?.width || "400",
                //   height: size?.height || "400",
                // } : undefined,
            };
            const res = yield runConverter(params);
            console.log(res.toString());
        }
        catch (err) {
            throw err.toString();
        }
    });
}
exports.convertPDFToImage = convertPDFToImage;
convertPDFToImage({
    pdfPath: `${__dirname}/pdf-example.pdf`,
    outPutFolder: `${__dirname}/out`,
}).then((res) => {
    console.log("res", res);
}).catch((err) => {
    console.log("err", err);
});
