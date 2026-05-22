from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.config import Config
from app.routes.auth import auth_bp
from app.routes.forms import forms_bp

def create_app():

    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

    JWTManager(app)

    CORS(app)

    app.register_blueprint( auth_bp, url_prefix="/auth" )
    app.register_blueprint( forms_bp, url_prefix="/forms" )

    @app.route("/")
    def home():

        return {
            "status": "online",
            "api": "RE-PRAY"
        }

    return app