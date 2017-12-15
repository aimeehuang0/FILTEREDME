import json
import requests

from flask import Flask, render_template, request, jsonify, make_response, json
app = Flask(__name__)

@app.route('/')
def render():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/page')
def page():
    return render_template('page.html')

@app.route('/page2')
def page2():
    return render_template('page2.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/checkPrediction', methods=['POST'])
def checkPrediction():
   # message = None
    if request.method == 'POST':
        text = request.form['mydata']
        # print(text)
        # text = "Heres what you need to know at the end of the day."
        # text = "Lorem ipsum dolor sit amet"
        token = auth(3466, '1ljon4nqhkfq7cp840cufh9qqq')
        prediction_result = predict_from_text(token, text)
        return json.dumps(prediction_result)

def auth(customer_id, api_key):
    try:
        credentials = {
            'customer_id': customer_id,
            'api_key': api_key
        }
        response = requests.post('https://api.applymagicsauce.com/auth', json=credentials)
        response.raise_for_status()
        return response.json()['token']
    except requests.exceptions.HTTPError as e:
        print e.response.json()


def predict_from_text(token, text):
    try:
        response = requests.post(url='https://api.applymagicsauce.com/text',
                                 params={
                                     'source': 'OTHER'
                                 },
                                 data=text,
                                 headers={'X-Auth-Token': token})
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        print e.response.json()


if __name__=='__main__':
    app.run(debug=True)