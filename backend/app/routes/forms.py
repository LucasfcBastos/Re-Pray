from flask import Blueprint, request, jsonify
from app.database import supabase

forms_bp = Blueprint("forms", __name__)

@forms_bp.route("/instituicao/<user_id>", methods=["GET"])
def get_instituicao(user_id):

    response = (
        supabase
        .table("instituicoes")
        .select("id")
        .eq("id_references", user_id)
        .execute()
    )

    if not response.data:
        return jsonify({
            "erro": "Instituição não encontrada"
        }), 404

    info = response.data[0]

    return jsonify({ "id": info["id"] }), 200

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