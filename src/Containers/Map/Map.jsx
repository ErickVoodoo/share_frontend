// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { isEqual } from 'lodash';

import { Map as DefaultMap, Menu } from '../../Components/';
import { setManyPoints } from '../../Utils/map.js';
import { addQuery, removeQuery, subscribeHistory, getSearchParams } from '../../Utils/url.js';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Map extends Component {
  historyListener: ?Function;

  componentDidMount = (): void => {
    this.reloadItems();
    this.historyListener = subscribeHistory(this.reloadItems);
  };

  componentWillUnmount = (): void => {
    this.props.clearProducts();
    if (this.historyListener) {
      this.historyListener();
    }
  }

  reloadItems = (): void => {
    const { getProducts } = this.props;
    const searchObject = getSearchParams();
    getProducts({ params: { ...searchObject, title: searchObject.search || '', size: 20 }});
  };

  componentWillReceiveProps = (nextProps: Object): void => {
    if (!isEqual(nextProps.products, this.props.products)) {
      setManyPoints({ positions: nextProps.products.map(({ location: { lat, lon } }) => ([parseFloat(lat), parseFloat(lon)]))});
    }
  };

  render() {
    const { core } = this.props;

    return (
      <div className={cx('list')}>
        <Menu
          {...core}
          onGetAddress={this.props.getAttributes}
          onClearAddress={this.props.clearAttributes}
          onFilter={(name, param) => {
            if (param) {
              addQuery({ [name]: param });
            } else {
              removeQuery([name]);
            }
          }}
        />
        <DefaultMap className={cx('map')} />
      </div>
    )
  }
}

export default Map;
