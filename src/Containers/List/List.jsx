// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import { PROGRESSBARS, LOADER_TYPE, LOADER_STYLE } from '../../Constants/progressbar.js';
import { ItemDialog, Loader, Scrollable, Map } from '../../Components/';
import { addQuery, removeQuery, subscribeHistory, getSearchParams } from '../../Utils/url.js';
import Menu from './Menu.jsx';
// import Map from './Map.jsx';
import Item from './Item.jsx';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  core: Object;
  getProducts: Function;
  clearProducts: Function;
  getAttributes: Function;
  clearAttributes: Function;
  products: Array<Object>;
};

type IState = {
  openedItem: string;
};

class List extends Component {
  props: IProps;
  state: IState = {
    openedItem: '',
  };

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

  onOpenDialog = (id: string): void => {
    this.setState({
      openedItem: id,
    });
  };

  onCloseDialog = (): void => {
    this.setState({
      openedItem: '',
    });
  };

  onHoverItem = ({ lat, lon }: { lat: string, lon: string }) : void => {
    console.log('onHover');
    if (window.ymaps && window.ymaps.geocode) {
      window.ymaps.geocode(`${lat},${lon}`, {
          results: 1
      }).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);

        const bounds = firstGeoObject.properties.get('boundedBy');
        window.defaultMap.geoObjects.add(firstGeoObject);
        window.defaultMap.setBounds(bounds, {
            checkZoomRange: true
        });
      });
    }
  };

  onBlurItem = () : void => {
    console.log('onBlur');
  };

  render() {
    const { core, products } = this.props;
    const { openedItem } = this.state;

    return (
      <div className={cx('list')}>
        <Map className={cx('map')}/>
        <div className={cx('container')}>
          <Menu {...core}
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
          <div className={cx('items')}>
            <Loader type={LOADER_TYPE.local} name={PROGRESSBARS.getProducts.name} loader={LOADER_STYLE.circular}>
              <Scrollable>
                {products.map(({ id, location, ...rest }) =>
                  <Item
                    key={id}
                    location={location}
                    onClick={() => this.onOpenDialog(id)}
                    onHover={() => this.onHoverItem({ lat: location.lat, lon: location.lon })}
                    onBlur={this.onBlurItem}
                    {...rest}
                  />
                )}
              </Scrollable>
            </Loader>
          </div>
        </div>
        <ItemDialog
          isOpen={!!openedItem}
          onClose={this.onCloseDialog}
          item={products && products.length && products.find(i => i.id === openedItem)}
        />
      </div>
    )
  }
}

List.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default List;
