import { convertPDFToImage } from '../src/index';
import { join} from "path"
import { mkdir , rmdir , readdir} from "fs/promises"

const pdfPath = join(__dirname, "pdf-example.pdf");
const outPutFolder = join(__dirname, "out_without_thumbnails");
const outPutFolderThumbs = join(__dirname, "thumbnails");
const pagesPdfLength = 3;

describe("Conversion test with thumbnails", () => {
  beforeEach(async () => {
    await mkdir(outPutFolder)
    await mkdir(outPutFolderThumbs)
  })
  afterEach(async () => {
    await rmdir(outPutFolder, { recursive: true })
    await rmdir(outPutFolderThumbs, { recursive: true })
  });

  it("Test with thumbnails and mandatory parameters", async () => {
    await convertPDFToImage({
      pdfPath: pdfPath,
      outPutFolder: outPutFolder,
      thumbnail: {
        outPath: outPutFolderThumbs,
      }
    });
    const outImage = await readdir(outPutFolder);
    const outImageThumbs = await readdir(outPutFolderThumbs);
    expect(outImage.length).toBe(pagesPdfLength);
    expect(outImageThumbs.length).toBe(pagesPdfLength);
  });

  it("Test with optional parameters and thumbnails", async () => {
    await convertPDFToImage({
      pdfPath: pdfPath,
      outPutFolder: outPutFolder,
      outPutName: "image_name_teste",
      dpi: 300,
      threadCount: 4,
      jpegOptions: {
        quality: 100,
        optimize: true,
        progressive: false,
      },
      thumbnail: {
        outPath: outPutFolderThumbs,
        width: 120,
        height: 180,
        fmt: "ppm",
        outPutName: "thumb_out_name_teste",
      }
    });
    const outImage = await readdir(outPutFolder);
    const outImageThumbs = await readdir(outPutFolderThumbs);
    const resImages = outImage.filter(async (file) => file.includes("image_name_teste") && file.includes("jpeg"))
    const resThumbs = outImageThumbs.filter(async (file) => file.includes("thumb_out_name_teste") && file.includes("ppm"))
    expect(resImages.length).toBe(pagesPdfLength);
    expect(resThumbs.length).toBe(pagesPdfLength);
  });

  it("Test with invalid thumbnails folder path", async () => {
    try {
      await convertPDFToImage({
        pdfPath: pdfPath,
        outPutFolder: outPutFolder,
        thumbnail: {
          outPath: "invalid_path",
        }
      });
    } catch (error) {
      expect(error).toBe("Error: Pasta de destino das thumbnails não encontrada");
    }
  });
});