/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Menu, { SubMenu, Item as MenuItem } from '../src';
import '../assets/index.less';

const collapseNode = () => ({ height: 0 });
const expandNode = node => ({ height: node.scrollHeight });

const inlineMotion = {
  motionName: 'rc-menu-collapse',
  onApperStart: collapseNode,
  onAppearActive: expandNode,
  onEnterStart: collapseNode,
  onEnterActive: expandNode,
  onLeaveStart: expandNode,
  onLeaveActive: collapseNode,
};

const children1 = [
  <SubMenu title={<span>sub menu</span>} key="1">
    <MenuItem key="1-1">0-1</MenuItem>
    <MenuItem key="1-2">0-2</MenuItem>
  </SubMenu>,
  <MenuItem key="2">1</MenuItem>,
  <MenuItem key="3">outer</MenuItem>,
  <MenuItem key="5" disabled>
    disabled
  </MenuItem>,
  <MenuItem key="6">outer3</MenuItem>,
];

class CommonMenu extends React.Component {
  state = {
    children: children1,
    overflowIndicator: undefined,
  };

  handleClick = info => {
    console.log(`clicked ${info.key}`);
    console.log('info---', info);
  };

  render() {
    const { children } = this.state;

    return (
      <div>
        <Menu mode={this.props.mode}>{children}</Menu>
      </div>
    );
  }
}

CommonMenu.propTypes = {
  mode: PropTypes.string,
  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  motion: PropTypes.object,
  triggerSubMenuAction: PropTypes.string,
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
};

function Demo() {
  const horizontalMenu = (
    <CommonMenu mode="horizontal" openAnimation="slide-up" />
  );

  return (
    <div style={{ margin: 20 }}>
      <h2>antd menu</h2>
      <div>
        <h3>horizontal</h3>
        <div style={{ margin: 20 }}>{horizontalMenu}</div>
      </div>
    </div>
  );
}

export default Demo;
