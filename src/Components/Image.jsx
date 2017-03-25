// $flow

import React from 'react';
import classNames from 'classnames/bind';

import { getImageUrl } from '../Utils/image.js';
// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  uuid: string;
  size: number;
  className: string;
  onClick: Function;
};

const Image = ({ uuid, size, className, onClick }: IProps): React$Element<*> =>
  uuid ? <div
    className={className}
    onClick={onClick}
    style={{
      backgroundImage: `url(${getImageUrl(uuid, size)})`,
    }}
  /> :
  <div className={cx('image', className)} />;

export default Image;
