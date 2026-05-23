import { useNavigate, useParams } from "react-router-dom";
import "../styles/form.css";

function FormResponse() {

    const navigate = useNavigate();

    const { id } = useParams();

    function handleClick() {
        navigate(`/forms/viewform/${id}`);
    }

    return (
        <div>
            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>
            <div className="camp">
                <div className="camp-form">
                    <div>
                        <h2>Oração Enviada</h2>
                        <hr />
                    </div>
                    <p>Seu pedido de oração foi enviado com sucesso!</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button type="submit" className="on" onClick={handleClick}>
                            Enviar outro Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormResponse;
