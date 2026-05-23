import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/form.css";

function ViewForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [courses, setCourses] = useState([]);

    const [cursoSelecionado, setCursoSelecionado] = useState("");
    const [descricao, setDescricao] = useState("");

    const formularioValido = cursoSelecionado !== "" && descricao.trim() !== "";

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

    async function handleClick() {

        if (!formularioValido) {
            alert("Preencha o formulário corretamente");
            return;
        }

        try {

            const response = await fetch(
                "https://re-pray-api.onrender.com/forms/pedidos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_references: id,
                        id_cursos: cursoSelecionado,
                        descricao: descricao
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.erro || "Erro ao enviar pedido");
                return;
            }

            navigate(`/forms/formresponse/${id}`);

        } catch (err) {

            console.error(err);

            alert("Erro ao conectar com servidor");

        }

    }

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
                            value={cursoSelecionado}
                            onChange={(e) => setCursoSelecionado(e.target.value)}
                            required
                        >

                            <option value="" disabled>
                                Selecione seu curso...
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course.id}
                                    value={course.id}
                                >
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
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end"
                        }}
                    >

                        <button
                            type="button"
                            className={formularioValido ? "on" : "off"}
                            onClick={handleClick}
                        >
                            Enviar Pedido
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ViewForm;