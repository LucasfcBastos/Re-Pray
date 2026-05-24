// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useNavigate } from "react-router-dom";

// ===== Importação de Efeito Colateral
import "../styles/btn.css";

// ===== FUNÇÃO PRINCIPAL =====
function LiButton({ href, styles, children, logout = false  }) {

    // ===== COMPONENTES =====

    // ===== Os Navegadores
    const navigate = useNavigate();

    // ===== FUNÇÕES =====

    // ===== Função de Click
    const handleClick = () => {

        // ===== Remova o Token e Usuário
        if (logout) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
        }
        
        // ===== Redirecionamento
        navigate(href);

    };

    // ===== VISUALIZAÇÃO =====
    return (
        <>

            {/* ===== Botão de Opção */}
            <li><button onClick={handleClick} className={`btn_li ${styles}`}>{children}</button></li>
        
        </>
    );

}

// ===== Expondo a Função
export default LiButton;
