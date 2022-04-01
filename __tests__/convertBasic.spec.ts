import { convertPDFToImage } from '../src/index';
import { join} from "path"
import { mkdir , rmdir , readdir } from "fs/promises"

const pdfPath = join(__dirname, "pdf-example.pdf");
const outPutFolder = join(__dirname, "out");
const pagesPdfLength = 3;

describe("Testes de conversão sem criar thumbnails", () => {
  beforeEach(async () => {
    return await mkdir(outPutFolder)
  })
  afterEach(async () => {
    return await rmdir(outPutFolder, { recursive: true })
  });

  it("Teste com os parametros obrigatorios", async () => {
    await convertPDFToImage({
      pdfPath: pdfPath,
      outPutFolder: outPutFolder,
    });
    const outImage = await readdir(outPutFolder);
    expect(outImage.length).toBe(pagesPdfLength);
  });

  it("Teste com os parametros opcionais", async () => {
    await convertPDFToImage({
      pdfPath: pdfPath,
      outPutFolder: outPutFolder,
      outPutName: "image_name_teste",
      dpi: 300,
      fmt: "tif",
      threadCount: 2,
    });
    const outImage = await readdir(outPutFolder);
    const res = outImage.filter(async (file) => file.includes("image_name_teste") && file.includes("tif"))
    expect(res.length).toBe(pagesPdfLength);
  });

  // it("Teste convertendo sómente a primeira pagina", async () => {
  //   await convertPDFToImage({
  //     pdfPath: pdfPath,
  //     outPutFolder: outPutFolder,
  //     fistPage: true,
  //   });
  //   const outImage = await readdir(outPutFolder);
  //   console.log(outImage);
  //   expect(outImage.length).toBe(1);
  //   });
  
  it("Teste com path do pdf invalido", async () => {
    try {
      await convertPDFToImage({
        pdfPath: "invalid_path",
        outPutFolder: outPutFolder,
      });
    } catch (error) {
      expect(error).toBe("Error: Arquivo não encontrado");
    }
  });

  it("Teste com o path da pasta de destino invalida", async () => {
    try {
      await convertPDFToImage({
        pdfPath: pdfPath,
        outPutFolder: "invalid_path",
      });
    } catch (error) {
      expect(error).toBe("Error: Pasta de destino não encontrada");
    }
  });

  it("Teste com timeout no processo filho", async () => {
    try {
      await convertPDFToImage({
        pdfPath: pdfPath,
        outPutFolder: outPutFolder,
        timeout: 1,
      });
    } catch (error) {
      expect(error).toBe("Error: erro na conversão do pdf");
    }
  });
});