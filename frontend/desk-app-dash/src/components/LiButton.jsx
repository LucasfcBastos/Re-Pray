import { useNavigate } from "react-router-dom";
import "../styles/btn.css";

function LiButton({ href, styles, children, logout = false  }) {
    const navigate = useNavigate();

    const handleClick = () => {

        if (logout) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
        }
        
        navigate(href);
    };

    return (
        <li><button onClick={handleClick} className={`btn_li ${styles}`}>{children}</button></li>
    );
}

export default LiButton;
