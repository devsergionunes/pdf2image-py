export interface IConvertPDFToImage {
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
    fmt?: "jpeg" | "png" | "ppm";
  };
};

export interface IRunConverter {
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
  thumbnailFmt: "jpeg" | "png" | "ppm";
  jpegQuality: boolean | number;
  isProgressive: boolean | number;
  isOptimize: boolean | number;
}
