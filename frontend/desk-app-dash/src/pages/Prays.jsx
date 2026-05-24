// ===== IMPORTAÇÃO =====

// ===== Importação Nomeada
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

// ===== Importação Padrão
import LiButton from "../components/LiButton";
import ListTable from "../components/ListTable";

// ===== Importação de Efeito Colateral
import "../styles/pages.css";

// ===== FUNÇÃO PRINCIPAL =====
function Prays() {

    // ===== COMPONENTES =====

    // ===== Banco do Navegador
    const usuarioStorage = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStorage);

    // ===== Memória de Array
    const [pedidos, setPedidos] = useState([]);

    // ===== ENGRENAGENS =====

    // ===== Guarda-Chuva de Cursos
    useEffect(() => {

        // ===== FUNÇÃO PRINCIPAL =====
        async function carregarPedidos() {

            // ===== Rede de Proteção
            try {

                // ===== Busca dos Dados
                const response = await fetch(`http://127.0.0.1:5000/orders/pedidos/${usuario.id}`);

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

        // ===== Canal de Comunicação
        const channel = supabase.channel("pedidos-realtime")
        
            // Ouvinte de Eventos
            .on("postgres_changes", { event: "*", schema: "public", table: "pedidos" }, () => {
                carregarPedidos();
            })
        
            // Apertando o Play
            .subscribe();

        // ===== limpeza
        return () => {
            supabase.removeChannel(channel);
        };

    }, []);


    // ===== FUNÇÕES =====

    // ===== Função de Click
    async function atualizarStatus(idPedido) {

         // ===== Rede de Proteção
        try {

            // ===== Atualização de Dados
            const response = await fetch(`http://127.0.0.1:5000/orders/status/${idPedido}`,
                {
                    method: "PUT"
                }
            );

            // ===== Tratamento da Resposta
            const data = await response.json();
            if (!response.ok) {
                alert(data.erro || "Erro ao atualizar pedido");
                return;
            }

            // Atualiza Estado
            setPedidos((prev) =>
                prev.map((item) =>
                    item.id === idPedido ? { ...item, status: "respondido" } : item
                )
            );

        } catch (err) {
            alert("Erro ao conectar com servidor");
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
                    <LiButton href="/dashboard" styles="" children="Dashboard" />
                    <LiButton href="/prays" styles="select" children="Pedidos" />
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

                {/* ===== Campo Configuração */}
                <div className='camp-limit'>
                    <div className='camp-field full'>

                        {/* ===== Titulo */}
                        <div>
                            <h2>Pedidos de Orações</h2>
                            <hr />
                        </div>

                        {/* ===== Tabela */}
                        <ListTable info={pedidos} atualizarStatus={atualizarStatus}/>

                    </div>
                </div>

            </main>

        </div>
    );

}

// ===== Expondo a Função
export default Prays;