// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';

// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Menu extends Component {
  render() {
    return (
      <div className={cx('menu')}>
        <h2>Map list</h2>
      </div>
    )
  }
}

export default Menu;
