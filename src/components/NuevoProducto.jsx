import React, {useState} from 'react';

// useDispatch sirve para mandar a ejecutar las acciones que tengamos
// useSelector es una forma para acceder al state dentro del componente
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

//Actions de Redux
import { newProductAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = () => {

    const navigate = useNavigate();

    // state del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const cargando = useSelector( state => state.productos.loading)
    const error = useSelector( state => state.productos.error)
    const alerta = useSelector(state => state.alerta.alerta);


    // mandar a llamar el action de productoAction
    const agregarProducto = producto => dispatch( newProductAction(producto) );

    // cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()

        // validar formulario
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) );

            return;
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() );

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        // redireccionar
        navigate('/');
    }

    return (
        <div className={'row justify-center'}>
            <div className={'col-md-8'}>
                <div className={'border-2'}>
                    <div className={'card-body'}>
                        <h2 className={'text-center mb-4 font-bold text-3xl uppercase'}>
                            Agregar Nuevo Producto
                        </h2>

                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }

                        <form
                            onSubmit={submitNuevoProducto}
                            className={'m-4'}
                        >
                            <div className={'form-group font-bold text-xl pb-2'}>
                                <label>Nombre Producto</label>
                                <input
                                    type={'text'}
                                    className={'form-control'}
                                    placeholder={'Nombre Producto'}
                                    name={'nombre'}
                                    value={nombre}
                                    onChange={ e => setNombre(e.target.value) }
                                />
                            </div>

                            <div className={'form-group font-bold text-xl pb-4'}>
                                <label>Precio</label>
                                <input
                                    type={'text'}
                                    className={'form-control'}
                                    placeholder={'Precio Producto'}
                                    name={'precio'}
                                    value={precio}
                                    onChange={ e => setPrecio( Number(e.target.value)) }
                                />
                            </div>

                            <input
                                type={'submit'}
                                className={'btn bg-sky-500 hover:bg-sky-600 font-bold uppercase w-100 text-white'}
                                value={'Agregar'}
                            />
                        </form>

                        { cargando ? <p>Cargando...</p> : null }

                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;