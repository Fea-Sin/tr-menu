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

/**
 * popupOffset {[x, y]}
 * x: 横向距离
 * y: 纵向距离
 */

const nestSubMenu = (
  <SubMenu
    title={<span>offset sub menu 2</span>}
    key="4"
    // popupOffset={[10, 15]}
  >
    <MenuItem key="4-1">inner inner</MenuItem>
    <SubMenu key="4-2" title={<span>sub menu</span>}>
      <MenuItem key="4-2-1">hello</MenuItem>
      <MenuItem key="4-2-2">world</MenuItem>
    </SubMenu>
  </SubMenu>
);

const children1 = [
  <SubMenu title={<span>sub menu</span>} key="1">
    <MenuItem key="1-1">0-1</MenuItem>
    <MenuItem key="1-2">0-2</MenuItem>
  </SubMenu>,
  <MenuItem key="2">1</MenuItem>,
  nestSubMenu,
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
  handleOpenChange = value => {
    console.log('onOpenchange', value);
  };

  render() {
    const { triggerSubMenuAction } = this.props;
    const { children } = this.state;

    return (
      <div>
        <Menu
          mode={this.props.mode}
          onClick={this.handleClick}
          motion={this.props.motion}
          onOpenChange={this.handleOpenChange}
          triggerSubMenuAction={triggerSubMenuAction}
        >
          {children}
        </Menu>
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

  const horizontalMenu2 = (
    <CommonMenu
      mode="horizontal"
      openAnimation="slide-up"
      triggerSubMenuAction="click"
    />
  );

  const verticalMenu = <CommonMenu mode="vertical" openAnimation="slide-up" />;

  const inlineMenu = <CommonMenu mode="inline" />;

  return (
    <div style={{ margin: 20 }}>
      <h2>antd menu</h2>
      <div>
        <h3>horizontal</h3>
        <div style={{ margin: 20 }}>{horizontalMenu}</div>
        <h3>horizontal and click</h3>
        <div style={{ margin: 20 }}>{horizontalMenu2}</div>
        <h3>vertical</h3>
        <div style={{ margin: 20, width: 200 }}>{verticalMenu}</div>
        <h3>inline</h3>
        <div style={{ margin: 20, width: 200 }}>{inlineMenu}</div>
      </div>
    </div>
  );
}

export default Demo;
