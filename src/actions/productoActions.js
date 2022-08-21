import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "../types/index.js";
import axios from "axios";
import Swal from "sweetalert2";

export const newProductAction = (producto) => {
    return async (dispatch) => {
        dispatch( agregarProducto() );

        try{
            // insertar en la api
            await axios.post('http://localhost:4000/productos', producto)

            // si sale bien, actualiza el state
            dispatch( agregarProductoExito(producto) )

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )

        } catch (e){
            console.log(e);
            dispatch( agregarProductoError(true) )

            //
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// funcionque descarga los productos de la base de datos
export const getProductAction = () => {
    return async (dispatch) => {
        dispatch ( descargarProductos() );

        try{
            setTimeout(async () => {
                const {data} = await axios.get('http://localhost:4000/productos');
                dispatch( descargaProductosExitosa(data) )
            }, 1000)
        } catch (e) {
            dispatch( descargaProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );

        try {
            await axios.delete(`http://localhost:4000/productos/${id}`);
            dispatch( eliminarProductoExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto() );

        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) );
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() );
        }
    }
}
const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})