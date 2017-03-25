// $flow

import React from 'react';
import classNames from 'classnames/bind';

// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  children: any;
};

const Price = ({ children }: IProps): void =>
  <div className={cx('price')}>
    {children}
  </div>;

export default Price;
