import requests

def send_message(email, first_name, body):
    email_to = str(first_name)+" <"+str(email)+">"
    subject = str("Activate your Account "+first_name)
    return requests.post(
        "https://api.mailgun.net/v3/sandboxd32db8a86494428ab16002b50be90bce.mailgun.org/messages",
        auth=("api", "c5af0f264619529232395f67e473e401-7005f37e-0cf94bdb"),
        data={"from": "Booksy <booksynoreply@gmail.com>",
              "to": email_to,
              "subject": subject,
              "text": body})
