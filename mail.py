from flask import Flask, request, jsonify
import yagmail
import os
import threading
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app_password = os.getenv("APP_PASSWORD")

app = Flask(__name__)

# Enable CORS for all routes and origins to avoid issues
CORS(app, resources={r"/*": {"origins": "*"}})

def send_async_email(name, phone, email, message):
    try:
        sender_email = "24mcajai005@ldce.ac.in"
        yag = yagmail.SMTP(user=sender_email, password=app_password)

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
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route("/send_inquiry", methods=["POST"])
def send_inquiry():
    data = request.get_json()
    name = data.get("name")
    phone = data.get("phone")
    email = data.get("email")
    message = data.get("message")

    # Start email sending in a background thread
    thread = threading.Thread(target=send_async_email, args=(name, phone, email, message))
    thread.start()

    # Return immediate success response
    return jsonify({"success": True, "message": "Inquiry received. We will get back to you soon."}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
