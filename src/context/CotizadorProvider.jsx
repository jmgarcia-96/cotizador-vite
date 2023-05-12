import { createContext, useState } from "react";
import {
  calcularMarca,
  calcularPlan,
  formatearDinero,
  obtenerDiferenciaYear,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // Base
    let resultado = 2000;

    // Diferencia de años
    const diferenciaYear = obtenerDiferenciaYear(datos.year);

    // Hay que restar el 3% por cada año
    resultado -= (diferenciaYear * 3 * resultado) / 100;

    // Americano 15%
    // Europeo 30%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);
    resultado = formatearDinero(resultado);

    setCargando(true);

    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);

    setResultado(resultado);
  };
  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
