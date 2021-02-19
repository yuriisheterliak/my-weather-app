import React from 'react';

import classes from './BlockHeader.module.scss';

const BlockHeader = (props) => (
  <div className={classes.BlockHeader}>{props.children}</div>
);

export default BlockHeader;
