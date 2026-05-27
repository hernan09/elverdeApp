import React from "react";
import "./linechar.css";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import ChartTooltip from "../ChartTooltip";

const Linechar = ({ data }) => {
  return (
    <div className="content-barchar">
      <h3 className="chart-title">Evolución Dólar Blue — 30 días</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 5, bottom: 5, right: 10, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="Fecha"
            height={56}
            interval="preserveStart"
            allowDataOverflow={true}
            reversed={true}
            tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "DM Sans" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />
          <YAxis
            dataKey="Valor"
            tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<ChartTooltip color="#2d6a4f" labelName="Dólar Blue" />}
            cursor={{ stroke: "#2d6a4f", strokeWidth: 1, strokeDasharray: "4 4" }}
          />
          <Line
            type="monotone"
            dataKey="Valor"
            stroke="#2d6a4f"
            strokeWidth={2}
            dot={{ fill: "#2d6a4f", r: 3, strokeWidth: 0 }}
            activeDot={{ fill: "#2d6a4f", r: 5, strokeWidth: 2, stroke: "#d8f3dc" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Linechar;
