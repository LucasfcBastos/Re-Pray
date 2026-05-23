from flask import Blueprint, request, jsonify
from app.database import supabase

forms_bp = Blueprint("forms", __name__)

@forms_bp.route("/instituicao/<user_id>", methods=["GET"])
def get_instituicao(user_id):

    response = (
        supabase
        .table("instituicoes")
        .select("id, nome")
        .eq("id", user_id)
        .execute()
    )

    if not response.data:
        return jsonify({
            "erro": "Instituição não encontrada"
        }), 404

    info = response.data[0]

    return jsonify(info), 200

@forms_bp.route("/cursos", methods=["GET"])
def get_cursos():

    response = (
        supabase
        .table("cursos")
        .select("id, nome")
        .order("nome")
        .execute()
    )

    return jsonify(response.data), 200

@forms_bp.route("/pedidos", methods=["POST"])
def criar_pedido():

    data = request.json

    id_references = data.get("id_references")
    id_cursos = data.get("id_cursos")
    descricao = data.get("descricao")

    if not id_references or not id_cursos or not descricao:
        return jsonify({
            "erro": "Dados incompletos"
        }), 400

    response = (
        supabase
        .table("pedidos")
        .insert({
            "id_references": id_references,
            "id_cursos": id_cursos,
            "descricao": descricao,
            "status": "novo"
        })
        .execute()
    )

    return jsonify({
        "mensagem": "Pedido enviado com sucesso",
        "data": response.data
    }), 201