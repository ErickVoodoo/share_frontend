// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

import Menu from './Menu.jsx';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Map extends Component {
  render() {
    return (
      <div className={cx('list')}>
        <Menu />
        <h3>Map</h3>
        <div>
          {this.props.products.map(({ id, title, ...rest }) =>
            <Link key={id} to={`/map/${id}`}>
              <h3>{title}</h3>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default Map;
