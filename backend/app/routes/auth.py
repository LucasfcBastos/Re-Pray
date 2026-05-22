from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

import bcrypt

from app.database import supabase

auth_bp = Blueprint("auth", __name__)


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    usuario = data.get("usuario")
    senha = data.get("senha")
    dispositivo = data.get("dispositivo")

    if not usuario or not senha or not dispositivo:
        return jsonify({
            "erro": "Dados incompletos"
        }), 400

    # BUSCA USUÁRIO
    response = (
        supabase
        .table("usuarios")
        .select("*")
        .eq("usuario", usuario)
        .execute()
    )

    if not response.data:
        return jsonify({
            "erro": "Usuário não encontrado"
        }), 404

    user = response.data[0]

    # BUSCA DISPOSITIVO
    response_device = (
        supabase
        .table("dispositivo")
        .select("*")
        .eq("id", user["id"])
        .execute()
    )

    if not response_device.data:
        return jsonify({
            "erro": "Dispositivo não encontrado"
        }), 404


    device = response_device.data[0]


    # valida dispositivo
    if dispositivo != device["id_computador"]:
        return jsonify({
            "erro": "Dispositivo não autorizado"
        }), 403


    # valida senha
    senha_valida = bcrypt.checkpw(
        senha.encode("utf-8"),
        user["senha"].encode("utf-8")
    )

    if not senha_valida:
        return jsonify({
            "erro": "Senha inválida"
        }), 401


    # JWT
    token = create_access_token(
        identity=str(user["id"])
    )


    return jsonify({

        "token": token,

        "usuario": {
            "id": user["id"],
            "usuario": user["usuario"],
            "nome": user["nome"]
        }

    })