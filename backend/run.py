# ===== IMPORTAÇÃO =====
from app import create_app

# ===== FABRICAÇÃO =====
app = create_app()

# ===== EXECUÇÃO =====
if __name__ == "__main__":
    app.run(debug=True)