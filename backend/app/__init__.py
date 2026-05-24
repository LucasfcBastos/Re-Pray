# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# ===== Importação de Arquivos
from app.config import Config
from app.routes.auth import auth_bp
from app.routes.forms import forms_bp
from app.routes.orders import orders_bp

# ===== FUNÇÃO =====
def create_app():

    # ===== Criando o Servidor e Injetando a Senha
    app = Flask(__name__)
    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

    # ===== Ativando o JWT e CORS
    JWTManager(app)
    CORS(app)

    # ===== Organizando as Rotas
    app.register_blueprint( auth_bp, url_prefix="/auth" )
    app.register_blueprint( forms_bp, url_prefix="/forms" )
    app.register_blueprint( orders_bp, url_prefix="/orders" )

    # ===== Rota de Teste
    @app.route("/")
    def home():
        return {
            "status": "online",
            "api": "RE-PRAY"
        }

    # ===== Retornando o App
    return app