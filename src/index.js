import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Contenedor from "./elementos/Contenedor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import EditarGasto from "./componentes/EditarGasto";
import GastosPorCategoria from "./componentes/GastosPorCategoria";
import InicioSesion from "./componentes/InicioSesion";
import ListaDeGastos from "./componentes/ListaDeGastos";
import RegistroUsuarios from "./componentes/RegistroUsuarios";
import favicon from "./imagenes/logo.png";
import Fondo from './elementos/Fondo'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <BrowserRouter>
      <Contenedor>
        <Routes>
          <Route path={"/editar/:id"} element={<EditarGasto />} />
          <Route path={"/categorias"} element={<GastosPorCategoria />} />
          <Route path={"/iniciar-sesion"} element={<InicioSesion />} />
          <Route path={"/lista"} element={<ListaDeGastos />} />
          <Route path={"/crear-cuenta"} element={<RegistroUsuarios />} />
          <Route path={"/"} element={<App />} />
        </Routes>
      </Contenedor>
    </BrowserRouter>
    <Fondo/>
  </>
);
