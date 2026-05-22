from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

import bcrypt

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