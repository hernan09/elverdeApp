import React, { useEffect, useState } from 'react';
import './main.css';


function Home(){
    const [DolaBlue, setDolarBLue] = useState(null);
    const [DolarOfi, setDolarOfi] = useState(null);
    const [ShellBlue, setShellBlue] = useState(null);
    const [ShellOfi, setShellOfi] = useState(null);
    const [buyOfi, setBuyOfi] = useState(null);
    const [buyBlue, setBuyBlue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [ShellOfiAfter, setShellOfiAfter] = useState(null);
    const [ShellBLueAfter, setShellBlueAfter] = useState(null);

    const [averageBlue, setAverageBlue] = useState(null);
    const [averageOfi, setAverageOfi] = useState(null);

    const url = 'https://api.bluelytics.com.ar/v2/evolution.json?days=4';

    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e62397dea2msh462a64157ba5258p1ad146jsn76daf54e422c',
        'X-RapidAPI-Host': 'dolarapi.p.rapidapi.com'
    }
    };

    useEffect(()=>{
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log('el json', json)
            setShellOfiAfter(json[2].value_sell) // valor venta oficial dia anterior
            setShellBlueAfter(json[3].value_sell) // valor del blue dia anterior
            setDolarBLue(json[1].source); // etiqueta blue
            setShellBlue(json[1].value_sell); // valor de venta blue
            setBuyBlue(json[1].value_buy); // valor de compra blue
            setDolarOfi(json[0].source); // etiqueta Oficial
            setShellOfi(json[0].value_sell); // valor de venta oficial
            setBuyOfi(json[0].value_buy); // valor de compra oficial
            setIsLoading(false);
            calculateAverageBlue()
            calculateAverageOficial()
        })
        .catch(err => console.error('error:' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const calculateColorAverage = (valueAfter, valueToday)=> {
        let divAverageBLue = document.querySelector('.blue-average');
        if (valueAfter > valueToday) {
            divAverageBLue.classList.add('lowred')
        } else {
            divAverageBLue.classList.add('higtgreen')
        }
    }

    const calculateColorAverageOficial = (valueAfter, valueToday)=> {
        let divAverageBLue = document.querySelector('.oficial-average');
        if (valueAfter > valueToday) {
            divAverageBLue.classList.add('lowred')
        } else {
            divAverageBLue.classList.add('higtgreen')
        }
    }

    const calculateAverageOficial = () => {
        let averageOficial = Math.round((ShellOfiAfter + ShellOfi)/ 2);
        setAverageOfi(averageOficial);
        calculateColorAverageOficial(ShellOfiAfter, ShellOfi)
    }

    const calculateAverageBlue = () => {
        let averageBlue = Math.round((ShellBLueAfter + ShellBlue)/ 2);
        setAverageBlue(averageBlue);
        calculateColorAverage(ShellBLueAfter, ShellBlue)
    }
    

    return (
        <div>
           {isLoading && <h1 className='load'>Cargando....</h1>}
           {!isLoading && <div className='home-contain'>
            <div className='content-header'>
                <h2 className='titleapp'>EL VERDE-APP</h2>
            </div>
                <div className='content-dolarblue'>
                    <h3 className='title blue'>Dolar {DolaBlue}</h3> 
                    {/* hacer metodo que afecte ambas box con icono de flecita que muestre si aumento o subio */}
                    <div className='content-text venta'>
                        <h3>Venta</h3>
                        <span className='item-span'>{ShellBlue}</span>
                    </div>
                    <div className='content-text'>
                        <h3>Compra</h3>
                        <span className='item-span'>{buyBlue}</span>
                    </div>
                    {/* hardode por el momento hacer metodo de promedio */}
                    <div className='content-text promedio blue-average'>
                        <h3 className='title-prom'>Promedio</h3>
                        <span className='item-span-prom'>{averageBlue}</span>
                    </div> 
                    
                </div>
                <div className='content-dolarofi'>
                    <h3 className='title ofi'>Dolar {DolarOfi}</h3>
                    <div className='content-text venta'>
                        <h3>Venta</h3>
                        <span className='item-span'>{ShellOfi}</span>
                    </div>
                    <div className='content-text'>
                        <h3>Compra</h3>
                        <span className='item-span'>{buyOfi}</span>
                    </div>  
                    <div className='content-text promedio oficial-average'>
                        <h3 className='title-prom'>Promedio</h3>
                        <span className='item-span-prom'>{averageOfi}</span>
                    </div> 
                </div>
           </div>}
        </div>
    );
};

export default Home;