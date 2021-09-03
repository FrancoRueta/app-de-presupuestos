import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';


const Formulario = ({guardarCreargasto, guardarGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);


    const agregarGasto = (e) => {
        e.preventDefault();

        //validar los gastos
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCreargasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad(0);
        guardarError(false);
    };

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>

            {/*Ternario para manejar el campo error.*/}

            { error ? <Error mensaje="El nombre y/o el gasto ingresados son invalidos."/> : null}

            <div className='campo'>
                <label>Titulo del gasto</label>
                <input
                    type='text'
                    className='u-full-width'
                    placeholder='Ej. Nafta del auto'
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label>Coste del gasto</label>
                <input
                    type='number'
                    className='u-full-width'
                    placeholder='Ej 4.000.'
                    value={cantidad}
                    onChange={e => guardarCantidad( parseInt(e.target.value))}
                />
            </div>

            <input
                type='submit'
                className='button-primary u-full-width'
                value='Agregar Gasto'
            />

        </form>

    );
}

export default Formulario;
