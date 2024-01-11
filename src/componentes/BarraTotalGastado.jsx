import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import formatearCantidad from '../funciones/convertirAMoneda';
import { useTotalDelMes } from '../contextos/TotalGastadoEnElMesContext';

/**
 * Componente que carga la barra inferior con el total en euros
 * @returns <BarraTotal>
 */
export default function BarraTotalGastado() {
  const { total } = useTotalDelMes();
  const compartido = 2400;

  const BarraTotal = styled.div`
    background: ${total >= compartido ? "red" : theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 31.25rem) { /* 500px */
      flex-direction: column;
      font-size: 14px;
    }
  `;

  return (
    <BarraTotal>
      <p>Total Gastado en el mes:</p>
      <p>{formatearCantidad(total)}/{compartido}€</p>
    </BarraTotal>
  );
}
