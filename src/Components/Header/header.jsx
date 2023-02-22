import React from 'react';
import './header.css';
import ImgIcon from '../../assets/images/dolar.jpg';

const header = () => {
    return (
        <div className='content-header'>
        <h2 className='titleapp'>
            <img src={ImgIcon} className='imgtitle' alt='...'/>
             EL VERDE APP 
            <img src={ImgIcon} className='imgtitle' alt='...'/>
        </h2>
    </div>
    );
};

export default header;