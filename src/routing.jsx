import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Instrucciones from "./Information/instrucciones";
import Nosotros from "./Information/nosotros";
import LobbyPartida from "./Game/Lobby/lobbyPartida";
import Layout from './Navbar-Footer/layout';
import TableroNew from "./Game/Componentes/tablero";
import JugadorInfo from "./Game/Componentes/jugadorInfo";
import Partida from "./Game/partida";
import CrearUsuario from "./Game/crearUsuario";
import PartidaInfo from "./Game/Componentes/partidaInfo";
import Login from "./profile/Login";
import Signup from "./profile/Signup";
import UserCheck from "./protected/UserCheck";
import LogoutButton from "./profile/Logout";
import Profile from "./profile/Profile";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="instrucciones" element={<Instrucciones />} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="lobbyPartida" element={<LobbyPartida />} />
                    <Route path="tableroNew" element={<TableroNew />} />
                    <Route path="jugadorInfo" element={<JugadorInfo />} />
                    <Route path="partida" element={<Partida />} />
                    <Route path="partidaInfo" element={<PartidaInfo />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="usercheck" element={<UserCheck />} />
                    <Route path="logout" element={<LogoutButton />} />
                    <Route path="crearUsuario" element={<CrearUsuario />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
