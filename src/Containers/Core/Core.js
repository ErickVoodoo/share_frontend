// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { BrowserRouter } from 'react-router';

import Header from './Header.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';
// $FlowIssue
import styles from './styles.scss';

const cx: () => string = classNames.bind(styles);

class Core extends Component {
  componentDidMount = (): void => {
    this.props.getInitial();
  };

  render() {
    return (
      <BrowserRouter>
        <div className={cx('core')}>
          <Header />
          <Content>
            {this.props.children}
          </Content>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default Core;
