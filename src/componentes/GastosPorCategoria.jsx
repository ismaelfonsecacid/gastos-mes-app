import React from "react";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "../elementos/Header";
import Boton from "../elementos/Boton";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";

export default function GastosPorCategoria() {
  return (
    <>
      <Helmet>
        <title>Gastos por categoría</title>
      </Helmet>
      <Header>
        <BtnRegresar/>
        <Titulo>Gastos por categoría</Titulo>
      </Header>
    </>
  );
}
