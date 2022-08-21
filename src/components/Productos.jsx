import React, { useEffect } from 'react';
import Producto from "./Producto";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductAction } from "../actions/productoActions";

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        const cargarProductos = () => dispatch( getProductAction() );
        cargarProductos();
    }, []);

    // obtener el state
    const productos = useSelector( state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading)

    return (
        <>
            <h2 className={'text-center my-5 font-bold text-3xl'}>Listado De Productos</h2>
            { error ? <p className={'font-bold alert alerta-danger text-center mt-4'}>Hubo un error</p> : null}
            { cargando ? <p className={'text-center font-bold text-lg'}>Cargando... </p> : null}
            {productos.length === 0 ? <p className={'text-center font-bold text-xl mb-2'}>No Hay Productos</p> : null}
            <table className={'table border-2 w-10/12 mx-auto'}>
                <thead className={'bg-gray-700 table-dark'}>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th className={'text-center'}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        )).reverse()
                    }
                </tbody>
            </table>
        </>
    );
};

export default Productos;