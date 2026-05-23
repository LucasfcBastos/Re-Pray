import { useState, useEffect } from "react";
import LiButton from "../components/LiButton";
import ListTable from "../components/ListTable";
import "../styles/pages.css";

function Prays() {

    const usuarioStorage = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStorage);

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {

        async function carregarPedidos() {

            try {

                const response = await fetch(
                    `http://127.0.0.1:5000/orders/pedidos/${usuario.id}`
                );

                const data = await response.json();

                setPedidos(data);

            } catch (err) {

                console.error("Erro ao carregar pedidos:", err);

            }

        }

        carregarPedidos();

    }, []);

    async function atualizarStatus(idPedido) {

        try {

            const response = await fetch(
                `http://127.0.0.1:5000/orders/status/${idPedido}`,
                {
                    method: "PUT"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || "Erro ao atualizar pedido");
                return;
            }

            // atualiza estado local
            setPedidos((prev) =>
                prev.map((item) =>
                    item.id === idPedido
                        ? { ...item, status: "respondido" }
                        : item
                )
            );

        } catch (err) {

            console.error(err);

            alert("Erro ao conectar com servidor");

        }

    }

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
                        <LiButton href="/" styles="btn_logout" children="Sair" logout={true} />
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

                        <ListTable
                            info={pedidos}
                            atualizarStatus={atualizarStatus}
                        />

                    </div>
                </div>
            </main>
        </div>
    );
}

export default Prays;