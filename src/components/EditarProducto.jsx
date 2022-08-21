import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';
import { useNavigate } from "react-router-dom";


const EditarProducto = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    const productoeditar = useSelector(state => state.productos.productoeditar);

    useEffect( () => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const { nombre, precio } = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch( editarProductoAction(producto) );

        navigate('/');
    }

    return (
        <div className={'row justify-center'}>
            <div className={'col-md-8'}>
                <div className={'border-2'}>
                    <div className={'card-body'}>
                        <h2 className={'text-center mb-4 font-bold text-3xl uppercase'}>
                            Editar Producto
                        </h2>
                        <form
                            className={'m-4'}
                            onSubmit={submitEditarProducto}
                        >
                            <div className={'form-group font-bold text-xl pb-2'}>
                                <label htmlFor={'nombre'}>Nombre Producto</label>
                                <input
                                    id={'nombre'}
                                    type={'text'}
                                    className={'form-control'}
                                    placeholder={'Nombre Producto'}
                                    name={'nombre'}
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className={'form-group font-bold text-xl pb-4'}>
                                <label htmlFor={'precio'}>Precio</label>
                                <input
                                    id={'precio'}
                                    type={'number'}
                                    className={'form-control'}
                                    placeholder={'Precio Producto'}
                                    name={'precio'}
                                    value={precio}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <input
                                type={'submit'}
                                className={'btn bg-sky-500 hover:bg-sky-600 font-bold uppercase w-100 text-white'}
                                value={'Guardar Cambios'}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;