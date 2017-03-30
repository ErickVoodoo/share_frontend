// @flow
import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

// Import styles
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  children: any;
};

const onScroll = ():void => {
  const scrollable = document.getElementById('container-scrollable-div');
  const shadow = document.getElementById('shadow-scrollable-div');

  if (scrollable && shadow) {
    if (scrollable.scrollTop > 0) {
      // $FlowIssue
      shadow.style['box-shadow'] = '0px 2px 7px -1px rgba(0,0,0,.5)';
    } else {
      // $FlowIssue
      shadow.style['box-shadow'] = 'none';
    }
  }
};

const List = ({
  children,
}: IProps) =>
  <div className={cx('scrollable')}>
    <div id="shadow-scrollable-div" className={cx('shadow')} />
    <div id="container-scrollable-div" className={cx('items')} onScroll={onScroll}>
      {children}
    </div>
  </div>;

List.propTypes = {
  children: PropTypes.any,
};

export default List;
