from flask import Flask, render_template


app = Flask(__name__, template_folder=".")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/results.html")
def results():
    return render_template("results.html")

if __name__ == "__main__":
    app.run(debug=True)
