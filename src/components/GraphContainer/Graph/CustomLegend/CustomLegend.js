import React, { memo } from 'react';

const CustomLegend = memo((props) => (
  <ul>
    {props.commonData.map((item, index) => (
      <li
        key={`item-${index}`}
        style={{
          fontSize: '13px',
          color: '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
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
