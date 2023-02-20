import React, { useEffect, useState } from 'react';
import Footer from '../Footer/footer';
import './main.css';
import ImgIcon from '../../assets/images/dolar.jpg';
import ArrowUp from '../../assets/images/arrowup.png'
import ArrowDown from '../../assets/images/arrowdown.png'




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
    const [flagBlue, setFLagBlue] = useState(false);
    const [flagOfi, setFLagOfi] = useState(false);
    //todavia no esta aplicado
    // const [variationOfi, setVariationOfi] = useState(null);
    // const [variationBlue, setVariationBlue] = useState(null);

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
            setShellOfiAfter(json[2].value_sell) // valor venta oficial dia anterior
            setShellBlueAfter(json[3].value_sell) // valor del blue dia anterior
            setDolarBLue(json[1].source); // etiqueta blue
            setShellBlue(json[1].value_sell); // valor de venta blue
            setBuyBlue(json[1].value_buy); // valor de compra blue
            setDolarOfi(json[0].source); // etiqueta Oficial
            setShellOfi(json[0].value_sell); // valor de venta oficial
            setBuyOfi(json[0].value_buy); // valor de compra oficial
            calculateAverageBlue(ShellBLueAfter, ShellBlue);
            calculateAverageOficial(ShellOfiAfter, ShellOfi)
            setIsLoading(false);
        })
        .catch(err => console.error('error:' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ShellBLueAfter,ShellBlue ]);
    

    // const CalculateTransitionsBLue = (valorBlue) => {
    //    let intervalCounter = setInterval(()=> {
    //         setCounterTransition(counterTransition + 1);
    //         console.log('counter', counterTransition);
    //         if (counterTransition === valorBlue){
    //             clearInterval(intervalCounter)
    //             console.log('se paro el intervalo', counterTransition);
    //         }
    //     }, 1000)

    // }
    // const calculateVaraitionOfi = async () => {
    //     let variation = await Math.floor((ShellOfi - ShellOfiAfter) / ShellOfiAfter);
    //     let percentVariation = variation * 100;
    //     setVariationOfi(percentVariation)
    // }

    // const calculateVaraitionBlue = async () => {
    //     let variation = await Math.floor((ShellBlue - ShellBLueAfter) / ShellBLueAfter);
    //     let percentVariation = variation * 100;
    //     setVariationBlue(percentVariation)
    // }
    // const TransitionAnimationCounter = () => {
    //    let intervaloTiempo = setInterval(()=>{
    //         setCounter(counter + 1)
    //         console.log(counter);
    //     },100)
    //     if (counter === 200) {
    //         clearInterval(intervaloTiempo)
    //     }
    // }

    const calculateColorAverageBlue = ()=> {
        let divAverageBLue = document.querySelector('.blue-average');
        if (ShellBLueAfter > ShellBlue) {
            divAverageBLue?.classList.add('lowred')
            setFLagBlue(false);
        } else {
            divAverageBLue?.classList.add('higtgreen')
            setFLagBlue(true);
        }
    }


    const calculateColorAverageOficial = ()=> {
        let divAverageOficial = document.querySelector('.oficial-average');
        if (ShellOfiAfter > ShellOfi) {
            divAverageOficial?.classList.add('lowred')
            setFLagOfi(false)
            
        } else {
            divAverageOficial?.classList.add('higtgreen')
            setFLagOfi(true)
        }
    }

    const calculateAverageOficial = async (precioAyer, precioHoy) => {
        let suma = precioAyer + precioHoy;
        let averageOficiall = Math.round(suma / 2);
        console.log('promedio oficial', averageOficiall);
        setAverageOfi(averageOficiall);
        await calculateColorAverageOficial()
    }

    const calculateAverageBlue = async (precioAyer, precioHoy) => {
        let suma = precioAyer + precioHoy;
        let averageBluee = Math.round(suma / 2);
        console.log('promedio blue', averageBluee);
        setAverageBlue(averageBluee);
        await calculateColorAverageBlue()
    }
    

    return (
        <div>
           {isLoading && <h1 className='load'>Cargando....</h1>}
           {!isLoading && <div className='home-contain'>
            <div className='content-header'>
                <h2 className='titleapp'>
                    <img src={ImgIcon} className='imgtitle' alt='...'/>
                     EL VERDE APP 
                    <img src={ImgIcon} className='imgtitle' alt='...'/>
                </h2>
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
                    <div className='content-text promedio blue-average'>
                        <h3 className='title-prom'>Promedio de 1 dia</h3>
                        <span className='item-span-prom'>{averageBlue}</span>
                        <span className='content-arrow-blue'>
                            {flagBlue && <img className='img-arrow' src={ArrowUp} alt='...'/>}
                            {!flagBlue && <img className='img-arrow' src={ArrowDown} alt='...'/>}
                            {flagBlue && <img className='img-arrow-two' src={ArrowUp} alt='...'/>}
                            {!flagBlue && <img className='img-arrow-two' src={ArrowDown} alt='...'/>}
                        </span>
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
                        <h3 className='title-prom'>Promedio de un dia</h3>
                        <span className='item-span-prom'>{averageOfi}</span>
                        <span className='content-arrow-ofi'>
                            {flagOfi && <img className='img-arrow' src={ArrowUp} alt='...'/>}
                            {!flagOfi && <img className='img-arrow' src={ArrowDown} alt='...'/>}
                            {flagOfi && <img className='img-arrow-two' src={ArrowUp} alt='...'/>}
                            {!flagOfi && <img className='img-arrow-two' src={ArrowDown} alt='...'/>}
                        </span>
                    </div> 
                    
                </div>
           </div>}
           {!isLoading && <div className='box-data'></div>}
           {!isLoading && <Footer/>}
        </div>
    );
};

export default Home;