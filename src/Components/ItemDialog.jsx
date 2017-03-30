// @flow

import React, { Component } from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import classNames from 'classnames/bind';
import { Dialog } from 'material-ui/Dialog';
import { IconButton, Avatar, Icon } from 'material-ui';
import Slide from 'material-ui/transitions/Slide';
import { isFunction } from 'lodash';

import { getSocialImage } from '../Utils/social.js';
import { Tag, Price, Image } from './';
import { getImageUrl } from '../Utils/image.js';
// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  isOpen: boolean;
  onClose: Function;
  item: Object;
};

type IState = {
  openedImage: string;
};

class ItemDialog extends Component {
  props: IProps;
  state: IState = {
    openedImage: '',
  };

  onOpenImage = (uuid: string): void => {
    this.setState({
      openedImage: uuid,
    });
  };

  onCloseDialog = (): void => {
    const { onClose } = this.props;
    if (isFunction(onClose)) {
      onClose();
    }

    this.setState({
      openedImage: '',
    });
  };

  render() {
    const { isOpen, item } = this.props;
    const { openedImage } = this.state;

    return (
      <Dialog
        open={isOpen}
        transition={Slide}
        onEscapeKeyUp={this.onCloseDialog}
        onBackdropClick={this.onCloseDialog}
        maxWidth={'md'}
      >
        <div style={{
          maxHeight: 516,
          minHeight: 516,
          height: 516,
        }}>
          {item && <div className={cx('item_dialog')}>
            <div className={cx('header')}>
              <div className={cx('person')}>
                <Avatar
                  className={cx('avatar')}
                  src={item.user.logo ? getImageUrl(item.user.logo, 130) : null}
                  style={{
                    backgroundColor: '#e6e6e6',
                  }}
                />
                <span>{item.user.name}</span>
              </div>
              <div className={cx('products')}>
                <span></span>
              </div>
              <div className={cx('exit')}>
                <IconButton onClick={this.onCloseDialog}>
                  clear
                </IconButton>
              </div>
            </div>
            <div className={cx('content')}>
              {item.images && !!item.images.length &&
                <div className={cx('images')}>
                  <div className={cx('photos', { padding_images: openedImage })}>
                    {item.images.map(({ id }) =>
                      <Image
                        key={id}
                        uuid={id}
                        className={cx('photo')}
                        size={604}
                        onClick={() => this.onOpenImage(id)}
                      />
                    )}
                  </div>
                <div
                  className={cx('content_button', { hidden_content: !openedImage })}
                  onClick={() => this.onOpenImage('')}
                >
                  <span>К описанию</span>
                </div>
              </div>
              }
              <div className={cx('data', { hidden: openedImage })}>
                <span className={cx('title')}>
                  <span className={cx('text')} title={item.title}>{item.title}</span>
                  {item.price &&
                    <Price>
                      {item.price}
                    </Price>
                  }
                </span>
                {item.discount &&
                  <div className={cx('discount')}>
                    <span className={cx('value')} title={item.discount.value}>{item.discount.value}</span>
                    <span className={cx('promo')} title={item.discount.promo}>{item.discount.promo}</span>
                  </div>
                }
                <span className={cx('tags')}>
                  {item.tags && item.tags.length && item.tags.map(({ id, name }) =>
                    <Tag
                      key={id}
                      title={name}
                      onSelect={() => {
                        console.log('Navigate to:', name);
                      }}
                    />
                  )}
                </span>
                <div className={cx('info')}>
                  { item.location &&
                    <span className={cx('city')} title={`${item.location.city}, ${item.location.street}`}>
                      <span>
                        Город:
                      </span>
                      {item.location.city}, {item.location.street}
                    </span>
                  }
                  <span className={cx('category')} title={item.category.name}>
                    <span>
                      Категория:
                    </span>
                    {item.category.name}
                  </span>
                </div>
                <span className={cx('description')}>{item.description}</span>
                <p className={cx('connect')}>
                  СВЯЗАТЬСЯ С ПРОДАВЦОМ ЧЕРЕЗ СОЦ. СЕТИ:
                </p>
                <div className={cx('media')}>
                  { item.links && item.links.concat([
                    { url: 'http://facebook.com'},
                    { url: 'http://linkedin.com'},
                    { url: 'http://youtube.com'},
                    { url: 'http://ok.com'},
                    { url: 'http://twitter.com'},
                    { url: 'http://instagram.com'},
                    { url: 'http://plus.google.com'},
                    { url: 'http://vk.com'},
                  ])
                    .map(({ url }, index) => {
                      const { icon, name } = getSocialImage({ url });
                      return (
                        <div className={cx('social_item')} key={index}>
                          {icon}
                          <span>{name}</span>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className={cx('other')}>

                </div>
              </div>
              { openedImage &&
                <div className={cx('preview', { hidden: !openedImage })}>
                  <Image
                    key={openedImage}
                    uuid={openedImage}
                    className={cx('photo')}
                    size={1280}
                  />
                </div>
              }
            </div>
          </div>}
        </div>
      </Dialog>
    );
  }
};

ItemDialog.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default ItemDialog;
