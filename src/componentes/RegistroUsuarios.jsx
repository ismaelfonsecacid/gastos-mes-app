import React from 'react'
import { Helmet } from 'react-helmet'
import Alerta from '../elementos/Alerta'
import Boton from '../elementos/Boton'
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import {
  ContenedorBoton,
  Formulario,
  Input
} from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/registro.svg'
import styled from 'styled-components'
import { useState } from 'react'
import { auth } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`
export default function RegistroUsuarios () {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})
  const handleChange = e => {
    switch (e.target.name) {
      case 'text':
        setCorreo(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'password2':
        setPassword2(e.target.value)
        break
      default:
        break
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
    if (correo === '' || password === '' || password2 === '') {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Por favor complete todos los datos.'
      })
      return
    }
    if (password !== password2) {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Las contraseñas no son iguales.'
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password)
      navigate('/')
    } catch (error) {
      let mensaje
      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
          break
        case 'auth/email-already-in-use':
          mensaje =
            'Ya existe una cuenta con el correo electrónico proporcionado.'
          break
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.'
          break
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
          break
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>Registro de usuario</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear cuenta</Titulo>
          <div>
            <Boton to='/iniciar-sesion'>Iniciar Sesión</Boton>
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
        <Input
          type='password'
          name='password2'
          placeholder='Repetir Contraseña'
          value={password2}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as='button' primario type='submit'>
            Crear Cuenta
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
