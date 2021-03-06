import { convertPDFToImage } from '../src/index';
import { join} from "path"
import { mkdir , rmdir , readdir } from "fs/promises"

const pdfPath = join(__dirname, "pdf-example.pdf");
const outPutFolder = join(__dirname, "out");
const pagesPdfLength = 3;

describe("Conversion test without creating thumbnails", () => {
  beforeEach(async () => {
    return await mkdir(outPutFolder)
  })
  afterEach(async () => {
    return await rmdir(outPutFolder, { recursive: true })
  });

  it("Test with mandatory parameters", async () => {
    await convertPDFToImage({
      pdfPath: pdfPath,
      outPutFolder: outPutFolder,
    });
    const outImage = await readdir(outPutFolder);
    expect(outImage.length).toBe(pagesPdfLength);
  });

  it("Test by passing only optional parameters", async () => {
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
  
  it("Test with invalid pdf path", async () => {
    try {
      await convertPDFToImage({
        pdfPath: "invalid_path",
        outPutFolder: outPutFolder,
      });
    } catch (error) {
      expect(error).toBe("Error: Arquivo não encontrado");
    }
  });

  it("Test with folder path and destination invalid", async () => {
    try {
      await convertPDFToImage({
        pdfPath: pdfPath,
        outPutFolder: "invalid_path",
      });
    } catch (error) {
      expect(error).toBe("Error: Pasta de destino não encontrada");
    }
  });

  it("Test with timeout in child process", async () => {
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