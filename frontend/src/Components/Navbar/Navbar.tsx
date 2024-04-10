import {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Find Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/userprofiles">Find Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account">Sign-in</Link>
                    </li>
                </ul>
            </div>
            <a className="navbar-brand" href="/">Bookmarked</a>
            <div className="d-flex align-items-center">
                <div className="mobile-menu-icon">
                    <Link to="/myprofile"><i className="bi bi-person-fill"></i></Link>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
