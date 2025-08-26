from flask import Flask, request, jsonify
import yagmail, os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app_password = os.getenv("APP_PASSWORD")

app = Flask(__name__)

# ✅ Allow only your frontend domain (more secure than "*")
CORS(app, origins=["https://jaiminchandaranaportfolio.vercel.app"])

@app.route("/send_inquiry", methods=["POST", "OPTIONS"])
def send_inquiry():
    if request.method == "OPTIONS":
        # Preflight request – Flask-CORS should handle it, but adding safety
        return jsonify({"status": "OK"}), 200

    data = request.get_json()
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
