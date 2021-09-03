import React, { useState, useEffect} from "react";
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";



function App() {

    //Definimos el state
    const [presupuesto, guardarPresupuesto] = useState(0);
    const [restante, guardarRestante] = useState(0);
    const [mostrarpregunta, actualizarPregunta] = useState(true);
    const [gastos, guardarGastos] = useState([]);
    const [gasto, guardarGasto] = useState({});
    const [creargasto, guardarCreargasto] = useState(false);


    //useEffect que atualiza el restante

    useEffect(() => {

        if(creargasto) {
            //agrega el nuevo presupuesto
            guardarGastos([
                ...gastos,
                gasto
            ]);


            //resta del presupuesto actual
            const presupuestoRestante = restante - gasto.cantidad;
            guardarRestante(presupuestoRestante);


            //resetear a false
            guardarCreargasto(false);
        }
    }, [gasto, creargasto, gastos, restante]);

    return (
        <div className='container'>
            <header>
                <h1>Gasto Semanal</h1>

                <div className='contenido-principal contenido'>

                    {/* Operador ternario: mostrarPregunta funciona con hooks para definir si
                        mostrar en el caso true la pregunta inicial, y en el falso la pantalla
                        de gastos. A esto se le llama carga condicional.*/}

                    { mostrarpregunta ? (<Pregunta
                        guardarPresupuesto={guardarPresupuesto}
                        guardarRestante={guardarRestante}
                        actualizarPregunta={actualizarPregunta}
                    />) : (
                        <div className='row'>
                            <div className='one-half column'>
                                <Formulario
                                    guardarGasto={guardarGasto}
                                    guardarCreargasto={guardarCreargasto}
                                />

                            </div>

                            <div className='one-half column'>
                                <Listado
                                    gastos={gastos}
                                />

                                <ControlPresupuesto
                                    presupuesto={presupuesto}
                                    restante={restante}
                                />
                            </div>

                        </div>


                    )}
                </div>
            </header>

        </div>
    );
}

export default App;
