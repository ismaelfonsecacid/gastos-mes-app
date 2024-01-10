import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import styled from 'styled-components'
import theme from '../theme'

export default function DPicker({ fecha, setFecha }) {
    const ContenedorInput = styled.div`
    position: relative;

    input {
      font-family: 'Work Sans', sans-serif;
      box-sizing: border-box;
      background: ${theme.grisclaro};
      border: none;
      cursor: pointer;
      border-radius: 0.625rem; /* 10px */
      height: 5rem; /* 80px */
      width: 100%;
      padding: 0 1.25rem; /* 20px */
      font-size: 1.5rem; /* 24px */
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      margin-left: 0.5rem;
    }

    .rdp {
      position: absolute;
    }

    .rdp-months {
      display: flex;
      justify-content: center;
    }

    .rdp-month {
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      padding: 20px;
      border-radius: 10px;
    }

    @media (max-width: 60rem) {
      /* 950px */
      & > * {
        width: 100%;
      }
    }
  `
    const formatFecha = (fecha = new Date()) => {
        return format(fecha, `dd 'de' MMMM 'de' yyyy`, { locale: es })
    }

    const [visible, setvisible] = useState(false)
    const handleDateSelect = (selectedDate) => {
        // Oculta el DayPicker al seleccionar una fecha
        setvisible(false);

        // Llama a la función setFecha para actualizar la fecha seleccionada
        setFecha(selectedDate);
    };
    return (
        <ContenedorInput>
            <>
                <input
                    type='text'
                    readOnly
                    value={formatFecha(fecha)}
                    onClick={() => setvisible(!visible)}
                />
            </>

            {visible && (
                <>
                    <DayPicker
                        mode='single'
                        onSelect={handleDateSelect} // Usa la función handleDateSelect
                        selected={fecha}
                        locale={es}
                    />
                </>
            )}
        </ContenedorInput>
    )
}
