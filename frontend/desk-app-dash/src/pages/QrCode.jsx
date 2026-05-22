import { useState, useEffect } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { generateQrPDF } from "../services/pdfGenerator";
import LiButton from "../components/LiButton";
import "../styles/pages.css";

function QrCode() {

    const [id, setId] = useState("");

    useEffect(() => {

        async function carregarInstituicao() {

            const usuarioStorage = localStorage.getItem("usuario");

            if (!usuarioStorage) return;

            const usuario = JSON.parse(usuarioStorage);

            const response = await fetch(
                `http://127.0.0.1:5000/forms/instituicao/${usuario.id}`
            );

            if (!response.ok) {
                console.error("Erro na API:", await response.text());
                return;
            }

            const data = await response.json();

            setId(data.id);
        }

        carregarInstituicao();

    }, []);

    return (
        <div>
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>
            <aside>
                <ul style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                    <LiButton href="/dashboard" styles="" children="Dashboard" />
                    <LiButton href="/prays" styles="" children="Pedidos" />
                    <LiButton href="/qrcode" styles="select" children="Código QR" />
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
                            <h2>Código QR</h2>
                            <hr />
                        </div>
                        <div style={{width: "100%", height: "100%", alignContent: "center", textAlign: "center"}}>
                            { id && (
                                <QRCodeCanvas
                                    key={id}
                                    value={`https://repray.vercel.app/forms/viewform/${id}`}
                                    size={225}
                                />
                            )}
                        </div>
                    </div>
                    <div className='camp-field pdf'>
                        <div>
                            <h2>Baixar PDF</h2>
                            <hr />
                        </div>
                        <div style={{width: "100%", height: "100%", alignContent: "center", textAlign: "center"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1em"
                            }}>
                                <button onClick={() => generateQrPDF(1)} className='on'>
                                    1 QR por folha
                                </button>

                                <button onClick={() => generateQrPDF(2)} className='on'>
                                    2 QR por folha
                                </button>

                                <button onClick={() => generateQrPDF(4)} className='on'>
                                    4 QR por folha
                                </button>

                                <button onClick={() => generateQrPDF(8)} className='on'>
                                    8 QR por folha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default QrCode;
