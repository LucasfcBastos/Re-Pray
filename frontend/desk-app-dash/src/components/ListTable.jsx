// ===== IMPORTAÇÃO =====

// ===== Importação de Efeito Colateral
import "../styles/table.css";

// ===== FUNÇÃO PRINCIPAL =====
function ListTable({ info, atualizarStatus }) {

    // ===== VISUALIZAÇÃO =====
    return (
        <>

            {/* ===== Tabela de Infomação */}
            <table>

                {/* ===== Cabeçario da Tabela */}
                <thead>
                    <tr>
                        <th>Curso</th>
                        <th>Pedido</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                {/* ===== Corpo da Tabela */}
                <tbody>

                    {/* ===== O Estado Vazio */}
                    {info.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "1em" }} >
                                Nenhum pedido de oração encontrado.
                            </td>
                        </tr>
                    )}

                    {/* ===== A Lista de Pedidos */}
                    {info.map((item) => (
                        <tr key={item.id}>

                            {/* ===== As Células de Dados */}
                            <td>{item.cursos.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td>
                            <td>{item.status}</td>

                            {/* ===== O Botão de Ação Inteligente */}
                            <td>
                                <button className={ item.status === "respondido" ? "off" : "on" } disabled={ item.status === "respondido" } onClick={ () => atualizarStatus(item.id) } >
                                    {item.status === "respondido" ? "Respondido" : "Orar"}
                                </button>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </>
    );

}

// ===== Expondo a Função
export default ListTable;