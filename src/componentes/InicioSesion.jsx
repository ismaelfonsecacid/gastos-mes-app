import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Boton from '../elementos/Boton'
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import {
  ContenedorBoton,
  Formulario,
  Input
} from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/login.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Alerta from '../elementos/Alerta'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`

export default function RegistroUsuarios() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    if (e.target.name === 'text') {
      setCorreo(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else {

    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setEstadoAlerta(false)
    setAlerta({})
    //Comprobamos del lado del cliente que el correo sea valido.
    const expresionRegular = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/
    if (!expresionRegular.test(correo)) {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Por favor ingresa un correo electrónico válido.'
      })
      return;
    }
    if (correo === '' || password === '') {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Por favor complete todos los datos.'
      })
      return
    }
  

  try {
    await signInWithEmailAndPassword(auth,correo, password)
    navigate('/')
  } catch (error) {
    setEstadoAlerta(true)
    console.error(error);
    let mensaje
    switch(error.code){
      case 'auth/invalid-credential':
        mensaje = 'Inicio de sesión fallido. Verifica la dirección de correo y contraseña e inténtalo de nuevo.'
        break;
      default:
        mensaje = 'Hubo un error al intentar crear la cuenta.'
      break;
    }

    setAlerta({tipo: 'error', mensaje: mensaje});
  }
}
return (
  <>
    <Helmet>
      <title>Inicio de Sesión</title>
    </Helmet>

    <Header>
      <ContenedorHeader>
        <Titulo>Iniciar sesión</Titulo>
        <div>
          <Boton to='/crear-cuenta'>Registrarse</Boton>
        </div>
      </ContenedorHeader>
    </Header>
    <Formulario onSubmit={handleSubmit}>
      <Svg />
      <Input
        type='text'
        name='text'
        placeholder='Correo Electrónico'
        value={correo}
        onChange={handleChange}
      />
      <Input
        type='password'
        name='password'
        placeholder='Contraseñas'
        value={password}
        onChange={handleChange}
      />
      <ContenedorBoton>
        <Boton as='button' primary type='submit'>
          Iniciar Sesión
        </Boton>
      </ContenedorBoton>
    </Formulario>
    <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={setEstadoAlerta}
      />
  </>
)
}
