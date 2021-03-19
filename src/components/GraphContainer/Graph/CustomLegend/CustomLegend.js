import React, { memo } from 'react';

const legendStyles = {
  fontSize: '13px',
  color: '#f9fafb',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const CustomLegend = memo(({ graphConfig }) => (
  <ul>
    {graphConfig.map((item, index) => (
      <li key={`item-${index}`} style={legendStyles}>
        <div
          style={{
            width: '16px',
            height: '16px',
            marginRight: '10px',
            backgroundColor: item.color,
          }}
        ></div>
        {`${item.description} (${item.unit})`}
      </li>
    ))}
  </ul>
));

export default CustomLegend;
