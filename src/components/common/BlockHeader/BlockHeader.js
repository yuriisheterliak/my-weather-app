import React, { memo } from 'react';

import classes from './BlockHeader.module.scss';

const BlockHeader = memo((props) => (
  <div className={classes.BlockHeader}>{props.children}</div>
));

export default BlockHeader;
