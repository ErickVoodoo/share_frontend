// @flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Match } from 'react-router';
import { isFunction } from 'lodash';
import { LinearProgress } from 'material-ui/Progress';

import { Image, Price } from '../../Components/';
// $FlowIssue
import styles from './styles.scss';
import Menu from './Menu.jsx';

const cx: () => string = classNames.bind(styles);

type IState = {
  hoverProgress: number;
};

type IProps = {
  images: Array<Object>;
  title: string;
  description: string;
  price: string;

  className: string;
  onClick?: Function;
  onHover?: Function;
  onBlur?: Function;
};

let timer;
let hoverTimer;

const timerInterval = 500;

class Item extends Component {
  props: IProps;
  state: IState = {
    hoverProgress: 0,
  };

  hovered: boolean; // if item is already hovered
  hoverStarted: boolean; // if user start hover

  onHover = (): void => {
    const { onHover } = this.props;
    if (!this.hoverStarted) {
      this.hoverStarted = true;
      this.forceUpdate();
    }

    if (onHover && isFunction(onHover)) {
      timer = setTimeout(() => {
        if (!this.hovered) {
          this.hovered = true;
          onHover();
        }
      }, timerInterval);

      hoverTimer = setInterval(() => {
        const { hoverProgress } = this.state;
        if (hoverProgress + (timerInterval / (timerInterval / 10)) < 101) {
          this.setState({
            hoverProgress: hoverProgress + (timerInterval / (timerInterval / 10)),
          });
        }
      }, timerInterval / 10);
    }
  };

  onBlur = (): void => {
    const { onBlur } = this.props;
    this.hoverStarted = false;

    if (onBlur && isFunction(onBlur)) {
      if (this.hovered || timer) {
        this.hovered = false;

        clearTimeout(timer);
        clearInterval(hoverTimer);

        onBlur();

        this.setState({
          hoverProgress: 0,
        });
      }
    }
  };

  render() {
    const { hoverProgress } = this.state;
    const { images, title, description, price, onClick } = this.props;

    return (
      <div className={cx('item')} onClick={onClick} onMouseEnter={this.onHover} onMouseLeave={this.onBlur}>
        <LinearProgress
          mode="determinate"
          className={cx('progress')}
          value={hoverProgress}
          style={{ display: hoverProgress || this.hoverStarted ? 'block' : 'none' }}
        />
        <div className={cx('photo')}>
          <Image
            className={cx('image')}
            uuid={images && images.length && images[0] && images[0].id ? images[0].id : null}
            size={604}
          />
        </div>
        <div className={cx('content')}>
          <span className={cx('title')}>{title}</span>
          <span className={cx('description')}>{description}</span>
        </div>
        <div className={cx('details')}>
          <Price>
            {price}
          </Price>
        </div>
        <Match pattern="/list/:id/edit" component={Menu} />
      </div>
    )
  }
}

export default Item;
