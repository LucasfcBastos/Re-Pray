# ===== IMPORTAÇÃO =====
import os
from dotenv import load_dotenv

# ===== ABRINDO O COFRE =====
load_dotenv()

# ===== CLASSE DE CONFIGURAÇÃO =====
class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")