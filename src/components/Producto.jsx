import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmarEliminarProducto = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
        });
    }

    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        navigate(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td className={'font-bold'}>{nombre}</td>
            <td><span className={'font-bold'}>$ {precio}</span></td>
            <td className={'text-center'}>
                <input
                    type={'button'}
                    className={'btn bg-sky-500 hover:bg-sky-600 mr-3'}
                    onClick={() => redireccionarEdicion(producto)}
                    value={'Editar'}
                />
                <input
                    type={'button'}
                    className={'btn bg-red-500 hover:bg-red-600'}
                    onClick={() => confirmarEliminarProducto(id)}
                    value={'Eliminar'}
                />
            </td>
        </tr>
    );
};

export default Producto;