
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Login from './paginas/Login';
import Register from './paginas/Register';
import Nosotros from './paginas/Nosotros';
import Contactanos from './paginas/Contactanos';
import Horoscopo from './paginas/Horoscopo';
import Dashboard from './Dashboard/Dashboard';
import Picture from './Apis/Picture';
import Iss from './Apis/Iss';
import Astro from './Apis/Space_X';
import HubbleImage from './Apis/Hubble';
import SkyObjects from './Apis/Sky';
import Nasa from './Apis/Nasa';
import SpaceX from './Apis/Space_X1';
import SpaceXData from './Apis/Space_X';
<<<<<<< HEAD
=======
import SubirPublicacion from './Dashboard/Subirpublicacion';
>>>>>>> f6830ad (back)
import Dashboard_usuarios from './Dashboard/Dashboard_usuarios';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/nosotros' element={<Nosotros />}></Route>
        <Route path='/contactanos' element={<Contactanos />}></Route>
        <Route path='/horoscopo' element={<Horoscopo />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboard/usuarios' element={<Dashboard_usuarios />}></Route>
        <Route path='/space' element={<SpaceXData />}></Route>
        <Route path='/space' element={<SpaceXData />}></Route>
        <Route path='/picture' element={<Picture />}></Route>
        <Route path='/iss' element={<Iss />}></Route>
        <Route path='/astro' element={<Astro />}></Route>
        <Route path='/hubble' element={<HubbleImage />}></Route>
        <Route path='/sky' element={<SkyObjects />}></Route>
        <Route path='/nasa' element={<Nasa />}></Route>
        <Route path='/space1' element={<SpaceX />}></Route>
        <Route path='/publicacion' element={<SubirPublicacion />}></Route>
        <Route path='/dashu' element={<Dashboard_usuarios />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
