import os
from flask import Flask

app = Flask(__name__)



@app.route('/', methods = ['POST'])
def hello_world():
    request_json = request.get_json()
    text = request_json.get('text')
    flag = request_json.get('flag')
    return text


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
