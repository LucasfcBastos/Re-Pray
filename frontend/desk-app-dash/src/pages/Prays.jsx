import LiButton from "../components/LiButton";
import ListTable from "../components/ListTable";
import "../styles/pages.css";

function Prays() {

    const info = [
    ];

    return (
        <div>
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>
            <aside>
                <ul style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                    <LiButton href="/dashboard" styles="" children="Dashboard" />
                    <LiButton href="/prays" styles="select" children="Pedidos" />
                    <LiButton href="/qrcode" styles="" children="Código QR" />
                    <LiButton href="/settings" styles="" children="Configurações" />
                </ul>
                <div style={{ position: "absolute", bottom: "0em" }}>
                    <ul>
                        <LiButton href="/" styles="btn_logout" children="Sair" />
                    </ul>
                </div>
            </aside>
            <main>
                <div className='camp-limit'>
                    <div className='camp-field full'>
                        <div>
                            <h2>Pedidos de Orações</h2>
                            <hr />
                        </div>
                        <ListTable info={info} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Prays;
