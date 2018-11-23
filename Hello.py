from flask import Flask

app = Flask(__name__)



@app.route('/', methods = ['POST'])

def hello_world():
    request_json = request.get_json()
    text = request_json.get('text')
    flag = request_json.get('flag')
    return text

if __name__ == '__main__':

    app.run('fishing-phishing-flask.herokuapp', 3000)
