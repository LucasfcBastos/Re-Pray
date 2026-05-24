// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// ===== Importação de Efeito Colateral
import "../styles/form.css";

// ===== FUNÇÃO PRINCIPAL =====
function ViewForm() {

    // ===== COMPONENTES =====

    // ===== Os Navegadores
    const navigate = useNavigate();
    const { id } = useParams();

    // ===== Memória de Array
    const [courses, setCourses] = useState([]);

    // ===== Memória de Textos
    const [cursoSelecionado, setCursoSelecionado] = useState("");
    const [descricao, setDescricao] = useState("");

    // ===== Memória de Booleano
    const [enviando, setEnviando] = useState(false);

    // ===== Variável Derivada
    const formularioValido = cursoSelecionado !== "" && descricao.trim() !== "";

    // ===== ENGRENAGENS =====

    // ===== Guarda-Chuva de Cursos
    useEffect(() => {

        // ===== FUNÇÃO PRINCIPAL =====
        async function carregarCursos() {

            // ===== Rede de Proteção
            try {

                // ===== Busca dos Dados
                const response = await fetch("https://re-pray-api.onrender.com/forms/cursos");

                // ===== Traduzindo a Resposta
                const data = await response.json();

                // ===== Atualizando a Tela
                setCourses(data);
            
            } catch (err) {
                console.error("Erro ao carregar cursos:", err);
            }

        }

        // ===== Chamada de Função
        carregarCursos();

    }, []);

    // ===== FUNÇÕES =====

    // ===== Função de Click
    async function handleClick() {

        // ===== Segurança da Função
        if (enviando) return;
        if (!formularioValido) {
            alert("Preencha o formulário corretamente");
            return;
        }

        // ===== Iniciando o Carregamento
        setEnviando(true);

        // ===== Rede de Proteção
        try {

            // ===== Envio de Dados
            const response = await fetch( "https://re-pray-api.onrender.com/forms/pedidos", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id_references: id,
                        id_cursos: cursoSelecionado,
                        descricao: descricao
                    })
                }
            );

            // ===== Tratamento da Resposta
            const data = await response.json();
            if (!response.ok) {
                alert(data.erro || "Erro ao enviar pedido");
                setEnviando(false);
                return;
            }

            // ===== Sucesso e Redirecionamento
            navigate(`/forms/formresponse/${id}`);

        } catch (err) {
            setEnviando(false);
        }

    }

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
                        <h2>Espaço de Oração</h2>
                        <hr />
                    </div>

                    {/* ===== Campo de Seleção */}
                    <div>

                        {/* ===== Nomeclátura */}
                        <label htmlFor="curso">
                            Qual é o seu curso?
                        </label>

                        {/* ===== Seleção */}
                        <select id="curso" name="curso" value={cursoSelecionado} onChange={(e) => setCursoSelecionado(e.target.value)} required >

                            {/* ===== Opção Nula */}
                            <option value="" disabled>
                                Selecione seu curso...
                            </option>

                            {/* ===== Loop de Exibição de Opções */}
                            {courses.map((course) => (
                                <option key={course.id} value={course.id} >
                                    {course.nome}
                                </option>
                            ))}

                        </select>

                    </div>

                    {/* ===== Campo de Texto */}
                    <div>

                        {/* ===== Nomeclátura */}
                        <label htmlFor="pedido">
                            Faça o seu pedido de oração
                        </label>

                        {/* ===== Texto */}
                        <textarea id="pedido" name="pedido" rows="5" required placeholder="Escreva aqui o que está no seu coração..." value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                    </div>

                    {/* ===== Centralizar Botão */}
                    <div style={{ display: "flex", justifyContent: "end" }} >
                        
                        {/* ===== Botão */}
                        <button type="button" className={formularioValido ? "on" : "off"} onClick={handleClick} disabled={enviando} >
                            {enviando ? "Enviando..." : "Enviar Pedido"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );

}

// ===== Expondo a Função
export default ViewForm;