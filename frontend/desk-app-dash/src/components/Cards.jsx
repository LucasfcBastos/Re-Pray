import "../styles/card.css";

function Cards({ numb, children }) {
    return (
        <div className="card">
            <p>{children}</p>
            <h1>{numb}</h1>
        </div>
    );
}

export default Cards;
