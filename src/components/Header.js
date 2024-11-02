import React from 'react';
import './stylesHeader.css';
import NavigateButton from '../components/NavigateButton';


const Header = () => {
    return (
        <header>
            <img src="/assets/logo-astra.png" alt="Logo de Astra" />
            <div className="header__input">
                <input type="search" placeholder="Buscar" />
                <i className="fas fa-search"></i>
            </div>
            <div className="header__login">
                <i className="fa fa-user login-icon"></i>
                <NavigateButton to="/login">Acceder</NavigateButton>
            </div>
        </header>
    );
};

export default Header;