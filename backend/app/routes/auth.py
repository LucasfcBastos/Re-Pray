# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from flask import Blueprint, request, jsonify
from flask_jwt_extended import ( create_access_token )
import bcrypt

# ===== Importação de Arquivos
from app.database import supabase

# ===== ROTA INTERNA =====
auth_bp = Blueprint("auth", __name__)

# ===== FUNÇÃO =====

# ===== Função para Registrar o Login
@auth_bp.route("/login", methods=["POST"])
def login():

    # ===== Recebendo o Pacote
    data = request.json
    usuario = data.get("usuario")
    senha = data.get("senha")
    dispositivo = data.get("dispositivo")

    # ===== Validando o Pacote
    if not usuario or not senha or not dispositivo:
        return jsonify({ "erro": "Dados incompletos" }), 400

    # ===== Procurando o Usuário
    response = ( supabase.table("usuario").select("*").eq("nome", usuario).execute())

    # ===== Validando o Usuário
    if not response.data:
        return jsonify({ "erro": "Usuário não encontrado" }), 404
   
    # ===== Pega o Primeiro Item da Linha da Usuário
    user = response.data[0]

    # ===== Procurando o Dispositivo
    response_device = ( supabase.table("dispositivo").select("*").eq("id_references", user["id_references"]).execute())

    # ===== Validando o Dispositivo
    if not response_device.data:
        return jsonify({ "erro": "Dispositivo não encontrado" }), 404

    # ===== Pega o Primeiro Item da Linha da Dispositivo
    device = response_device.data[0]

    # ===== Validando o Dispositivo ao Usuário
    if dispositivo != device["identificador"]:
        return jsonify({ "erro": "Dispositivo não autorizado" }), 403

    # ===== Criptografia da Senha
    senha_valida = bcrypt.checkpw(
        senha.encode("utf-8"),
        user["senha"].encode("utf-8")
    )

    # ===== Validando a senha
    if not senha_valida:
        return jsonify({ "erro": "Senha inválida" }), 401

    # ===== Procurando a Instituição
    response = ( supabase.table("instituicoes").select("id").eq("id_references", user["id_references"]).execute() )

    # ===== Pega o Primeiro Item da Linha da Instituição
    info = response.data[0]

    # ===== Criando o Token
    token = create_access_token(identity=str(info["id"]))

    # ===== Retorna a Resposta
    return jsonify({ "token": token, "usuario": { "id": info["id"] } })