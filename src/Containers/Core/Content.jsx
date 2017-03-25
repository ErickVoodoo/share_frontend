// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Match } from 'react-router';

import List from '../List/';
import Map from '../Map/';
import ListItem from '../List/Item.jsx';
import MapItem from '../List/Item.jsx';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Content extends Component {
  render() {
    return (
      <div className={cx('content')}>
        <Match exactly pattern="/list" component={List} />
        <Match exactly pattern="/map" component={Map} />
        <Match pattern="/list/:id" component={ListItem} />
        <Match pattern="/map/:id" component={MapItem} />
      </div>
    )
  }
}

export default Content;
