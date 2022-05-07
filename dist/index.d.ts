import { IConvertPDFToImage } from "./types";
export declare function convertPDFToImage({ pdfPath, outPutFolder, outPutName, dpi, fmt, size, timeout, threadCount, thumbnail, jpegOptions, }: IConvertPDFToImage): Promise<void>;
declare const _default: {
    convertPDFToImage: typeof convertPDFToImage;
};
export default _default;
