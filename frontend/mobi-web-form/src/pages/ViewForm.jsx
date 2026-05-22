import { useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/DbCourses";
import "../styles/form.css";

function ViewForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    function handleClick() {
        navigate(`/forms/formresponse/${id}`);
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
                        <label for="curso" class="block text-sm font-medium text-slate-300 mb-2">
                            Qual é o seu curso?
                        </label>
                        <select 
                            id="curso" 
                            name="curso" 
                            required
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                        >
                            <option value="" disabled selected>
                                Selecione seu curso...
                            </option>

                            {courses.map((course) => (
                                <option key={course.value} value={course.value}>
                                    {course.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label for="pedido" class="block text-sm font-medium text-slate-300 mb-2">
                            Faça o seu pedido de oração
                        </label>
                        <textarea 
                            id="pedido" 
                            name="pedido" 
                            rows="5" 
                            required
                            placeholder="Escreva aqui o que está no seu coração..."
                            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder:text-slate-500"
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
