import React from 'react';
import Logo from './../../../../Images/Logo.png';
import './Head.scss';

const Head = () => {
  return (
    <div className="Reg__Header_General">
      <img className="Reg__Header_Img" src={Logo} alt=""/>
    </div>
  );
}

export default Head;