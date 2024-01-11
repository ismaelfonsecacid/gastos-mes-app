import React from "react";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "./elementos/Header";
import Boton from "./elementos/Boton";
import { Helmet } from "react-helmet";
import BotonCerrarSesion from "./componentes/BotonCerrarSesion";
import FormularioGasto from "./componentes/FormularioGasto";
import BarraTotalGastado from "./componentes/BarraTotalGastado";

export default function App() {
  return (
    <>
      <Helmet>
        <title>Agregas Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categoría</Boton>
            <Boton to="/lista">Gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FormularioGasto />
      <BarraTotalGastado />
    </>
  );
}
