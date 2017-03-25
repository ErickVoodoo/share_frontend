// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';

// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Footer extends Component {
  render() {
    return (
      <div className={cx('footer')}>
        Footer
      </div>
    )
  }
}

export default Footer;
