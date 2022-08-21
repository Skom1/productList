import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className={'navbar navbar-expand-sm justify-between bg-gray-700'}>
            <div className={'container'}>
                <h1>
                    <Link to={'/'} className={'text-white font-bold text-3xl uppercase'} >Product List</Link>
                </h1>
            </div>
            <Link
                to={'/productos/nuevo'}
                className={'btn bg-amber-400 hover:bg-amber-500 uppercase font-bold'}
            >Agregar Producto &#43;</Link>
        </nav>
    );
};

export default Header;