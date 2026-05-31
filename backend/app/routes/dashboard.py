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
        top_12 = sorted(
            ranking.items(),
            key=lambda item: item[1],
            reverse=True
        )[:12]

        resultado = []

        # ===== Buscando Nome do Curso
        for id_curso, quantidade in top_12:

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

# ===== Ranking de Categorias =====
@dashboard_bp.route("/categorias/<user_id>", methods=["GET"])
def categorias(user_id):

    print("ROTA NOVA FUNCIONANDO")

    try:

        # ===== Busca Pedidos
        pedidos_response = (
            supabase
            .table("pedidos")
            .select("descricao")
            .eq("id_references", user_id)
            .execute()
        )

        pedidos = pedidos_response.data or []

        # ===== Categorias
        categorias = {
            "Saúde": 0,
            "Família": 0,
            "Financeiro": 0,
            "Emocional": 0,
            "Espiritual": 0,
            "Trabalho": 0,
            "Relacionamento": 0,
            "Estudos": 0,
            "Outros": 0
        }

        # ===== Classificação
        for pedido in pedidos:

            texto = pedido.get("descricao", "").lower()

            if any(p in texto for p in [
                "saúde",
                "doente",
                "cirurgia",
                "hospital",
                "câncer",
                "enferm",
                "dor"
            ]):

                categorias["Saúde"] += 1

            elif any(p in texto for p in [
                "mãe",
                "pai",
                "filho",
                "família",
                "irmão",
                "irmã"
            ]):

                categorias["Família"] += 1

            elif any(p in texto for p in [
                "dinheiro",
                "dívida",
                "endividado",
                "financeiro",
                "conta"
            ]):

                categorias["Financeiro"] += 1

            elif any(p in texto for p in [
                "ansiedade",
                "depressão",
                "medo",
                "emocional",
                "triste"
            ]):

                categorias["Emocional"] += 1

            elif any(p in texto for p in [
                "oração",
                "jesus",
                "deus",
                "fé",
                "espiritual"
            ]):

                categorias["Espiritual"] += 1

            elif any(p in texto for p in [
                "emprego",
                "trabalho",
                "serviço"
            ]):

                categorias["Trabalho"] += 1

            elif any(p in texto for p in [
                "namoro",
                "casamento",
                "relacionamento"
            ]):

                categorias["Relacionamento"] += 1

            elif any(p in texto for p in [
                "faculdade",
                "estudo",
                "prova",
                "enem"
            ]):

                categorias["Estudos"] += 1

            else:

                categorias["Outros"] += 1

        # ===== Resultado
        resultado = []

        for nome, valor in categorias.items():

            resultado.append({
                "name": nome,
                "value": valor
            })

        return jsonify(resultado), 200

    except Exception as e:

        print("ERRO CATEGORIAS:", e)

        return jsonify([]), 500