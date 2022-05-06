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
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// instancia do processo filho que ira executar o script em python
function runConverter({ pdfPath, outPutFolder, outPutName, dpi, fmt, timeout, threadCount, fistPage, lastPage, sizeWidth, sizeHeight, thumbnailOutPath, thumbnailOutName, thumbnailWidth, thumbnailHeight, thumbnailFmt, jpegQuality, isProgressive, isOptimize }) {
    return new Promise((resolve, reject) => {
        const initPythonScript = path_1.default.join(__dirname, "pdf.py");
        const pyprog = (0, child_process_1.spawn)('python3', [
            initPythonScript,
            JSON.stringify({
                pdfPath,
                outPutFolder,
                outPutName,
                dpi,
                fmt,
                threadCount,
                fistPage,
                lastPage,
                sizeWidth,
                sizeHeight,
                thumbnailOutPath,
                thumbnailOutName,
                thumbnailWidth,
                thumbnailHeight,
                thumbnailFmt,
                jpegQuality,
                isProgressive,
                isOptimize
            })
        ], {
            timeout,
        });
        pyprog.stderr.on('data', (data) => {
            reject(data.toString());
        });
        pyprog.on('error', (error) => {
            reject(error.toString());
        });
        pyprog.on('close', (code) => {
            if (code == 0)
                resolve(true);
            else
                reject(new Error("erro na conversão do pdf"));
        });
    });
}
function convertPDFToImage({ pdfPath, outPutFolder, outPutName, dpi, fmt, fistPage, lastPage, size, timeout, threadCount, thumbnail, jpegOptions, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(0, fs_1.existsSync)(pdfPath))
                throw new Error("Arquivo não encontrado");
            if (!(0, fs_1.existsSync)(outPutFolder))
                throw new Error("Pasta de destino não encontrada");
            if ((thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.outPath) && !(0, fs_1.existsSync)(thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.outPath))
                throw new Error("Pasta de destino das thumbnails não encontrada");
            const params = {
                pdfPath,
                outPutFolder,
                dpi: dpi || 100,
                fmt: (fmt === null || fmt === void 0 ? void 0 : fmt.toLocaleLowerCase()) || "jpeg",
                outPutName: outPutName || "image",
                timeout: timeout || 1000 * 60,
                threadCount: threadCount || 4,
                fistPage: !!fistPage ? fistPage : false,
                lastPage: !!lastPage ? lastPage : false,
                sizeWidth: size && size.width ? size.width : false,
                sizeHeight: size && size.height ? size.height : false,
                thumbnailOutPath: thumbnail && thumbnail.outPath ? thumbnail.outPath : false,
                thumbnailOutName: thumbnail && thumbnail.outPutName ? thumbnail.outPutName : "thumbnail",
                thumbnailWidth: thumbnail && thumbnail.width ? thumbnail.width : 120,
                thumbnailHeight: thumbnail && thumbnail.height ? thumbnail.width : false,
                thumbnailFmt: thumbnail && thumbnail.fmt ? thumbnail.fmt.toLocaleLowerCase() : "jpeg",
                jpegQuality: (jpegOptions === null || jpegOptions === void 0 ? void 0 : jpegOptions.quality) || 100,
                isProgressive: (jpegOptions === null || jpegOptions === void 0 ? void 0 : jpegOptions.progressive) || true,
                isOptimize: (jpegOptions === null || jpegOptions === void 0 ? void 0 : jpegOptions.optimize) || true,
            };
            yield runConverter(params);
        }
        catch (err) {
            throw err.toString();
        }
    });
}
exports.convertPDFToImage = convertPDFToImage;
exports.default = { convertPDFToImage };
