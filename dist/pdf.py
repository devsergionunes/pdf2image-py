# documentation
# https://pdf2image.readthedocs.io/en/latest/reference.html#functions 
from importlib.resources import path
import json
from pdf2image import convert_from_path
from PIL import Image

import sys
import time
import os


start_time = time.time()

# variáveis
params = json.loads(sys.argv[1])

pages = convert_from_path(
    params["pdfPath"],
    dpi=params["dpi"],
    fmt=params["fmt"],
    output_folder=params["outPutFolder"],
    first_page= params["fistPage"] or None,
    last_page=params["lastPage"] or None,
    output_file=params["outPutName"],
    jpegopt={
        "quality": params["jpegQuality"],
        "progressive": params["isProgressive"],
        "optimize": params["isOptimize"]
    },
    thread_count=params["threadCount"],
    userpw=None,
    use_cropbox=False,
    strict=False,
    transparent=False,
    single_file=False,
    poppler_path=None,
    grayscale=False,
    size=(params["sizeWidth"] or None,params["sizeHeight"] or None),
    paths_only=False,
    hide_annotations=False,
)
outImages = os.listdir(params["outPutFolder"])

if params['thumbnailOutPath']:
    for i in range(len(outImages)):
        caminhoImagem = params["outPutFolder"] + '/' + outImages[i]
        image = Image.open(caminhoImagem)
        width, height = image.size
        image.thumbnail((params['thumbnailWidth'] or width, params['thumbnailHeight'] or height))
        image.save(params['thumbnailOutPath'] + '/{}-{}.{}'.format(
            params['thumbnailOutName'],i, params['thumbnailFmt']), params['thumbnailFmt'].upper())