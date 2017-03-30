// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { isFunction } from 'lodash';

import { getFromQuery, removeQuery, clearQuery } from '../Utils/url.js';
import { SelectField } from './';
// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  categories: Object;
  countries: Object;
  cities: Object;
  streets: Object;
  delivers: Object;
  onFilter: Function;
  onGetAddress: Function;
  onClearAddress: Function;
};

class Menu extends Component {
  props: IProps;

  componentWillUnmount = (): void => {
    clearQuery();
  };

  onSelect = (name: string, item: Object): void => {
    const { onFilter, onClearAddress, onGetAddress } = this.props;

    if (name === 'country_id') {
      if (item.id) {
        onGetAddress({ payload: { params: { country_id: item.id }}});
      } else {
        onClearAddress({ payload: ['cities', 'streets']});
      }
      removeQuery(['city_id', 'street_id']);
    }

    if (name === 'city_id') {
      if (item.id) {
        onGetAddress({ payload: { params: { country_id: getFromQuery('country_id'), city: item.id }}});
      } else {
        onClearAddress({ payload: ['streets']});
      }
      removeQuery(['street_id']);
    }

    if (isFunction(onFilter)) {
      onFilter(name, item.id);
    }

    this.forceUpdate();
  }

  render() {
    const { categories, countries, cities, streets, delivers } = this.props;
 console.log(this.props);
    return (
      <div className={cx('menu')}>
        <SelectField
          id={'country_select'}
          name={'country_id'}
          primaryText={'Страна'}
          items={countries.toJS()}
          selected={getFromQuery('country_id')}
          onSelect={this.onSelect}
        />
        <SelectField
          id={'city_select'}
          name={'city'}
          primaryText={'Город'}
          items={cities.toJS().map((name) => ({ id: name, name }))}
          selected={getFromQuery('city')}
          onSelect={this.onSelect}
          disabled={!(cities && cities.toJS() && !!cities.toJS().length)}
        />
        <SelectField
          id={'street_select'}
          name={'street'}
          primaryText={'Улица'}
          items={streets.toJS().map((name) => ({ id: name, name }))}
          selected={getFromQuery('street')}
          onSelect={this.onSelect}
          disabled={!(streets && streets.toJS() && !!streets.toJS().length)}
        />
        <SelectField
          id={'category_select'}
          name={'category_id'}
          primaryText={'Категория'}
          items={categories.toJS()}
          selected={getFromQuery('category_id')}
          onSelect={this.onSelect}
        />
        <SelectField
          id={'deliver_select'}
          name={'deliver_id'}
          primaryText={'Доставка'}
          items={delivers.toJS()}
          selected={getFromQuery('deliver_id')}
          onSelect={this.onSelect}
        />
      </div>
    )
  }
}

export default Menu;
