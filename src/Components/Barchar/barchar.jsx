import React from 'react';
import { BarChart, CartesianGrid, ResponsiveContainer,  Tooltip,  XAxis, YAxis, Legend, Bar} from 'recharts';
import './barchar.css';

const Barchar = ({data}) => {
    return (
        <div className='content-barchart'>
            <ResponsiveContainer width={'90%'} aspect={1.5}>
            <BarChart width={300} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Fecha" reversed={true} height={56} interval={"preserveStart"} allowDataOverflow={true}/>
                <YAxis dataKey="Valor"/>
                <Tooltip  wrapperStyle={{outline: 'none'}}/>
                <Legend  verticalAlign="top" height={36} iconType="line"/>
                <Bar dataKey="Fecha" name='Fecha' fill="#494948" />
                <Bar dataKey="Valor" name='Valor Dolar Oficial' fill="#494948" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Barchar;