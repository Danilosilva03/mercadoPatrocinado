from flask import Flask, request, jsonify
from flask_cors import CORS
import mercadopago

app = Flask(__name__)
CORS(app)

sdk = mercadopago.SDK("SUA_ACCESS_TOKEN_AQUI")

@app.route("/criar-pagamento", methods=["POST"])
def criar_pagamento():
    data = request.json

    preference_data = {
        "items": [
            {
                "title": item["nome"],
                "quantity": item["quantidade"],
                "unit_price": float(item["preco"]),
            } for item in data["produtos"]
        ],
        "payer": {
            "name": data["nome"],
            "email": data["email"]
        },
        "back_urls": {
            "success": "https://seusite.com/sucesso",
            "failure": "https://seusite.com/erro",
            "pending": "https://seusite.com/pendente"
        },
        "auto_return": "approved",
        "notification_url": "https://seusite.com/webhook"
    }

    preference_response = sdk.preference().create(preference_data)
    return jsonify(preference_response["response"])
