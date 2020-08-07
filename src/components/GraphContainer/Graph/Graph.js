import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import CustomLegend from './CustomLegend/CustomLegend';

const Graph = (props) => (
  <ResponsiveContainer aspect={1.5}>
    <AreaChart
      data={props.graphData}
      margin={{
        top: 20,
        right: 25,
        left: props.commonData[0].name === 'pressure' ? -10 : -25,
        bottom: 0,
      }}
    >
      <defs>
        {props.commonData.map((item, index) => (
          <linearGradient
            key={index}
            id={`gradient-${index}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="50%" stopColor={item.color} />
            <stop offset="95%" stopColor={item.color} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      <XAxis stroke="#334759" dataKey="name" tickLine={false} />
      <YAxis
        stroke="#334759"
        tickLine={false}
        domain={props.commonData[0].name === 'precipitation' ? [0, 100] : []}
      />
      <CartesianGrid stroke="#273949" />
      <Tooltip />
      {props.commonData.map((item, index) => (
        <Area
          type="basis"
          dataKey={item.name}
          unit={item.unit}
          stroke={item.color}
          fillOpacity={0.7}
          fill={`url(#gradient-${index})`}
          key={index}
        />
      ))}
      <Legend
        content={<CustomLegend commonData={props.commonData} />}
        wrapperStyle={{ bottom: 0, left: 15, paddingBottom: 10 }}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default Graph;
