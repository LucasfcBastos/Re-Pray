import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/form.css";

function Login() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {

        try {

            const dispositivo =
                await window.electronAPI.getDeviceId();

            console.log(dispositivo);

            const response = await fetch(
                "http://127.0.0.1:5000/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        usuario,
                        senha,
                        dispositivo
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (!response.ok) {

                alert(data.erro);

                return;
            }

            // salva token
            localStorage.setItem(
                "token",
                data.token
            );

            // salva usuário
            localStorage.setItem(
                "usuario",
                JSON.stringify(data.usuario)
            );

            // dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert(
                "Erro ao conectar no servidor"
            );
        }
    };

    return (
        <div>

            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>

            <div className="camp">

                <div className="camp-form">

                    <div>
                        <h2>Tela de Login</h2>
                        <hr />
                    </div>

                    {/* USUÁRIO */}
                    <div>

                        <label>
                            Usuário
                        </label>

                        <input
                            type="text"

                            value={usuario}

                            onChange={(e) =>
                                setUsuario(e.target.value)
                            }

                            required
                        />
                    </div>

                    {/* SENHA */}
                    <div>

                        <label>
                            Senha
                        </label>

                        <input
                            type="password"

                            value={senha}

                            onChange={(e) =>
                                setSenha(e.target.value)
                            }

                            required
                        />
                    </div>

                    {/* BOTÃO */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >

                        <button
                            type="button"
                            className="on"
                            onClick={handleLogin}
                        >
                            Entrar no Sistema
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;