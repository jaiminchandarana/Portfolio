# backend.py
from flask import Flask, request, jsonify
import yagmail, os
from dotenv import load_dotenv

load_dotenv()
app_password = os.getenv("APP_PASSWORD")

app = Flask(__name__)

@app.route("/send_inquiry", methods=["POST"])
def send_inquiry():
    data = request.json
    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    message = data.get("message")

    sender_email = "24mcajai005@ldce.ac.in"
    yag = yagmail.SMTP(user=sender_email, password=app_password)

    try:
        contents = [
            f"""
            <strong>Name</strong>: {name}<br>
            <strong>Phone</strong>: {phone}<br>
            <strong>Email</strong>: {email}<br>
            <strong>Message</strong>: {message}
            """
        ]
        yag.send(
            to="chandaranajaimin@gmail.com",
            subject="Inquiry from portfolio.",
            contents=contents
        )
        return jsonify({"success": True, "message": "Inquiry sent successfully."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
