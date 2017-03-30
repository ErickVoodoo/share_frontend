// @flow

import Map from './Map.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PROGRESSBARS, PROGRESSBAR_LOCAL } from '../../Constants/progressbar.js';
import { getProducts, clearProducts } from '../../Store/Actions/products.js';
import { getAttributes, clearAttributes } from '../../Store/Actions/core.js';

type IState = {
  core: Object;
  products: Object;
  behaviors: Object;
};

const mapStateToProps = ({ core, products, behaviors }: IState): Object => ({
  isLoading: behaviors.getIn(['progressbar', PROGRESSBAR_LOCAL]).find(i => i === PROGRESSBARS.getProducts.name),
  errors: products.get('error', {}).toJS(),
  meta: products.get('meta', {}).toJS(),

  core: {
    countries: core.get('countries', []),
    categories: core.get('categories', []),
    delivers: core.get('delivers', []),
    cities: core.get('cities', []),
    streets: core.get('streets', []),
  },

  products: products.get('products', []).toJS(),
});

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators({
    getProducts,
    clearProducts,
    getAttributes,
    clearAttributes,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
