import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import Footer from '../Footer/footer';
import LInechart from '../Linechar/linechar';
import Barchar from '../Barchar/barchar';
import Header from '../Header/header';
//import Weather from '../Weather/weather';
import './main.css';
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
    const [data, setData] = useState(null);
    const [newData, setNewData] = useState([]);
    
    //todavia no esta aplicado
    // const [variationOfi, setVariationOfi] = useState(null);
    // const [variationBlue, setVariationBlue] = useState(null);

    const url = process.env.REACT_APP_API_BASE_URL;

    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_BASE_KEY,
        'X-RapidAPI-Host': 'dolarapi.p.rapidapi.com'
    }
    };

    useEffect(()=>{
        fetch(url, options)
        .then(res => res.json())
        .then(json => {
            setData(json);
            setShellOfiAfter(json[2].value_sell) // valor venta oficial dia anterior
            setShellBlueAfter(json[3].value_sell) // valor del blue dia anterior
            setDolarBLue(json[1].source); // etiqueta blue
            setShellBlue(json[1].value_sell); // valor de venta blue
            setBuyBlue(json[1].value_buy); // valor de compra blue
            setDolarOfi(json[0].source); // etiqueta Oficial
            setShellOfi(json[0].value_sell); // valor de venta oficial
            setBuyOfi(json[0].value_buy); // valor de compra oficial
            calculateAverageBlue(buyBlue, ShellBlue);
            calculateAverageOficial(buyOfi, ShellOfi)
            CalculateGrowthBlue(averageBlue)
            setIsLoading(false);
        })
        .catch(err => console.error('error:' + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ShellBlue,ShellOfi]);


    const CalculateGrowthBlue = () => {
        let newDataArray = [];
        data?.map(element => {
            if (element.source === 'Blue') {
                newDataArray.push({
                    Fecha: element.date.split('-').reverse().join('/'),
                    Valor: element.value_sell
                })

                setNewData(newDataArray)
            }
            return newData;
        });
    } 


    const calculateColorAverageBlue = ()=> {
        let divAverageBLue = document.querySelector('.blue-average');
        if (ShellBLueAfter > ShellBlue) {
            divAverageBLue?.classList.add('lowred')
            divAverageBLue?.classList.remove('higtgreen')
            setFLagBlue(false);
        } else {
            divAverageBLue?.classList.add('higtgreen')
            divAverageBLue?.classList.remove('lowred')
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
        let suma = Math.floor(precioAyer + precioHoy);
        let averageOficiall = Math.floor(suma / 2);
        console.log('promedio oficial', averageOficiall);
        setAverageOfi(averageOficiall);
        await calculateColorAverageOficial()
    }

    const calculateAverageBlue = async (precioAyer, precioHoy) => {
        let suma = precioAyer + precioHoy;
        let averageBluee = Math.floor(suma / 2);
        console.log('promedio blue', averageBluee);
        setAverageBlue(averageBluee);
        await calculateColorAverageBlue()
    }
    

    return (
        <div>
           {isLoading && <h1 className='load'>Cargando....</h1>}
           {!isLoading && <Header/>}
           {!isLoading && <div className='home-contain'>
                <div className='content-dolarblue'>
                    <h3 className='title blue'>Dolar {DolaBlue}</h3> 
                    {/* hacer metodo que afecte ambas box con icono de flecita que muestre si aumento o subio */}
                    <div className='content-text venta'>
                        <h3>Venta</h3>
                        <span className='item-span'>{<CountUp end={ShellBlue} duration={2}/>}</span>
                    </div>
                    <div className='content-text compra'>
                        <h3>Compra</h3>
                        <span className='item-span'>{<CountUp end={buyBlue} duration={2}/>}</span>
                    </div>
                    <div className='content-text promedio blue-average'>
                        <h3 className='title-prom'>Promedio</h3>
                        <span className='item-span-prom'>{<CountUp end={averageBlue} duration={2}/>}</span>
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
                        <span className='item-span'>{<CountUp end={ShellOfi} duration={2}/>}</span>
                    </div>
                    <div className='content-text compra'>
                        <h3>Compra</h3>
                        <span className='item-span'>{<CountUp end={buyOfi} duration={2}/>}</span>
                    </div>  
                    <div className='content-text promedio oficial-average'>
                        <h3 className='title-prom'>Promedio</h3>
                        <span className='item-span-prom'>{<CountUp end={averageOfi} duration={2}/>}</span>
                        <span className='content-arrow-ofi'>
                            {flagOfi && <img className='img-arrow' src={ArrowUp} alt='...'/>}
                            {!flagOfi && <img className='img-arrow' src={ArrowDown} alt='...'/>}
                            {flagOfi && <img className='img-arrow-two' src={ArrowUp} alt='...'/>}
                            {!flagOfi && <img className='img-arrow-two' src={ArrowDown} alt='...'/>}
                        </span>
                    </div> 
                    
                </div>
           </div>}
           {!isLoading && <div className='box-data'>
            <LInechart data={newData}/>
            </div>}
            {!isLoading && <Barchar data={newData}/>}
           {!isLoading && <Footer/>}
        </div>
    );
};

export default Home;