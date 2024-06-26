// Layout.js
import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './layout.css';
import LogoutButton from '../profile/Logout';
import { AuthContext } from '../auth/AuthContext';

function Layout() {
    const { token, logout } = useContext(AuthContext);

    return (
        <div>
            <nav>
                <div className="logo-container">
                    <a href="/">
                        <img src="/logo.webp" alt="Logo" className="logo" />
                    </a>
                </div>
                <div className="nav-links">
                    <Link to="/instrucciones">Instrucciones</Link>
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/lobbyPartida">Partida</Link>
                    <Link to="/partida">Tablero</Link>
                </div>
                <div className="nav-buttons">
                    {token ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => window.location.href = '/login'}>LogIn</button>
                            <button onClick={() => window.location.href = '/signup'}>SignUp</button>
                        </>
                    )}
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>© 2024 TicketToGo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Layout;
