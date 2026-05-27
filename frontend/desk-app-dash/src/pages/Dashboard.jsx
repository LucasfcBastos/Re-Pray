// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

// ===== Importação Padrão
import LiButton from "../components/LiButton";
import Cards from "../components/Cards";

// ===== Importação de Efeito Colateral
import "../styles/pages.css";

// ===== FUNÇÃO PRINCIPAL =====
function Dashboard() {

    // ===== COMPONENTES =====

    // ===== Banco do Navegador
    const usuarioStorage = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStorage);

    // ===== Memória de Array
    const [pedidos, setPedidos] = useState({ novo: 0, pendente: 0, respondido: 0, });
    const [rankingCursos, setRankingCursos] = useState([]);

    // ===== ENGRENAGENS =====

    // ===== Guarda-Chuva de Cursos
    useEffect(() => {

        // ===== FUNÇÃO PRINCIPAL =====
        async function carregarPedidos() {

            // ===== Rede de Proteção
            try {

                // ===== Busca dos Dados
                const response = await fetch(`http://127.0.0.1:5000/dashboard/quantidade/${usuario.id}`);

                // ===== Traduzindo a Resposta
                const data = await response.json();

                // ===== Atualizando a Tela
                setPedidos(data);

            } catch (err) {
                console.error("Erro ao carregar pedidos:", err);
            }

        }

        // ===== Chamada de Função
        carregarPedidos();
        carregarRanking();

        // ===== Canal de Comunicação
        const channel = supabase.channel("pedidos-realtime")
        
            // Ouvinte de Eventos
            .on("postgres_changes", { event: "*", schema: "public", table: "pedidos" }, () => {
                carregarPedidos();
                carregarRanking();
            })
        
            // Apertando o Play
            .subscribe();

        // ===== limpeza
        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    // ===== FUNÇÃO RANKING =====
    async function carregarRanking() {

        try {

            // ===== Busca dos Dados
            const response = await fetch(
                `http://127.0.0.1:5000/dashboard/ranking/${usuario.id}`
            );

            // ===== Convertendo Resposta
            const data = await response.json();

            // ===== Atualizando Tela
            setRankingCursos(data);

        } catch (err) {
            console.error("Erro ao carregar ranking:", err);
        }

    }

    // ===== VISUALIZAÇÃO =====
    return (
        <div>

            {/* ===== Cabeçalho Superior */}
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>

            {/* ===== Barra lateral */}
            <aside>

                {/* ===== Opções de Navegação */}
                <ul style={{display: "flex", flexDirection: "column", gap: "1em"}}>
                    <LiButton href="/dashboard" styles="select" children="Dashboard" />
                    <LiButton href="/prays" styles="" children="Pedidos" />
                    <LiButton href="/qrcode" styles="" children="Código QR" />
                    <LiButton href="/settings" styles="" children="Configurações" />
                </ul>
                <div style={{ position: "absolute", bottom: "0em" }}>
                    <ul>
                        <LiButton href="/" styles="btn_logout" children="Sair" logout={true} />
                    </ul>
                </div>

            </aside>

            {/* ===== Campo Principal */}
            <main>
                <div className="camp-cards">
                    <Cards children={"Total de Novos Pedidos"} numb={pedidos.novo} />
                    <Cards children={"Total de Pedidos não Respondido"} numb={pedidos.pendente} />
                    <Cards children={"Total de Pedidos Respondido"} numb={pedidos.respondido} />
                </div>
                <div className="camp-static">
                    <div className="card">
                        <h1>Rank de Pedidos</h1>
                        <div>

                            {rankingCursos.length === 0 && (
                                <div>
                                    <p style={{ textAlign: "center", paddingTop: "1em" }} >
                                        Nenhum pedido registrado.
                                    </p>
                                </div>
                            )}

                            {rankingCursos.map((curso, index) => (
                                <div
                                    key={curso.id_curso}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <p>
                                        {curso.nome_curso}
                                    </p>

                                    <div>
                                        <p>{curso.quantidade_pedidos}</p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="card">
                        <h1>Grafíco de Categorias</h1>
                        <div>

                            <p style={{ textAlign: "center", paddingTop: "1em" }} >
                                Em obra.
                            </p>

                        </div>
                    </div>
                </div>
            </main>

        </div>
    );

}

// ===== Expondo a Função
export default Dashboard;
