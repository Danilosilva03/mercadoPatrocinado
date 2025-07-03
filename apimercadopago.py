import mercadopago
import json
import os

def gerar_link_pagamento(produtos_escolhidos):
    sdk = mercadopago.SDK("TEST-3287492394546409-062408-41553075ea4fae99d8d981c6c3c46a7f-2371277557")

    # Caminhos dos arquivos
    dir_path = os.path.dirname(os.path.realpath(__file__))
    db1_path = os.path.join(dir_path, 'db.json')
    db2_path = os.path.join(dir_path, 'db2.json')

    # Carregar produtos dos dois JSONs
    with open(db1_path, 'r', encoding='utf-8') as f:
        db1 = json.load(f)
    with open(db2_path, 'r', encoding='utf-8') as f:
        db2 = json.load(f)

    produtos_db = db1.get("products", []) + db2.get("additionalImages", [])

    descricao = []
    valor_total = 0.0

    print("\n--- Produtos Selecionados ---")
    for prod in produtos_escolhidos:
        id_escolhido = prod.get("id")
        quantidade = int(prod.get("quantity", 1))

        # Procurar produto no banco
        produto_detalhado = next((p for p in produtos_db if p["id"] == id_escolhido), None)
        if produto_detalhado:
            nome = produto_detalhado["name"]
            preco = float(produto_detalhado["price"])
            subtotal = preco * quantidade
            valor_total += subtotal

            descricao.append(f"{nome} (x{quantidade})")
            print(f"- {nome} (x{quantidade}) - R${subtotal:.2f}")

    if not descricao or valor_total == 0.0:
        print("❌ Nenhum produto válido encontrado.")
        return None
    # Cria item único com descrição e valor total
    items = [{
        "title": " | ".join(descricao),
        "quantity": 1,
        "currency_id": "BRL",
        "unit_price": round(valor_total, 2)
    }]
    payment_data = {
        "items": items,
        "back_urls": {
            "success": "http://localhost:3001/mercadoPatrocinado/compracerta",
            "pending": "http://localhost:3001/mercadoPatrocinado/compraerrada",
            "failure": "http://localhost:3001/mercadoPatrocinado/compraerrada"
        },
        "metadata": {
            "descricao_pedido": " | ".join(descricao),
            "valor_total": f"R$ {valor_total:.2f}"
        }
    }
    # Criar preferência
    result = sdk.preference().create(payment_data)

    if result.get("status") == 201 and "init_point" in result["response"]:
        return result["response"]["init_point"]
    else:
        print("Erro na criação da preferência:", json.dumps(result, indent=2, ensure_ascii=False))
        return None
