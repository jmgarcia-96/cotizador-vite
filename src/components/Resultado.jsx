import { useCallback, useMemo, useRef } from "react";
import { MARCAS, PLANES } from "../constants";
import useCotizador from "../hooks/useCotizador";

function Resultado() {
  const { resultado, datos } = useCotizador();
  if (resultado === "") return null;
  const { marca, plan, year } = datos;

  const yearRef = useRef(year);
  const nombreMarca = useCallback(
    MARCAS.find((m) => m.id === Number(marca))?.nombre,
    [resultado]
  );
  const nombrePlan = useCallback(
    PLANES.find((p) => p.id === Number(plan))?.nombre,
    [resultado]
  );

  //   const nombreMarca = useMemo(
  //     () => MARCAS.find((m) => m.id === Number(marca))?.nombre,
  //     [resultado]
  //   );
  //   const nombrePlan = useMemo(
  //     () => PLANES.find((p) => p.id === Number(plan))?.nombre,
  //     [resultado]
  //   );

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-600 font-black text-3xl">Resumen</h2>
      <p className="my-2">
        <span className="font-bold">Marca: </span>
        {nombreMarca}
      </p>
      <p className="my-2">
        <span className="font-bold">Plan: </span>
        {nombrePlan}
      </p>
      <p className="my-2">
        <span className="font-bold">Año del auto: </span>
        {yearRef.current}
      </p>
      <p className="my-2 text-2xl">
        <span className="font-bold">Total Cotización: </span>
        {resultado}
      </p>
    </div>
  );
}

export default Resultado;
