import React from 'react'
import {Header, Titulo,ContenedorBotones, ContenedorHeader} from './elementos/Header'
import Boton from "./elementos/Boton"
import { Helmet } from 'react-helmet'


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
          <Boton to="/categorias">Categoria</Boton>
          <Boton to="/lista">Lista de Gastos</Boton>
          <Boton>X</Boton>
        </ContenedorBotones>
       
      </ContenedorHeader>
    </Header>
    
    </>
  )
}
