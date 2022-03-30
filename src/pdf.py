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
    output_file=params["outNameFile"],
    jpegopt={
        "quality": 100,
        "progressive": True,
        "optimize": True
    },
    thread_count=params["threadCount"],
    userpw=None,
    use_cropbox=False,
    strict=False,
    transparent=False,
    single_file=False,
    poppler_path=None,
    grayscale=False,
    size=None,
    paths_only=False,
    hide_annotations=False,
)

# outImages = os.listdir(pages)

# for i in range(len(outImages)):
#     caminhoImagem = sys.argv[1] + "/paginas/" + outImages[i]
#     image = Image.open(caminhoImagem)
#     width, height = image.size
#     image.thumbnail((width, height))
#     image.save(sys.argv[1] + "/miniaturas/" + outImages[i], 'JPEG')