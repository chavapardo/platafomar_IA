import React from 'react';
import './stylesHeader.css';
import NavigateButton from '../components/NavigateButton';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <Link to="/">
            <img src="/assets/logo-astra.png" alt="Logo de Astra" />
            </Link>
            <div className="header__input">
                <input type="search" placeholder="Buscar" />
                <i className="fas fa-search"></i>
            </div>
            <div className="header__login">
                <Link to="/profile">
                    <i className="fa fa-user login-icon"></i>
                </Link>
                <NavigateButton to="/login">Acceder</NavigateButton>
            </div>
        </header>
    );
};

export default Header;