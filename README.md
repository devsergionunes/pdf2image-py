# Descrição
  Projeto criado apartir de uma necessidade, quando fui busca alguma biblioteca de conversão e PDFs para imagens em formato JPEG nao encontrei nenhuma biblioteca que funcionasse. Entao criei essa solução com uma biblioteca em Python. Seu modo de funcionamento é muito simples, é instanciado um subprocesso no node aonde o script python é executado.

  Biblioteca Python: [pdf2image](https://pdf2image.readthedocs.io/en/latest/)

<hr />

  ## Uso nos SOs
  - Linux
  - Windows

  ## Dependências

  - Python 3 : [python3](https://www.python.org/downloads/)
  - Pillow: [Pillow](https://pillow.readthedocs.io/en/stable/)
  - Biblioteca Python: [pdf2image](https://pdf2image.readthedocs.io/en/latest/)

  ### Linux SO
  - poppler-utils : [poppler-utils](https://howtoinstall.co/pt/poppler-utils)


<hr />

# Documentação dos Metodos
   ### Metodo: convertPDFToImage: (props) => `Promise<void>`

  - pdfPath: string => Caminho do arquivo PDF
  - outPutFolder: string =>  Caminho da pasta de saída
  - outPutName?: string => Nome da pasta de saída com as imagens
  - dpi?: 100 | 150 | 200 | 250 | 300 => Densidade de pixels
  - fmt?: "jpeg" | "png" | "ppm" | "tif" => Formato da imagem de saída
  - timeout: number => Tempo de espera que o processo filho pode ficar em espera
  - threadCount:  1 | 2 | 3 | 4 => Número de encadeamentos a serem usados ​​ao converter o PDF. Limitado ao número real de páginas.
  - size: object => { width: number, height: number } => Tamanho da imagem de saída
  - jpegOptions?: object => { quality?: number; progressive?: boolean; optimize?: boolean; } => Opções de qualidade da imagem de saída somente se fmt = "jpeg"
  - thumbnail?: object => { outPath: string; outPutName?: string; width?: number | boolean; height?: number | boolean; fmt?: "jpeg" | "png" | "ppm"; } => Opçoes de thumbnail

<hr />


# Exemplos
  ### Convertendo PDF para imagem simples
  <pre>
    <code class="language-javascript">
      import { convertPDFToImage } from 'pdf2image-py';
      
      convertPDFToImage({
        pdfPath: './path/to/file.pdf',
        outPutFolder: './path/to/outPutFolder',
      }).then(() => {
        console.log('Convertido com sucesso');
      }).catch((err) => {
        console.log(err);
      }
    </code>
  </pre>

  ### Converter pdfs e tambem gerar thumbnails

  <pre>
    <code class="language-javascript">
      import { convertPDFToImage } from 'pdf2image-py';

      convertPDFToImage({
        pdfPath: './path/to/file.pdf',
        outPutFolder: './path/to/outPutFolder',
        outPutName: 'outPutName',
        dpi: 300,
        fmt: 'png',
        timeout: 30000,
        threadCount: 2,
        size: { width: 100, height: 100 },
        jpegOptions: { quality: 100, progressive: true, optimize: true },
        thumbnail: {
          outPath: './path/to/outPutFolder',
          outPutName: 'outPutName',
          width: 100,
          height: 100,
          fmt: 'png',
        },
      }).then(() => {
        console.log('Convertido com sucesso');
      }).catch((err) => {
        console.log(err);
      }
    </code>
  </pre>

<hr />

# Aviso de Criaçao de issues
  - Para criar uma issue informe o seguinte:
    - OS 
    - Versão das dependencias
    - Versão do node
    - Versão do pdf2image-py


