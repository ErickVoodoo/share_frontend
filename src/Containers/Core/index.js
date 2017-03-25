// @flow

import Core from './Core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getInitial } from '../../Store/Actions/core.js';
import { PROGRESSBARS, PROGRESSBAR_LOCAL } from '../../Constants/progressbar.js';

const mapStateToProps = ({ behaviors } : { behaviors: Object }) => ({
  isLoading: behaviors.getIn(['progressbar', PROGRESSBAR_LOCAL]).find(i => i === PROGRESSBARS.getInitial.name),
});

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators({
    getInitial,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Core);
