import React from "react";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "../elementos/Header";
import { Helmet } from "react-helmet";
import Boton from "../elementos/Boton";
import BtnRegresar from "../elementos/BtnRegresar";

export default function ListaDeGastos() {
  return (
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
    </>
  );
}
