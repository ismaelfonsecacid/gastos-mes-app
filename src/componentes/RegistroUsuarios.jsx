import React from "react";
import { Helmet } from "react-helmet";
import Boton from "../elementos/Boton";
import BtnRegresar from "../elementos/BtnRegresar";

import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "../elementos/Header";

export default function RegistroUsuarios() {
  return (
    <>
      <Helmet>
        <title>Registro de usuario</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
          </div>
        </ContenedorHeader>
      </Header>
    </>
  );
}
