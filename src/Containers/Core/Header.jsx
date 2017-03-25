// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import keycode from 'keycode';
import { TextField } from 'material-ui';

import { getFromQuery, addQuery, getSearchParams } from '../../Utils/url.js';
import { Place as PlaceIcon } from '../../Components/icons/';
import Loader, { LOADER_TYPE } from '../../Components/Loader.jsx';
import { HeaderButton } from '../../Components/';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

type IState = {
  searchInput: string;
};

class Header extends Component {
  state: IState = {
    searchInput: '',
  };

  search: HTMLElement;

  componentDidMount = (): void => {
    console.log('componentDidMount', getFromQuery('search'));
    this.setState({
      searchInput: getFromQuery('search'),
    });
  };

  componentWillReceiveProps = (): void => {
    console.log('componentWillReceiveProps', getFromQuery('search'));
    this.setState({
      searchInput: getFromQuery('search'),
    });

    // console.log(getSearchParams());
  };

  isActiveRoute = (route: string): boolean => {
    const { location: { pathname } } = window;
    const path = pathname.substr(1, pathname.length).split('?')[0].split('/')[0];
    return path === route;
  };

  onChangeSearch = (e: Object): void => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  onSendRequest = (): void => {
    const { searchInput } = this.state;
    addQuery({ 'search': searchInput });
  };

  render() {
    const { searchInput } = this.state;

    return (
      <div className={cx('header')}>
        <div className={cx('top')}>
          <div className={cx('logo')}>
            Logo
          </div>
          <div className={cx('empty')} />
          <div className={cx('empty')} />
        </div>
        <div className={cx('bottom')}>
          <div className={cx('buttons')}>
            <HeaderButton to='/dashboard' active={this.isActiveRoute('dashboard')}>
              Доска
            </HeaderButton>
            <HeaderButton to='/list' active={this.isActiveRoute('list')}>
              Поиск
            </HeaderButton>
            <HeaderButton to='/profile' active={this.isActiveRoute('profile')}>
              Профиль
            </HeaderButton>
          </div>
          <div className={cx('search')}>
            <TextField
              onChange={this.onChangeSearch}
              // onBlur={this.onSendRequest}
              value={searchInput}
              onKeyDown={(e) => {
                if (keycode(e) === 'enter') {
                  this.onSendRequest();
                }
              }}
              label={'Поиск'}
            />
          </div>
          <div className={cx('map')}>
            <HeaderButton
              to='/map'
              style={{ minWidth: 180 }}
              childrenStyle={{ display: 'flex', alignItems: 'center' }}
              active={this.isActiveRoute('map')}
            >
              <PlaceIcon />
              Поиск по карте
            </HeaderButton>
          </div>
        </div>
        <div className={cx('border')} />
        <Loader type={LOADER_TYPE.global} />
      </div>
    )
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
