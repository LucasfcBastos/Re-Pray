# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from flask import Blueprint, request, jsonify

# ===== Importação de Arquivos
from app.database import supabase

# ===== ROTA INTERNA =====
forms_bp = Blueprint("forms", __name__)

# ===== FUNÇÃO =====

# ===== Função para Pegar a Instituição
@forms_bp.route("/instituicao/<user_id>", methods=["GET"])
def get_instituicao(user_id):

    # ===== Procurando a Instituição
    response = ( supabase.table("instituicoes").select("id, nome").eq("id", user_id).execute() )

    # ===== Validando a Instituição
    if not response.data:
        return jsonify({ "erro": "Instituição não encontrada" }), 404

    # ===== Pega o Primeiro Item da Linha da Instituição
    info = response.data[0]

    # ===== Retorna a Instituição
    return jsonify(info), 200

# ===== Função para Pegar os Cursos
@forms_bp.route("/cursos", methods=["GET"])
def get_cursos():

    # ===== Puxar Todas os Cursos
    response = ( supabase.table("cursos").select("id, nome").order("nome").execute() )

    # ===== Retorna os Cursos
    return jsonify(response.data), 200

# ===== Função para Registrar o Pedido
@forms_bp.route("/pedidos", methods=["POST"])
def criar_pedido():

    # ===== Recebendo o Pacote
    data = request.json
    id_references = data.get("id_references")
    id_cursos = data.get("id_cursos")
    descricao = data.get("descricao")

    # ===== Validando o Pacote
    if not id_references or not id_cursos or not descricao:
        return jsonify({ "erro": "Dados incompletos" }), 400

    # ===== Buscando Pedido
    pedido_existente = ( supabase.table("pedidos").select("id, created_at").eq("id_references", id_references).eq("id_cursos", id_cursos).eq("descricao", descricao).order("created_at", desc=True).limit(1).execute() )

    # ===== Validando Pedido
    if pedido_existente.data:
        return jsonify({ "erro": "Pedido já enviado recentemente" }), 409

    # ===== Registrando um Novo Pedido
    response = ( supabase.table("pedidos").insert({ "id_references": id_references, "id_cursos": id_cursos, "descricao": descricao, "status": "novo" }).execute() )

    # ===== Retornando uma Mensagem de Envio
    return jsonify({ "mensagem": "Pedido enviado com sucesso", "data": response.data }), 201