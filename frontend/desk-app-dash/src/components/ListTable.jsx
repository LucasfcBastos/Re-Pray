import "../styles/table.css";

function ListTable({ info }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Curso</th>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {info.length === 0 && (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "1em" }}>
                            Nenhum pedido de oração encontrado.
                        </td>
                    </tr>
                )}
                {info.map((item) => (
                    <tr key={item.id}>
                        <td>{item.cursos.nome}</td>
                        <td>{item.descricao}</td>
                        <td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td>
                        <td>{item.status}</td>
                        <td><button className="on">Orar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTable;
