// ===== IMPORTAÇÃO =====

// ===== Importação Padrão
import LiButton from "../components/LiButton";
import Cards from "../components/Cards";

// ===== Importação de Efeito Colateral
import "../styles/pages.css";

// ===== FUNÇÃO PRINCIPAL =====
function Dashboard() {

    // ===== VISUALIZAÇÃO =====
    return (
        <div>

            {/* ===== Cabeçalho Superior */}
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>

            {/* ===== Barra lateral */}
            <aside>

                {/* ===== Opções de Navegação */}
                <ul style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                    <LiButton href="/dashboard" styles="select" children="Dashboard" />
                    <LiButton href="/prays" styles="" children="Pedidos" />
                    <LiButton href="/qrcode" styles="" children="Código QR" />
                    <LiButton href="/settings" styles="" children="Configurações" />
                </ul>
                <div style={{ position: "absolute", bottom: "0em" }}>
                    <ul>
                        <LiButton href="/" styles="btn_logout" children="Sair" logout={true} />
                    </ul>
                </div>

            </aside>

            {/* ===== Campo Principal */}
            <main>
                <div className="camp-cards">
                    <Cards children={"Total de Novos Pedidos"} numb="0" />
                    <Cards children={"Total de Pedidos não Respondido"} numb="0" />
                    <Cards children={"Total de Pedidos Enviados"} numb="0" />
                </div>
            </main>

        </div>
    );

}

// ===== Expondo a Função
export default Dashboard;
