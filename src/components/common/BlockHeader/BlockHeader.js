import { memo } from 'react';

import classes from './BlockHeader.module.scss';

const BlockHeader = memo(({ children }) => (
  <div className={classes.BlockHeader}>{children}</div>
));

export default BlockHeader;
