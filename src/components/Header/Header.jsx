import { Link } from "react-router-dom"
import './Header.css'

function Header () {
    return(
        <div className="header">
            <h1 className="headerTitle">HEADER</h1>
            <div className="links">
                <Link to='/'>
                    <h2>Search</h2> 
                </Link>

                <Link to='/favorites'>
                    <h2>Favorites</h2>
                </Link>
            </div>
        </ div>
    )
}

export default Header