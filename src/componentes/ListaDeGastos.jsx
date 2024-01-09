import React from "react";
import {
  Header,
  Titulo,

} from "../elementos/Header";
import { Helmet } from "react-helmet";
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
