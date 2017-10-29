from flask import Flask,jsonify,request
app = Flask(__name__)

@app.route("/analyze",methods=["GET"])
def main():
    return jsonify(result), 200

if __name__ == "__main__":
    app.run()