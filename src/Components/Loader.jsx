// $flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';
import { isEqual } from 'lodash';

// $FlowIssue
import styles from './style.scss';
const cx: () => string = classNames.bind(styles);

export const LOADER_STYLE = {
  linear: 'linear',
  circular: 'circular',
};

export const LOADER_TYPE = {
  global: 'global',
  local: 'local',
};

type IProps = {
  children?: any;
  className?: string;
  loader: string;
  type?: string;
  name?: string;
  globalLoading: Array<string>;
  localLoading: Array<string>;
  match: boolean;
};

const isVisible = ({ name, type, globalLoading = [], localLoading = [], match = false }: IProps): boolean => { // eslint-disable-line
  let isLoading = false;
  if (type === LOADER_TYPE.local) {
    if (name && localLoading.includes(name)) {
      isLoading = true;
    }
  } else if (type === LOADER_TYPE.global) {
    if (globalLoading && globalLoading.length) {
      isLoading = true;
    }
  }
  if (match) {
    isLoading = type === LOADER_TYPE.local ?
      !!localLoading.filter((i) => i.includes(name)) :
      !!globalLoading.filter((i) => i.includes(name));
    if (type === LOADER_TYPE.local && localLoading && !localLoading.length) {
      isLoading = false;
    }
    if (type === LOADER_TYPE.global && globalLoading && !globalLoading.length) {
      isLoading = false;
    }
  }
  return isLoading;
};

class Loader extends Component {
  props: IProps;

  shouldComponentUpdate = (nextProps: IProps): boolean =>
    !isEqual(nextProps, this.props);

  render() {
    const {
      children,
      className,
      loader = LOADER_STYLE.linear,
      type = LOADER_TYPE.local,
      name,
      globalLoading,
      localLoading,
      match,
    } = this.props;
    console.log(globalLoading, localLoading);
    return (
      isVisible({ name, type, globalLoading, localLoading, match }) ?
        <div className={cx('loader', className, { circular: loader === LOADER_STYLE.circular })}>
          {loader === LOADER_STYLE.linear ?
            <LinearProgress style={{ backgroundColor: '#fff', borderRadius: 0 }} /> :
            <CircularProgress style={{ backgroundColor: '#fff', borderRadius: 0, width: 35 }} />}
        </div> :
        (<div style={{ height: children ? '100%' : 'auto' }}>{children}</div> || null)
    );
  }
}

const mapToStateProps = ({ behaviors }): Object => ({
  globalLoading: behaviors.getIn(['progressbar', 'global']).toJS(),
  localLoading: behaviors.getIn(['progressbar', 'local']).toJS(),
});

export default connect(mapToStateProps, { })(Loader);

/* eslint-disable */
// Default
// <Loader type={'local'} loader={'linear'} />
// <Loader type={'global'} /> - Determinate. Below the header.
// <Loader type={'local'} name={'dashboard'} loader={'circular'} /> - Determinate. At the centre of the window.
// <Loader type={'local'} name={'dashboard'} loader={'linear'} /> - At the bottom of a dialog
