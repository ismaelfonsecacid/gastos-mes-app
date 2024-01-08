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
import {ContenedorBoton,ContenedorFiltros,Formulario,Input,InputGrande} from '../elementos/ElementosDeFormulario'
import { Form } from "react-router-dom";
import {ReactComponent as SvgLogin} from "../imagenes/registro.svg"
import styled from "styled-components";

const Svg =styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;
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
      <Formulario>
        <Svg/>
       <Input type="email" name="email" placeholder="Correo Electrónico" />
       <Input type="password" name="password" placeholder="Contraseñas" />
       <Input type="password" name="password" placeholder="Repetir Contraseña" />
       <ContenedorBoton>
        <Boton as="button" primario type="submit" >Crear Cuenta</Boton>
       </ContenedorBoton>
      </Formulario>
    </>
  );
}
