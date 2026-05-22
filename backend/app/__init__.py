from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.config import Config
from app.routes.auth import auth_bp

def create_app():

    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

    JWTManager(app)

    CORS(app)

    app.register_blueprint(
        auth_bp,
        url_prefix="/auth"
    )

    return app