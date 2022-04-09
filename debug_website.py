from flask import Flask, render_template


app = Flask(__name__)


@app.route("/all-about-bytecode")
def home():
    return render_template("all-about-bytecode.html")


if __name__ == "__main__":
    app.run(debug=True)
