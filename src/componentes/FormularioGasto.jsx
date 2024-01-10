import React, { useState } from 'react'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton'
import { ReactComponent as IconoPlus } from '../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias'
export default function FormularioGasto() {
    const [inputCantidad, setInputCantidad] = useState('');
    const [inputDescripcion, setDescripcion] = useState('');
    const [categoria, setcategoria] = useState('hogar')

    const handleChange = (e) => {
        if(e.target.name === 'description'){
            setDescripcion(e.target.value)
        }else if(e.target.name === 'valor'){
            setInputCantidad(e.target.value.replace(/[^0-9.]/g,''));
        }
    }
    return (
        <Formulario>
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} setcategoria={setcategoria}/>
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Descripción"
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande
                    type="text"
                    name="valor"
                    id="valor"
                    placeholder="0.00€"
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" conicono="true" primario="true">
                    Agregar Gasto <IconoPlus />
                </Boton>
            </ContenedorBoton>
        </Formulario>
    )
}
