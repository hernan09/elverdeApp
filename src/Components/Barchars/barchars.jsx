import React from 'react';
import './barchars.css';
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const barchars = ({data}) => {
    console.log('la data', data);
    return (
        <div className='content-barchar'>
            <ResponsiveContainer width={'90%'} aspect={2}>
                <LineChart 
                data={data}
                width="300px"
                height={'200px'}
                margin={{
                    top: 5,
                    bottom:5,
                    right:5,
                    left:5
                }}>
                <CartesianGrid strokeDasharray="4 2"/>
                <XAxis dataKey='Fecha' interval={"preserveStart"} allowDataOverflow={true} reversed={true} tick={{stroke: '#5c645b', strokeWidth: 0}}/>
                <YAxis dataKey='Valor'/>
                <Tooltip cursor={{ stroke: '#407a40', strokeWidth: 2 }}  wrapperStyle={{outline: 'none'}}/>
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone"  dataKey='Fecha'stroke="#6f7a6f"/>
                <Line type="monotone"  dataKey='Valor'stroke="#407a40"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default barchars;