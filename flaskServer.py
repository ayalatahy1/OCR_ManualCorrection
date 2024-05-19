from flask import Flask, request, jsonify
import os
from openai import OpenAI
from flask_cors import CORS
from variables import INPUTIMAGE,OUTPUTTEXT

app = Flask(__name__)
CORS(app)  


@app.route('/text', methods=['POST'])
def getText(): 
    print(request.files)
    image =  request.files["file"]
    print(image)
    if(image):
        filepath=os.path.join(INPUTIMAGE, image.filename)
        output=os.path.join(OUTPUTTEXT, image.filename)
        image.save(filepath)
        os.system(f'tesseract -l ara {filepath} {output}')
        with open(f'{output}.txt',"r",encoding="utf-8") as f:
            text=f.read()
        return jsonify({'text': text})
from paddleocr import PaddleOCR


ocr = PaddleOCR(use_angle_cls=True, lang='ar')
@app.route('/text2', methods=['POST'])
def text2():
    file = request.files['file']
    if file:
        filepath=os.path.join(INPUTIMAGE, file.filename)
        result = ocr.ocr(filepath, cls=True)
        extracted_text = []
        for res in result:
            for res2 in res:
                extracted_text.append(" ")
                flipped_word = res2[1][0][::-1]
                extracted_text.append(flipped_word)        
        return jsonify({'text': extracted_text}), 200
    
    
@app.route('/update',methods=["POST"])
def updateFile():
    file=request.json.get("name")
    output=os.path.join(OUTPUTTEXT, file)
    with open(f'{output}.txt',"w",encoding="utf-8") as f:
        f.write(request.json.get("text"))
    return jsonify({"response": " File Successfully Updated"})


if __name__=="__main__":
    app.run(debug=True)