import { useNavigate } from "react-router-dom";
import "../styles/btn.css";

function LiButton({ href, styles, children }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(href);
    };

    return (
        <li><button onClick={handleClick} className={`btn_li ${styles}`}>{children}</button></li>
    );
}

export default LiButton;
