import React from 'react';
import Menu, { Item as MenuItem, ItemGroup as MenuItemGroup } from '../src';
import '../assets/index.less';

export default () => (
  <div>
    <h2>menu item group</h2>
    <Menu style={{ margin: 20, width: 300 }}>
      <MenuItemGroup title="group 1" key="1">
        <div style={{ padding: 16 }}>hello world</div>
      </MenuItemGroup>
      <MenuItemGroup title="group 2" key="2">
        <MenuItem key="2-1">twitter</MenuItem>
        <MenuItem key="2-2">facebook</MenuItem>
      </MenuItemGroup>
    </Menu>
  </div>
);
