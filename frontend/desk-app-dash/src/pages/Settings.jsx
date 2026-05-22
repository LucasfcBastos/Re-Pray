import LiButton from "../components/LiButton";
import "../styles/pages.css";

function Settings() {
    return (
        <div>
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>
            <aside>
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
            <main>
            </main>
        </div>
    );
}

export default Settings;
