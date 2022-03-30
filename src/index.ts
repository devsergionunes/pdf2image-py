interface IConvertPDFToImage {
  pdfPath: string;
  outPutFolder: string;
  outNameFile?: string;
  dpi?: 100 | 150 | 200 | 250 | 300;
  fmt?: "jpeg" | "png" | "ppm" | "tiff";
  fistPage?: boolean | number;
  lastPage?: boolean | number ;
  timeout?: number;
  threadCount?: 1 | 2 | 3 | 4;
  size?: {
    width?: string;
    height?: string;
  };
  thumbnailWidth?: {
    width?: string;
    height?: string;
    fmt: "jpeg" | "png" | "ppm" | "tiff";
  };
};

import { spawn } from "child_process";
import  path from "path";

// instancia do processo filho que ira executar o script em python
function runConverter({
  pdfPath, 
  outPutFolder,
  outNameFile,
  dpi,
  fmt,
  timeout,
  threadCount,
  // size,
  fistPage,
  lastPage,
}:IConvertPDFToImage) {
  return new Promise((resolve, reject) => {
    const initPythonScript = path.join(__dirname, "pdf.py")

    const pyprog = spawn('python3', [
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

    pyprog.stdout.on('data', (data:any) => {
        resolve(data)
    })

    pyprog.stderr.on('data', (data: any) => {
        reject(data)
    })

    pyprog.on('error', (error:any) => {
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
  outNameFile,
  dpi,
  fmt,
  fistPage,
  lastPage,
  // size,
  timeout,
  threadCount,
  // thumbnailWidth
}: IConvertPDFToImage) {
  try {
    const params = {
      pdfPath ,
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
    }
    const res : any = await runConverter(params);
    console.log(res.toString());
  } catch(err : any) {
    throw err.toString();
  }
}

convertPDFToImage({
  pdfPath:`${__dirname}/pdf-example.pdf`,
  outPutFolder: `${__dirname}/out`,
}).then((res) => {
  console.log("res", res);
}).catch((err) => {
  console.log("err", err);
});