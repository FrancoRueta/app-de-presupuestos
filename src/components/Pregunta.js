import React, {Fragment, useState} from "react";
import Error from "./Error";

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);


    //Actualizacion del state cantidad
    /*Nota: Para actualizar el hook cantidad, no hace falta
    * comprobarlo. Dado que lo que queremos es guardar el valor
    * PARA luego comprobarlo una vez presionado el boton. */
    const actualizarState = e => {
        guardarCantidad(parseInt(e.target.value,10));
    }

    //Submit para definir el cantidad
    const agregarCantidad = e => {
        //para que no se mande por query.
        e.preventDefault();

        //Validamos
        if(cantidad < 1 || isNaN(cantidad)){
            //Para cortar la ejecucion se usa true.
            guardarError(true);
            return;
        }

        //Si pasa validacion:
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false)
    }


    return ( <Fragment>

        <h2>Coloca tu presupuesto.</h2>

        {/*BREVE NOTA SOBRE COMO AGREGAR CODIGO ''ocasional'' AL HTML.
            es tan sencillo como agregar un operador ternario, con un caso en
            null y el otro a la espera de una condicion.*/}

        { error ? <Error mensaje="El presupuesto es invalido."/> : null}

        <form
            onSubmit={agregarCantidad}
        >
            <input
                type="number"
                className='u-full-width'
                placeholder="Ej. 5000"
                onChange={actualizarState}
            />

            <input
                type="submit"
                className='button-primary u-full-width'
                value='Definir presupuesto'
                onSubmit=''
            />

        </form>


    </Fragment> );
}

export default Pregunta;
