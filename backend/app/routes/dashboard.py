# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from flask import Blueprint, jsonify

# ===== Importação de Arquivos
from app.database import supabase

# ===== ROTA INTERNA =====
dashboard_bp = Blueprint("dashboard", __name__)

# ===== FUNÇÃO =====

# ===== Função de Quantidade de Pedidos
@dashboard_bp.route("/quantidade/<user_id>", methods=["GET"])
def quantidade(user_id):

    # ===== Procurando Todos os Pedidos
    pedidos = ( supabase.table("pedidos").select("status").eq("id_references", user_id).execute())

    # ===== Lista de Dados
    dados = pedidos.data if pedidos.data else []

    # ===== Contadores
    total_novo = 0
    total_pendente = 0
    total_respondido = 0

    # ===== Percorrendo os Pedidos
    for pedido in dados:
        status = pedido.get("status", "").lower()

        if status == "novo":
            total_novo += 1
        elif status == "pendente":
            total_pendente += 1
        elif status == "respondido":
            total_respondido += 1

    # ===== Retornando JSON
    return jsonify({ "novo": total_novo, "pendente": total_pendente, "respondido": total_respondido }), 200

# ===== Ranking de Cursos =====
@dashboard_bp.route("/ranking/<user_id>", methods=["GET"])
def rank(user_id):

    try:

        # ===== Busca Todos os Pedidos
        pedidos_response = (
            supabase
            .table("pedidos")
            .select("id_cursos")
            .eq("id_references", user_id)
            .execute()
        )

        pedidos = pedidos_response.data or []

        # ===== Dicionário de Contagem
        ranking = {}

        # ===== Contando Cursos
        for pedido in pedidos:

            id_curso = pedido.get("id_cursos")

            # ===== Ignora Nulo
            if not id_curso:
                continue

            if id_curso in ranking:
                ranking[id_curso] += 1
            else:
                ranking[id_curso] = 1

        # ===== Ordenando
        top_5 = sorted(
            ranking.items(),
            key=lambda item: item[1],
            reverse=True
        )[:5]

        resultado = []

        # ===== Buscando Nome do Curso
        for id_curso, quantidade in top_5:

            curso_response = (
                supabase
                .table("cursos")
                .select("nome")
                .eq("id", id_curso)
                .execute()
            )

            cursos = curso_response.data or []

            # ===== Verifica se encontrou
            nome_curso = "Curso Desconhecido"

            if len(cursos) > 0:
                nome_curso = cursos[0]["nome"]

            resultado.append({
                "id_curso": id_curso,
                "nome_curso": nome_curso,
                "quantidade_pedidos": quantidade
            })

        # ===== Retorno Correto JSON
        return jsonify(resultado), 200

    except Exception as e:

        print("ERRO RANKING:", e)

        return jsonify([]), 500
