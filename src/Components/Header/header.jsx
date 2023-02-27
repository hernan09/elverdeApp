import React from 'react';
import './header.css';
import ImgIcon from '../../assets/images/dolar.jpg';

const header = () => {
    return (
        <div className='content-header'>
        <h2 className='titleapp'>
            <img src={ImgIcon} className='imgtitle firstimg' alt='...'/>
             <span className='titlebackground'>EL VERDE APP</span>
            <img src={ImgIcon} className='imgtitle secondimg' alt='...'/>
        </h2>
    </div>
    );
};

export default header;