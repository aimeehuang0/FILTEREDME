# import json
# import requests


# def auth(customer_id, api_key):
#     try:
#         credentials = {
#             'customer_id': customer_id,
#             'api_key': api_key
#         }
#         response = requests.post('https://api.applymagicsauce.com/auth', json=credentials)
#         response.raise_for_status()
#         return response.json()['token']
#     except requests.exceptions.HTTPError as e:
#         print e.response.json()


# def predict_from_text(token, text):
#     try:
#         response = requests.post(url='https://api.applymagicsauce.com/text',
#                                  params={
#                                      'source': 'OTHER'
#                                  },
#                                  data=text,
#                                  headers={'X-Auth-Token': token})
#         response.raise_for_status()
#         return response.json()
#     except requests.exceptions.HTTPError as e:
#         print e.response.json()


# def predict_from_like_ids(token, like_ids):
#     try:
#         response = requests.post(url='https://api.applymagicsauce.com/like_ids',
#                                  json=like_ids,
#                                  headers={'X-Auth-Token': token})
#         response.raise_for_status()
#         if response.status_code == 204:
#             raise ValueError('Not enough predictive like ids provided to make a prediction')
#         else:
#             return response.json()
#     except requests.exceptions.HTTPError as e:
#         print e.response.json()
#     except ValueError as e:
#         print e


# # /auth
# # token = auth(3466, '1ljon4nqhkfq7cp840cufh9qqq')

# # /text
# # prediction_result = predict_from_text(token, 'Lorem ipsum dolor sit amet')
# # print json.dumps(prediction_result, indent=4)

# # /like ids
# # prediction_result = predict_from_like_ids(token, ["5845317146", "6460713406", "22404294985", "35312278675",
#                                                   # "105930651606", "171605907303", "199592894970", "274598553922",
#                                                   # "340368556015", "100270610030980"])
# # print json.dumps(prediction_result, indent=4)

from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
app = Flask(__name__)

@app.route("/")
def home():
    return "hi"
@app.route("/index")

@app.route('/login', methods=['GET', 'POST'])
def login():
   message = None
   if request.method == 'POST':
        datafromjs = request.form['mydata']
        result = "return this"
        resp = make_response('{"response": '+result+'}')
        resp.headers['Content-Type'] = "application/json"
        return resp
        return render_template('login.html', message='')
if __name__ == "__main__":
app.run(debug = True)