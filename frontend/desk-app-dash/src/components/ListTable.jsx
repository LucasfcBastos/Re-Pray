import "../styles/table.css";

function ListTable({ info }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Pedido</th>
                    <th>Data</th>
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
                {info.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.pray}</td>
                        <td>{item.date}</td>
                        <td><button className="on">Orar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTable;
