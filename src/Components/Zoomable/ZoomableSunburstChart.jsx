import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (data && data.length > 0) {
            createChart();
        }
    }, [data]);

    const createChart = () => {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // SVG
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Escalas
        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(data.map(d => d.source));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => d.value_sell)]);

        // Ejes
        const xAxis = d3.axisBottom(x);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Dibujar las barras
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.source))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value_sell))
            .attr("height", d => height - y(d.value_sell))
            .style("fill", "steelblue")
            .on("click", handleClick)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .call(zoom); // Agregar zoom a las barras
    };

    // Función para manejar el evento onClick
    const handleClick = (event, d) => {
        console.log("Datos de la barra:", d);
        // Aquí puedes mostrar más información sobre la barra seleccionada
    };

    // Función para manejar el evento onMouseOver
    const handleMouseOver = (event, d) => {
        d3.select(event.target)
            .style("fill", "orange"); // Cambiar el color de la barra al pasar el mouse sobre ella
    };

    // Función para manejar el evento onMouseOut
    const handleMouseOut = (event, d) => {
        d3.select(event.target)
            .style("fill", "steelblue"); // Restaurar el color original de la barra al retirar el mouse
    };

    // Función para manejar el evento de zoom
    const zoom = d3.zoom()
        .scaleExtent([1, 10]) // Escala mínima y máxima del zoom
        .on("zoom", handleZoom);

    function handleZoom(event) {
        svgRef.current.querySelector("g").setAttribute("transform", event.transform); // Aplicar transformación de zoom al contenedor del gráfico
    }

    return <svg ref={svgRef}></svg>;
};

export default BarChart;
