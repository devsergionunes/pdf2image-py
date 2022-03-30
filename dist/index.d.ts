interface IConvertPDFToImage {
    pdfPath: string;
    outPutFolder: string;
    outNameFile?: string;
    dpi?: 100 | 150 | 200 | 250 | 300;
    fmt?: "jpeg" | "png" | "ppm" | "tiff";
    fistPage?: boolean | number;
    lastPage?: boolean | number;
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
}
export declare function convertPDFToImage({ pdfPath, outPutFolder, outNameFile, dpi, fmt, fistPage, lastPage, timeout, threadCount, }: IConvertPDFToImage): Promise<void>;
export {};
