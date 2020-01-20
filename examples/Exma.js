import React, { PureComponent } from 'react';
import Menu, { SubMenu, Item as MenuItem } from '../src';
import '../assets/index.less';

class App extends PureComponent {
  onClick = info => {
    console.log('click---info', info); // eslint-disable-line
  };

  getMenu() {
    return (
      <Menu onClick={this.onClick} mode="inline">
        <SubMenu key="1" title="submenu1">
          <MenuItem key="1-1">item1-1</MenuItem>
          <MenuItem key="1-2">item1-2</MenuItem>
        </SubMenu>
        <SubMenu key="2" title="submenu2">
          <MenuItem key="2-1">item2-1</MenuItem>
          <MenuItem key="2-2">item2-2</MenuItem>
        </SubMenu>
        <MenuItem key="3">item3</MenuItem>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <div>THIS IS EXAM</div>
        <div style={{ width: 400 }}>{this.getMenu()}</div>
      </div>
    );
  }
}

export default App;
