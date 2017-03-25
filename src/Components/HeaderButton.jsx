// $flow

import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  className: string;
  children: any;
  to: string;
  style: Object;
  childrenStyle: Object;
};

const HeaderButton = ({ children, to, active, style, childrenStyle }: IProps): void =>
  <Link to={to} className={cx('headerButton', { active })} style={style}>
    <span style={childrenStyle}>
      {children}
    </span>
  </Link>;

export default HeaderButton;
