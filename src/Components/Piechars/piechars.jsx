import React from 'react';
import { BarChart, CartesianGrid, ResponsiveContainer,  Tooltip,  XAxis, YAxis, Legend, Bar} from 'recharts';
import './piechars.css';

const piechars = ({data}) => {
    console.log('pie',data);
    return (
        <div className='content-piechar'>
            <ResponsiveContainer width={'90%'} aspect={1.5}>
            <BarChart width={300} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Fecha" reversed={true} interval={"preserveStart"} allowDataOverflow={true}/>
                <YAxis dataKey="Valor"/>
                <Tooltip />
                <Legend  verticalAlign="top"/>
                <Bar dataKey="Valor" name='Valor Dolar BLue' fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default piechars;