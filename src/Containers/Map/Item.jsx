// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Match, Link } from 'react-router';
// $FlowIssue
import styles from './styles.scss';
import Menu from './Menu.jsx';

const cx: () => string = classNames.bind(styles);

class Item extends Component {
  render() {
    return (
      <div className={cx('item')}>
        Map
        <h3>{this.props.params.id}</h3>
        <Link to={`/list/${this.props.params.id}/pattern`}>Pattern</Link>
        <Match pattern="/list/:id/pattern" component={Menu} />
      </div>
    )
  }
}

export default Item;
