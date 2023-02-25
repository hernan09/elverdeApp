import React from 'react';
import { BarChart, CartesianGrid, ResponsiveContainer,  Tooltip,  XAxis, YAxis, Legend, Bar} from 'recharts';
import './barchar.css';

const Barchar = ({data}) => {
    console.log('pie',data);
    return (
        <div className='content-barchart'>
            <ResponsiveContainer width={'90%'} aspect={1.5}>
            <BarChart width={300} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Fecha" reversed={true} interval={"preserveStart"} allowDataOverflow={true}/>
                <YAxis dataKey="Valor"/>
                <Tooltip  wrapperStyle={{outline: 'none'}}/>
                <Legend  verticalAlign="top"/>
                <Bar dataKey="Fecha" name='Fecha' fill="#6f7a6f" />
                <Bar dataKey="Valor" name='Valor Dolar BLue' fill="#407a40" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Barchar;