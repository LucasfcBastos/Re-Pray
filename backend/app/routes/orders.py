from flask import Blueprint, request, jsonify
from app.database import supabase

orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/pedidos/<user_id>", methods=["GET"])
def get_pedidos(user_id):

    list = (
        supabase
        .table("pedidos")
        .select("""
            id,
            descricao,
            status,
            created_at,
            cursos:id_cursos (
                id,
                nome
            )
        """)
        .eq("id_references", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    if not list: 
        return jsonify({
            "responder": "Não possui pedidos enviado ainda"
        }), 200
    
    return jsonify(list.data), 200