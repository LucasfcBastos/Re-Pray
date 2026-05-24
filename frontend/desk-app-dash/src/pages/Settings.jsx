// ===== IMPORTAÇÃO =====

// ===== Importação Padrão
import LiButton from "../components/LiButton";

// ===== Importação de Efeito Colateral
import "../styles/pages.css";

// ===== FUNÇÃO PRINCIPAL =====
function Settings() {

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
                    <LiButton href="/dashboard" styles="" children="Dashboard" />
                    <LiButton href="/prays" styles="" children="Pedidos" />
                    <LiButton href="/qrcode" styles="" children="Código QR" />
                    <LiButton href="/settings" styles="select" children="Configurações" />
                </ul>
                <div style={{ position: "absolute", bottom: "0em" }}>
                    <ul>
                        <LiButton href="/" styles="btn_logout" children="Sair" logout={true} />
                    </ul>
                </div>

            </aside>

            {/* ===== Campo Principal */}
            <main>
            </main>

        </div>
    );

}

// ===== Expondo a Função
export default Settings;
