from flask import Flask, session, request, jsonify
from flask_cors import CORS
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with env variable in production

# Allow frontend origin
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Session config
app.permanent_session_lifetime = timedelta(days=7)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["username"] == "admin" and data["password"] == "admin":
        session.permanent = True
        session["user"] = data["username"]
        return jsonify({"message": "Logged in"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/user", methods=["GET"])
def get_user():
    user = session.get("user")
    if user:
        return jsonify({"user": user})
    return jsonify({"user": None}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})

if __name__ == "__main__":
    app.run(debug=True)