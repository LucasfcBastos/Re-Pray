// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ===== Importação de Efeito Colateral
import "../styles/form.css";

// ===== FUNÇÃO PRINCIPAL =====
function Login() {

    // ===== COMPONENTES =====

    // ===== Os Navegadores
    const navigate = useNavigate();

    // ===== Memória de Textos
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    // ===== FUNÇÕES =====

    // ===== Função de Login
    const handleLogin = async () => {

        // ===== Rede de Proteção
        try {

            // ===== Ponte com o Computador
            const dispositivo = await window.electronAPI.getDeviceId();
            console.log(dispositivo);

            // ===== Envio de Dados
            const response = await fetch("http://127.0.0.1:5000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario,
                        senha,
                        dispositivo
                    })
                }
            );

            // ===== Resposta da API
            const data = await response.json();
            if (!response.ok) {
                alert(data.erro);
                return;
            }

            // ===== Salva o Token e Usuário
            localStorage.setItem( "token", data.token );
            localStorage.setItem( "usuario", JSON.stringify(data.usuario) );

            // ===== Redirecionamento
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Erro ao conectar no servidor");
        }

    };

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

                    {/* ===== Titulo */}
                    <div>
                        <h2>Tela de Login</h2>
                        <hr />
                    </div>

                    {/* ===== Campo de Input */}
                    <div>

                        {/* ===== Nomeclátura */}
                        <label>
                            Usuário
                        </label>

                        {/* ===== Input */}
                        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value) } required />

                    </div>

                    {/* ===== Campo de Input */}
                    <div>

                        {/* ===== Nomeclátura */}
                        <label>
                            Senha
                        </label>

                        {/* ===== Input */}
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value) } required/>

                    </div>

                    {/* BOTÃO */}
                    <div style={{ display: "flex", justifyContent: "end" }} >

                        <button type="button" className="on" onClick={handleLogin} >
                            Entrar no Sistema
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );

}

// ===== Expondo a Função
export default Login;