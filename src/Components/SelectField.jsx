// $flow

import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { isFunction } from 'lodash';

import { List, ListItem, ListItemText } from 'material-ui/List';
import { Menu, MenuItem } from 'material-ui/Menu';

// $FlowIssue
import styles from './style.scss';

const cx: () => string = classNames.bind(styles);

type IProps = {
  name: string;
  items: Array<Object>;
  onSelect: Function;
  selected: string;
  primaryText: string;
  disabled: boolean;
};

type IState = {
  anchorEl: any;
};

class SelectField extends Component {
  props: IProps;
  state: IState = {
    anchorEl: null,
    open: false,
  };

  onSelectItem = (e: Object, index: number) => {
    const { name, items, onSelect } = this.props;

    if (isFunction(onSelect)) {
      onSelect(name, items[index]);

      this.setState({
        open: false,
      });
    }
  }

  onOpenMenu = (e: Object): void => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  onCloseMenu = (): void => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { id, items, selected, primaryText, disabled } = this.props;

    const selectedItem = items.find((item) => item.id === selected);

    if (items && items.length && items[0].name !== 'Не выбрано') {
      items.unshift({ id: null, name: 'Не выбрано' })
    }

    return (
      <div>
        <List
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <ListItem
            button
            aria-haspopup="true"
            aria-controls={id}
            aria-label={primaryText || 'Выберите из списка'}
            onClick={this.onOpenMenu}
            disabled={disabled}
            style={{
              padding: '0 16px',
              pointerEvents: disabled ? 'none' : 'all',
            }}
          >
            <ListItemText
              primary={primaryText || 'Выберите из списка'}
              secondary={selectedItem ? selectedItem.name : ''}
              style={{ alignSelf: 'flex-start', minHeight: 48, paddingTop: 2 }}
            />
          </ListItem>
        </List>
        <Menu
          id={id}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.onCloseMenu}
          disabled={disabled}
          style={{ pointerEvents: disabled ? 'none' : 'all' }}
        >
          {items.map(({ id: itemId, name }, index) =>
              <MenuItem
                id={itemId}
                key={itemId}
                selected={selected ? itemId === selected : index === 0}
                onClick={(e) => this.onSelectItem(e, index)}
              >
                {name}
              </MenuItem>
        )}
        </Menu>
      </div> : null
    );
  }
}

export default SelectField;
