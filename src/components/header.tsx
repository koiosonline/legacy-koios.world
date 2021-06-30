import React from 'react';
import logo from '../assets/images/logos/koios-logo.svg';
import Button from "./button";

const Header = () => {
    return (
        <header className={'header'}>
            <img src={logo} alt={'logo'}/>
            <Button link={'https://app.koios.world'} title={'Launch app'}/>
        </header>
    )
}

export default Header;