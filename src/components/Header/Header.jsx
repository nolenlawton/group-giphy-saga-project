import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <div className="header">
            <h1 className="headerTitle">GIPHY SAGA PROJECT</h1>
            <div className="links">
                <Link to='/'>
                    <h2 className="link">Search</h2>
                </Link>

                <Link to='/favorites'>
                    <h2 className="link">Favorites</h2>
                </Link>
            </div>
        </ div>
    );
}

export default Header;