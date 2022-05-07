import { spawn } from "child_process";
import { existsSync } from "fs";
import  path from "path";

import { IRunConverter, IConvertPDFToImage} from "./types"

// instancia do processo filho que ira executar o script em python
function runConverter({
  pdfPath, 
  outPutFolder,
  outPutName,
  dpi,
  fmt,
  timeout,
  threadCount,
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
}:IRunConverter) {
  return new Promise((resolve, reject) => {
    const initPythonScript = path.join(__dirname, "pdf.py")

    const pyprog = spawn('python3', [
      initPythonScript, 
      JSON.stringify({
        pdfPath, 
        outPutFolder,
        outPutName,
        dpi,
        fmt,
        threadCount,
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

    pyprog.stderr.on('data', (data: Buffer) => {
      reject(data.toString())
    })

    pyprog.on('error', (error: Buffer) => {
      reject(error.toString())
    })

    pyprog.on('close', (code:any) => {
      if (code == 0) resolve(true);
      else reject(new Error("erro na conversão do pdf"));
    })
  })
}


export async function convertPDFToImage({
  pdfPath,
  outPutFolder,
  outPutName,
  dpi,
  fmt,
  size,
  timeout,
  threadCount,
  thumbnail,
  jpegOptions,
}: IConvertPDFToImage) {
  try {
    if (!existsSync(pdfPath)) throw new Error("Arquivo não encontrado");
    if (!existsSync(outPutFolder)) throw new Error("Pasta de destino não encontrada");
    if (thumbnail?.outPath && !existsSync(thumbnail?.outPath)) throw new Error("Pasta de destino das thumbnails não encontrada");

    const params = {
      pdfPath ,
      outPutFolder,
      dpi: dpi || 100,
      fmt: fmt?.toLocaleLowerCase() || "jpeg",
      outPutName: outPutName || "image",
      timeout: timeout || 1000 * 60,
      threadCount: threadCount || 4,
      sizeWidth: size && size.width ? size.width : false,
      sizeHeight: size && size.height ? size.height : false,
      thumbnailOutPath: thumbnail && thumbnail.outPath ? thumbnail.outPath : false,
      thumbnailOutName: thumbnail && thumbnail.outPutName ? thumbnail.outPutName : "thumbnail",
      thumbnailWidth: thumbnail && thumbnail.width ? thumbnail.width : 120,
      thumbnailHeight: thumbnail && thumbnail.height ? thumbnail.width : false,
      thumbnailFmt: thumbnail && thumbnail.fmt ? thumbnail.fmt.toLocaleLowerCase() : "jpeg",
      jpegQuality: jpegOptions?.quality || 100,
      isProgressive: jpegOptions?.progressive || true,
      isOptimize: jpegOptions?.optimize || true,
    } as IRunConverter;
    await runConverter(params);
  } catch(err : any) {
    throw err.toString();
  }
}

export default { convertPDFToImage };