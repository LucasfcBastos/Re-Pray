# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from flask import Blueprint, jsonify

# ===== Importação de Arquivos
from app.database import supabase

# ===== ROTA INTERNA =====
orders_bp = Blueprint("orders", __name__)

# ===== FUNÇÃO =====

# ===== Função para Pegar os Pedidos
@orders_bp.route("/pedidos/<user_id>", methods=["GET"])
def get_pedidos(user_id):

    # ===== Procurando Todos os Pedidos
    list = ( supabase.table("pedidos").select("id, descricao, status, created_at, cursos:id_cursos ( id, nome )").eq("id_references", user_id).order("created_at", desc=True).execute() )

    # ===== Validando os Pedidos
    if not list: 
        return jsonify({ "responder": "Não possui pedidos enviado ainda" }), 200

    # ===== Retorna a Lista de Pedidos
    return jsonify(list.data), 200

# ===== Função para Atualização o Pedido
@orders_bp.route("/status/<id_pedido>", methods=["PUT"])
def update_status(id_pedido):

    # ===== Procurando o Pedido
    response = ( supabase.table("pedidos").update({ "status": "respondido" }).eq("id", id_pedido).execute() )

    # ===== Retorna com a Mensagem
    return jsonify({ "mensagem": "Pedido respondido com sucesso", "pedido": response.data[0] }), 200