// ===== IMPORTAÇÃO =====

// ===== Importação de Efeito Colateral
import "../styles/card.css";

// ===== FUNÇÃO PRINCIPAL =====
function Cards({ numb, children }) {

    // ===== VISUALIZAÇÃO =====
    return (
        <>

            {/* Card Unico*/}
            <div className="card">
                <p>{children}</p>
                <h1>{numb}</h1>
            </div>
            
        </>
    );

}

// ===== Expondo a Função
export default Cards;
