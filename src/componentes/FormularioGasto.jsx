import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import { ReactComponent as IconoPlus } from '../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DPicker from './DPicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import { useAuth } from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import { useEffect } from 'react';
import { fromUnixTime } from 'date-fns';
import editarGasto from '../firebase/editarGasto';

export default function FormularioGasto({ gasto }) {
  const [inputCantidad, setInputCantidad] = useState('');
  const [inputDescripcion, setDescripcion] = useState('');
  const [categoria, setcategoria] = useState('hogar');
  const [fecha, setFecha] = useState(new Date());
  const [estadoAlerta, setestadoAlerta] = useState(false);
  const [alerta, setalerta] = useState({});
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //Comprobamos si hay algun gasto.
    if (gasto) {
      if (gasto.data.uidUsuario === usuario.id) {
        setcategoria(gasto.data().categoria);
        setInputCantidad(gasto.data().cantidad);
        setDescripcion(gasto.data().descripcion);
        setFecha(fromUnixTime(gasto.data().fecha));
      } else {
        navigate('/lista');
      }
    }

    return () => {};
  }, [gasto, usuario, navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'description') {
      setDescripcion(e.target.value);
    } else if (e.target.name === 'valor') {
      setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Transformamos la cantidad en numero y le pasamos 2 decimales.
    let cantidad = parseFloat(inputCantidad).toFixed(2);

    // Comprobamos que haya una descripcion y valor.
    if (inputDescripcion !== '' && inputCantidad !== '') {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: inputCantidad,
            fecha: getUnixTime(fecha),
          })
            .then(() => {
              navigate('/lista');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid,
          })
            .then(() => {
              setcategoria('hogar');
              setDescripcion('');
              setInputCantidad('');
              setFecha(new Date());

              setestadoAlerta(true);
              setalerta({
                tipo: 'exito',
                mensaje: 'El gasto fue agregado correctamente.',
              });
            })
            .catch((error) => {
              setestadoAlerta(true);
              setalerta({
                tipo: 'error',
                mensaje: 'Hubo un problema al intentar agregar tu gasto.',
              });
            });
        }
      } else {
        setestadoAlerta(true);
        setalerta({
          tipo: 'error',
          mensaje: 'El valor que ingresaste no es correcto.',
        });
      }
    } else {
      setestadoAlerta(true);
      setalerta({
        tipo: 'error',
        mensaje: 'Por favor rellena todos los campos.',
      });
    }
  };

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias categoria={categoria} setcategoria={setcategoria} />
        <DPicker fecha={fecha} setFecha={setFecha} />
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
          {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={setestadoAlerta}
      />
    </Formulario>
  );
}
