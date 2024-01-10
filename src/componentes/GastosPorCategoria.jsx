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
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";


export default function GastosPorCategoria() {
   useObtenerGastosDelMes();
  return (
    <>
      <Helmet>
        <title>Gastos por categoría</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Gastos por categoría</Titulo>
      </Header>
      <BarraTotalGastado />
    </>
  );
}
