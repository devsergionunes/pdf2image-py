interface IConvertPDFToImage {
  pdfPath: string;
  outPutFolder: string;
  outPutName?: string;
  dpi?: 100 | 150 | 200 | 250 | 300;
  fmt?: "jpeg" | "png" | "ppm" | "tif";
  fistPage?: boolean | number;
  lastPage?: boolean | number ;
  timeout?: number;
  threadCount?: 1 | 2 | 3 | 4;
  size?: {
    width?: number | boolean;
    height?: number | boolean;
  };
  jpegOptions?: {
    quality?: number;
    progressive?: boolean;
    optimize?: boolean;
  }
  thumbnail?: {
    outPath: string;
    outPutName?: string;
    width?: number | boolean;
    height?: number | boolean;
    fmt?: "jpeg" | "png";
  };
};

interface IRunConverter {
  pdfPath: string;
  outPutFolder: string;
  outPutName: string;
  dpi: 100 | 150 | 200 | 250 | 300;
  fmt: "jpeg" | "png" | "ppm" | "tif";
  fistPage: boolean | number;
  lastPage: boolean | number ;
  timeout: number;
  threadCount: 1 | 2 | 3 | 4;
  sizeWidth: number | boolean;
  sizeHeight: number | boolean;
  thumbnailOutPath: string | boolean;
  thumbnailOutName: string;
  thumbnailWidth: number | boolean;
  thumbnailHeight: number | boolean;
  thumbnailFmt: "jpeg" | "png";
  jpegQuality: boolean | number;
  isProgressive: boolean | number;
  isOptimize: boolean | number;
}

import { spawn } from "child_process";
import  path from "path";

// instancia do processo filho que ira executar o script em python
function runConverter({
  pdfPath, 
  outPutFolder,
  outPutName,
  dpi,
  fmt,
  timeout,
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

    pyprog.stdout.on('data', (data:any) => {
      console.log(`stdout: ${data.toString()}`);
      resolve(data)
    })

    pyprog.stderr.on('data', (data: any) => {
      console.log(`stderr: ${data.toString()}`);
      reject(data)
    })

    pyprog.on('error', (error:any) => {
      console.log(`stderr: ${error.toString()}`);
      reject(error)
    })

    pyprog.on('close', (code:any) => {
      if (code == 0)
      resolve(true);
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
  fistPage,
  lastPage,
  size,
  timeout,
  threadCount,
  thumbnail,
  jpegOptions,
}: IConvertPDFToImage) {
  try {
    const params = {
      pdfPath ,
      outPutFolder,
      dpi: dpi || 100,
      fmt: fmt?.toLocaleLowerCase() || "jpeg",
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
      jpegQuality: jpegOptions?.quality || 100,
      isProgressive: jpegOptions?.progressive || true,
      isOptimize: jpegOptions?.optimize || true,
    } as IRunConverter;
    const res : any = await runConverter(params);
    console.log(res.toString());
  } catch(err : any) {
    throw err.toString();
  }
}

// teste
convertPDFToImage({
  pdfPath:`${__dirname}/pdf-example.pdf`,
  outPutFolder: `${__dirname}/out`,
  outPutName: "teste2",
  fmt: "png",
  thumbnail: {
    outPath: `${__dirname}/thumb`,
  }
}).then((res) => {
  console.log("res", res);
}).catch((err) => {
  console.log("err", err);
});