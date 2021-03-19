import React, { memo } from 'react';
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

const gridColor = '#334759';
const chartMargins = { top: 20, right: 25, left: -20, bottom: 0 };

const Graph = memo(({ graphData, graphConfig, activeTabName }) => (
  <ResponsiveContainer aspect={1.5} maxHeight={300}>
    <AreaChart data={graphData} margin={chartMargins}>
      <defs>
        {graphConfig.map((item, index) => (
          <linearGradient key={index} id={`gradient-${index}`} x2="0" y2="1">
            <stop offset="5%" stopColor={item.color} />
            <stop offset="95%" stopColor={item.color} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      <XAxis stroke={gridColor} dataKey="name" tickLine={false} />
      <YAxis
        stroke={gridColor}
        tickLine={false}
        domain={activeTabName === 'Prec&Hum' ? [0, 100] : []}
      />
      <CartesianGrid stroke={gridColor} />
      <Tooltip />
      {graphConfig.map((item, index) => (
        <Area
          type="basis"
          dataKey={item.name}
          unit={item.unit}
          stroke={item.color}
          fillOpacity={0.4}
          fill={`url(#gradient-${index})`}
          key={index}
        />
      ))}
      <Legend
        content={<CustomLegend graphConfig={graphConfig} />}
        wrapperStyle={{
          bottom: 0,
          left: 15,
          paddingBottom: activeTabName === 'Prec&Hum' ? 10 : 37,
        }}
      />
    </AreaChart>
  </ResponsiveContainer>
));

export default Graph;
