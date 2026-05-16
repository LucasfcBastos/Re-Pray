import img from '../assets/svg/error.svg';

function NotFound() {
    return (
        <div>
            <div className="bar-top">
                <h1>RE-PRAY</h1>
            </div>
            <div className="camp">
                <div className="camp-form">
                    <div style={{textAlign: "center"}}>
                        <h2>ERROR 404</h2>
                        <p>Formulario inválida. Verifica a url</p>
                        <img src={img} alt="error" style={{width: "300px"}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
