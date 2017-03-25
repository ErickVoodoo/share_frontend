// @flow
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { IconButton } from 'material-ui';
// import ContentClear from 'material-ui/svg-icons/content/clear';
import { isFunction } from 'lodash';
// @FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  title: string; // tag text
  small?: boolean; // is tag small or not
  selected?: boolean;
  onSelect?: Function; // on click event at tag
  onDelete?: Function;
};

class Tag extends Component {
  props: IProps;

  onDelete = (e:Object): void => {
    const { onDelete } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && isFunction(onDelete)) {
      onDelete();
    }
  };

  render() {
    const { title, small, selected, onSelect, onDelete } = this.props;
    return (
      <div
        className={cx('tag', { selected }, { selectable: onSelect && isFunction(onSelect) }, { small })}
        onClick={onSelect}
      >
        <span
          className={cx('name')}
          style={{ paddingRight: onDelete && isFunction(onDelete) ? 4 : 12 }}
        >
          {title}
        </span>
        { !!(onDelete && isFunction(onDelete)) &&
          <IconButton
            onClick={this.onDelete}
            iconStyle={{ width: 12, height: 12 }}
            style={{ width: 24, height: 24, padding: 0, marginRight: 8 }}
          >
            // <ContentClear />
          </IconButton>
        }
      </div>
    );
  }
}

export default Tag;
