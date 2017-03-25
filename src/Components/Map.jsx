// $flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';

// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {

};

export const mapId = 'default-map';
window.defaultMap = null;

class DefaultMap extends Component {
  props: IProps;

  componentDidMount = (): void => {
    if (window.ymaps) {
      window.ymaps.ready(this.mapInit);
    }
  };

  mapInit = (): void => {
    window.defaultMap = new window.ymaps.Map(mapId, {
      center: [55.76, 37.64],
      zoom: 10,
      controls: ['zoomControl']
    } ,
    {
      searchControlProvider: 'yandex#search',
    });
  };

  componentWillUnmount = (): void => {
    if (window.defaultMap) {
      window.defaultMap.destroy();
    }
  };

  render() {
    const { className } = this.props;

    return (
      <div id={mapId} className={cx('map', className)}>

      </div>
    );
  }
};

export default DefaultMap;
