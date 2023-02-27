import React from 'react';
import { PieChart, CartesianGrid, ResponsiveContainer,  Tooltip,  Pie,  Legend} from 'recharts';
import './piechar.css'

const piechar = ({data}) => {
    return (
        <div className='content-piechar'>
            <ResponsiveContainer style={{outline: 'none'}}  width={'90%'} aspect={1}>
            <PieChart width={300} style={{outline: 'none'}} height={200}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip  wrapperStyle={{outline: 'none'}}/>
                <Pie label={true} style={{outline: 'none'}} data={data} dataKey="Valor" nameKey="Fecha" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                <Pie data={data} style={{outline: 'none'}} dataKey="Valor" nameKey="Valor del Blue" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label={true} />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default piechar;