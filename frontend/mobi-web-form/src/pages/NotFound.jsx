// ===== IMPORTAÇÃO =====

// ===== Importação Padrão
import img from '../assets/svg/error.svg';

// ===== FUNÇÃO PRINCIPAL =====
function NotFound() {

    // ===== VISUALIZAÇÃO =====
    return (
        <div>

            {/* ===== Cabeçalho Superior */}
            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>

            {/* ===== Centralização */}
            <div className="camp">

                {/* ===== Campo de Formulario */}
                <div className="camp-form">

                    {/* ===== Infomações de Erro */}
                    <div style={{textAlign: "center"}}>
                        <h2>ERROR 404</h2>
                        <p>Formulario inválida. Verifica a url</p>
                        <img src={img} alt="error" style={{width: "300px"}} />
                    </div>

                </div>

            </div>
            
        </div>
    );
    
}

// ===== Expondo a Função
export default NotFound;
