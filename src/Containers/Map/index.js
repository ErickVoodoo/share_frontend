// @flow

import Map from './Map.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PROGRESSBARS, PROGRESSBAR_LOCAL } from '../../Constants/progressbar.js';
import { getProducts } from '../../Store/Actions/products.js';

type IState = {
  products: Object;
  behaviors: Object;
};

const mapStateToProps = ({ products, behaviors }: IState): Object => ({
  isLoading: behaviors.getIn(['progressbar', PROGRESSBAR_LOCAL]).find(i => i === PROGRESSBARS.getProducts.name),
  errors: products.get('error', {}).toJS(),
  meta: products.get('meta', {}).toJS(),
  products: products.get('products', []).toJS(),
});

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators({
    getProducts,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
