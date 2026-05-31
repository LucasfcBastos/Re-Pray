// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

// ===== Importação Padrão
import LiButton from "../components/LiButton";
import Cards from "../components/Cards";

// ===== Importação de Efeito Colateral
import "../styles/pages.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

// ===== FUNÇÃO PRINCIPAL =====
function Dashboard() {

    // ===== COMPONENTES =====

    // ===== Banco do Navegador
    const usuarioStorage = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStorage);

    // ===== Memória de Estado
    const [pedidos, setPedidos] = useState({
        novo: 0,
        pendente: 0,
        respondido: 0
    });

    // ===== Memória de Array
    const [rankingCursos, setRankingCursos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    // ===== Memória de Booleano
    const [loadingRank, setLoadingRank] = useState(true);
    const [loadingCat, setLoadingCat] = useState(true);

    // ===== USE EFFECT =====
    useEffect(() => {

        carregarPedidos();
        carregarRanking();
        carregarCategorias();

        // ===== REALTIME =====
        const channel = supabase
            .channel("pedidos-realtime")

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "pedidos"
                },

                () => {

                    carregarPedidos();
                    carregarRanking();
                    carregarCategorias();

                }
            )

            .subscribe();

        // ===== LIMPEZA =====
        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    // ===== FUNÇÃO PEDIDOS =====
    async function carregarPedidos() {

        try {

            const response = await fetch(
                `http://127.0.0.1:5000/dashboard/quantidade/${usuario.id}`
            );

            const data = await response.json();

            setPedidos(data);

        } catch (err) {

            console.error("Erro ao carregar pedidos:", err);

        }

    }

    // ===== FUNÇÃO RANKING =====
    async function carregarRanking() {

        try {

            setLoadingRank(true);

            const response = await fetch(
                `http://127.0.0.1:5000/dashboard/ranking/${usuario.id}`
            );

            const data = await response.json();

            setRankingCursos(data);

        } catch (err) {

            console.error("Erro ao carregar ranking:", err);

        } finally {

            // ===== Desativa o Carregamento
            setLoadingRank(false);

        }

    }

    // ===== FUNÇÃO CATEGORIAS =====
    async function carregarCategorias() {

        try {

            setLoadingCat(true);

            const response = await fetch(
                `http://127.0.0.1:5000/dashboard/categorias/${usuario.id}`
            );

            const data = await response.json();

            console.log(data);

            setCategorias(data);

        } catch (err) {

            console.error("Erro ao carregar categorias:", err);

        } finally {

            // ===== Desativa o Carregamento
            setLoadingCat(false);

        }

    }

    // ===== VISUALIZAÇÃO =====
    return (

        <div>

            {/* ===== Cabeçalho Superior ===== */}
            <div className="bar-top line-bar">
                <h1>RE-PRAY</h1>
            </div>

            {/* ===== Barra Lateral ===== */}
            <aside>

                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em"
                    }}
                >

                    <LiButton
                        href="/dashboard"
                        styles="select"
                        children="Dashboard"
                    />

                    <LiButton
                        href="/prays"
                        styles=""
                        children="Pedidos"
                    />

                    <LiButton
                        href="/qrcode"
                        styles=""
                        children="Código QR"
                    />

                    <LiButton
                        href="/settings"
                        styles=""
                        children="Configurações"
                    />

                </ul>

                <div
                    style={{
                        position: "absolute",
                        bottom: "0em"
                    }}
                >

                    <ul>

                        <LiButton
                            href="/"
                            styles="btn_logout"
                            children="Sair"
                            logout={true}
                        />

                    </ul>

                </div>

            </aside>

            {/* ===== MAIN ===== */}
            <main>

                {/* ===== CARDS ===== */}
                <div className="camp-cards">

                    <Cards
                        children={"Total de Novos Pedidos"}
                        numb={pedidos.novo}
                    />

                    <Cards
                        children={"Total de Pedidos não Respondido"}
                        numb={pedidos.pendente}
                    />

                    <Cards
                        children={"Total de Pedidos Respondido"}
                        numb={pedidos.respondido}
                    />

                </div>

                {/* ===== ESTATÍSTICAS ===== */}
                <div className="camp-static">

                    {/* ===== RANKING ===== */}
                    <div className="card dash">

                        <h1>Rank de Pedidos</h1>

                        <div style={{ paddingTop: "1em" }} >

                            {loadingRank && (

                                <div>

                                    <p style={{ textAlign: "center" }}>
                                        Carregando Ranking...
                                    </p>

                                </div>

                            )}

                            {!loadingRank && rankingCursos.length === 0 && (

                                <div>

                                    <p style={{ textAlign: "center" }}>
                                        Nenhum pedido registrado.
                                    </p>

                                </div>

                            )}

                            {!loadingRank && rankingCursos.map((curso, index) => (

                                <div key={curso.id_curso} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >

                                    <p>{index + 1}. {curso.nome_curso} </p>

                                    <div>
                                        <p>{curso.quantidade_pedidos}</p>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>
                    
                    {/* ===== GRÁFICO ===== */}
                    <div className="card dash">

                        <h1>Gráfico de Categorias</h1>

                        <div style={{ paddingTop: "1em" }} >

                            {loadingCat && (

                                <div>

                                    <p style={{ textAlign: "center" }}>
                                        Carregando Categorias...
                                    </p>

                                </div>

                            )}

                            {!loadingCat && categorias.length === 0 && (

                                <div>

                                    <p style={{ textAlign: "center" }}>
                                        Nenhum pedido registrado.
                                    </p>

                                </div>

                            )}

                            {!loadingCat && categorias.length !== 0 && (

                                <div style={{ width: "100%", height: "250px" }} >

                                    <Pie
                                        data={{
                                            labels: categorias.map((item) => item.name),

                                            datasets: [
                                                {
                                                    label: "Pedidos",

                                                    data: categorias.map((item) => item.value),

                                                    backgroundColor: [
                                                        "#0093CB", // saude
                                                        "#3F51B5", // familia
                                                        "#FFBB28", // financeiro
                                                        "#a059e3", // emocional
                                                        "#f4f4f4", // espitirual
                                                        "#1c2556", // trabalho
                                                        "#FF0059", // relacionamento
                                                        "#5db53f", // estudos
                                                        "#7f7f7f"  // outros
                                                    ],

                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "white" }, } } }} />

                                </div>

                            )}


                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}

// ===== EXPORTAÇÃO =====
export default Dashboard;