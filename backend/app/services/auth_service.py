import bcrypt
from app.database import supabase

class AuthService:

    @staticmethod
    def register(nome, email, senha):

        senha_hash = bcrypt.hashpw(
            senha.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        response = supabase.table("usuario").insert({
            "nome": nome,
            "email": email,
            "senha": senha_hash
        }).execute()

        return response.data

    @staticmethod
    def login(email, senha):

        response = supabase.table("usuario") \
            .select("*") \
            .eq("email", email) \
            .execute()

        if not response.data:
            return None

        usuario = response.data[0]

        senha_correta = bcrypt.checkpw(
            senha.encode("utf-8"),
            usuario["senha"].encode("utf-8")
        )

        if not senha_correta:
            return None

        return usuario