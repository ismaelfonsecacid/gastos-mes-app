import { db } from "./firebaseConfig";
import { collection, addDoc } from "@firebase/firestore";

const agregarGasto = ({
  categoria,
  descripcion,
  fecha,
  cantidad,
  uidUsuario,
}) => {
  return addDoc(collection(db, "gastos"), {
    categoria: categoria,
    descripcion: descripcion,
    cantidad: Number(cantidad),
    fecha: fecha,
    uidUsuario: uidUsuario,
  });
};

export default agregarGasto;
