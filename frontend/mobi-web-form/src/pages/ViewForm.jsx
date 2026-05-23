import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/form.css";

function ViewForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [courses, setCourses] = useState([]);

    function handleClick() {
        navigate(`/forms/formresponse/${id}`);
    }

    useEffect(() => {

        async function carregarCursos() {

            try {

                const response = await fetch(
                    "https://re-pray-api.onrender.com/forms/cursos"
                );

                const data = await response.json();

                setCourses(data);

            } catch (err) {

                console.error("Erro ao carregar cursos:", err);

            }

        }

        carregarCursos();

    }, []);

    return (
        <div>
            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>
            <div className="camp">
                <div className="camp-form">
                    <div>
                        <h2>Espaço de Oração</h2>
                        <hr />
                    </div>
                    <div>
                        <label htmlFor="curso">
                            Qual é o seu curso?
                        </label>
                        <select 
                            id="curso" 
                            name="curso" 
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Selecione seu curso...
                            </option>

                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pedido">
                            Faça o seu pedido de oração
                        </label>
                        <textarea 
                            id="pedido" 
                            name="pedido" 
                            rows="5" 
                            required
                            placeholder="Escreva aqui o que está no seu coração..."
                        ></textarea>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button type="submit" className="off" onClick={handleClick}>
                            Enviar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewForm;
