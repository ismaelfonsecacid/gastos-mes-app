import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [usuario, cambiarUsuario] = useState();

  //Se crea un state para saber cuando termina cargar la comprobacion
  const [cargando, cambiarCargando] = useState(true);
  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
      cambiarUsuario(usuario);
      cambiarCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
}

//HOOK acceder contexto
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuth };
