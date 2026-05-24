// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useNavigate, useParams } from "react-router-dom";

// ===== Importação de Efeito Colateral
import "../styles/form.css";

// ===== FUNÇÃO PRINCIPAL =====
function FormResponse() {

    // ===== COMPONENTES =====

    // ===== Os Navegadores
    const navigate = useNavigate();
    const { id } = useParams();

    // ===== FUNÇÕES =====

    // ===== Função de Click
    function handleClick() {
        navigate(`/forms/viewform/${id}`);
    }

    // ===== VISUALIZAÇÃO =====
    return (
        <div>

            {/* ===== Cabeçalho Superior */}
            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>

            {/* ===== Centralização */}
            <div className="camp">

                {/* ===== Campo de Exibição */}
                <div className="camp-form">

                    {/* ===== Titulo e Subtitulo */}
                    <div>
                        <h2>Oração Enviada</h2>
                        <hr />
                    </div>
                    <p>Seu pedido de oração foi enviado com sucesso!</p>

                    {/* ===== Centralizar Botão */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        
                        {/* ===== Botão */}
                        <button type="submit" className="on" onClick={handleClick}>
                            Enviar outro Pedido
                        </button>

                    </div>
                    
                </div>

            </div>

        </div>
    );

}

// ===== Expondo a Função
export default FormResponse;
