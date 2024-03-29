import React from 'react';
import { ReactComponent as Logout } from '../imagenes/log-out.svg';
import Boton from '../elementos/Boton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para el boton de cerrar sesion
 * @returns <Boton>
 */
export default function BotonCerrarSesion() {
  const navigate = useNavigate();
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate('/iniciar-sesion');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Boton iconogrande="true" as="button" onClick={cerrarSesion}>
      <Logout />
    </Boton>
  );
}
