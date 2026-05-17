import { useNavigate } from "react-router-dom";
import "../styles/form.css";

function Login() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard");
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
                    <div>
                        <label for="pedido" class="block text-sm font-medium text-slate-300 mb-2">
                            Usuario
                        </label>
                        <input 
                            id="pedido" 
                            name="pedido" 
                            rows="5" 
                            required
                        ></input>
                    </div>
                    <div>
                        <label for="pedido" class="block text-sm font-medium text-slate-300 mb-2">
                            Senha
                        </label>
                        <input 
                            id="pedido" 
                            name="pedido" 
                            rows="5" 
                            required
                        ></input>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="submit" className="on" onClick={handleClick}>
                            Entrar no Sistema
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;