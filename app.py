from flask import Flask, send_file, redirect, request, jsonify, render_template
#from PIL import Image
app = Flask(__name__)
@app.route("/")
def r():
    return send_file("index.html")


if __name__ == "__main__":
    """
    Sets the port to 4242 for incoming HTTP requests.
    """
    app.run(port=4241)