# ===== IMPORTAÇÃO =====

# ===== Importação de Biblioteca
from supabase import create_client

# ===== Importação de Arquivos
from app.config import Config

# ===== CRIAÇÃO DO CLIENTE =====
supabase = create_client(
    Config.SUPABASE_URL,
    Config.SUPABASE_KEY
)