import React from 'react';
import ReactDOM from 'react-dom';
import KeyCode from 'rc-util/lib/KeyCode';
import classNames from 'classnames';
import scrollIntoView from 'scroll-into-view-if-needed';
import { connect } from 'mini-store';
import { noop, menuAllProps } from './util';
import {
  SelectEventHandler,
  HoverEventHandler,
  DestroyEventHandler,
  RenderIconType,
  MenuHoverEventHandler,
  MenuClickEventHandler,
  MenuMode,
  LegacyFunctionRef,
} from './interface';

export interface MenuItemProps {
  /** @deprecated No place to use this should remove */
  attribute?: Record<string, string>;
  rootPrefixCls?: string;
  eventKey?: React.key;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  children?: React.ReactNode;
  selectedKeys?: string[];
  disabled?: boolean;
  title?: string;
  onItemHover?: HoverEventHandler;
  onSelect?: SelectEventHandler;
  onClick?: MenuClickEventHandler;
  onDeselect?: SelectEventHandler;
  parentMenu?: React.ReactInstance;
  onDestory?: DestroyEventHandler;
  onMouseEnter?: MenuHoverEventHandler;
  onMouseLeave?: MenuHoverEventHandler;
  multiple?: boolean;
  isSelected?: boolean;
  manualRef?: LegacyFunctionRef;
  itemIcon?: RenderIconType;
  role?: string;
  inlineIndent?: number;
  level?: number;
  direction?: 'ltr' | 'rtl'; 
}

export class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = true;

  static defaultProps = {
    onSelect: noop,
    onMouseEnter: noop;
    onMouseLeave: noop;
    manualRef: noop;
  }
  node: HTMLLIElement;

  componentDidMount() {
    // invoke customized ref to expose component to mixin
    this.callRef()
  }
  componentDidUpdate(prevProps: MenuItemProps) {
    const { active, parentMenu, eventKey } = this.props;
    // 在 parentMenu 上层保存滚动状态，避免重复的 MenuItem key 导致滚动跳动
    if (
      !prevProps.active &&
      active &&
      (!parentMenu || !parentMenu[`scrolled-${eventKey}`])
    ) {
      if (this.node) {
        scrollIntoView(this.node, {
          scrollMode: 'if-needed',
          boundary: ReactDOM.findDOMNode(parentMenu) as Element,
          block: 'nearest'
        })
        parentMenu[`scrolled-${eventKey}`]
      }
    } else if (parentMenu && parentMenu[`scrolled-${eventKey}`]) {
      delete parentMenu[`scrolled-${eventKey}`]
    }
    this.callRef()
  }
  componentWillUnmount() {
    const { props } = this;
    if (props.onDestory) {
      props.onDestory(props.eventKey)
    }
  }

  public onKeyDown = (
    e: React.KeyboardEvent<HTMLElement>
  ): boolean | undefined => {
    const { keyCode } = e;
    if (keyCode === keyCode.ENTER) {
      this.onClick(e as any)
      return true;
    }
    return undefined;
  }

  onMouseLeave: React.MouseEventHandler<HTMLElement> = e => {
    const { eventKey, onItemHover, onMouseEnter } = this.props
    onItemHover({
      key: eventKey,
      hover: false
    })
    onMouseLeave({
      key: eventKey,
      domEvent: e,
    })
  }

  onMouseEnter: React.MouseEventHandler<HTMLElement> = e => {
    const { eventKey, onItemHover, onMouseEnter } = this.props
    onItemHover({
      key: eventKey,
      hover: true,
    })
    onMouseEnter({
      key: eventKey,
      domEvent: e,
    })
  }

  onClick: React.MouseEventHandler<HTMLElement> = e => {
    const {
      eventKey,
      multiple,
      onClick,
      onSelect,
      onDeselect,
      isSelected,
    } = this.props
    const info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e,
    }
    onClick(info)
    if (multiple) {
      if (isSelected) {
        onDeselect(info)
      } else {
        onSelect(info)
      }
    } else if (!isSelected) {
      onSelect(info)
    }
  }

  getPrefixCls() {
    return `${this.props.rootPrefixCls}-item`;
  }
  getActiveClassName() {
    return `${this.getPrefixCls()}-active`;
  }
  getselectedClassName() {
    return `${this.getPrefixCls()}-selected`;
  }
  getDisabledClassName() {
    return `${this.getPrefixCls()}-disabled`;
  }

  saveNode = (node: HTMLElement) => {
    this.node = node;
  }

  callRef() {
    if (this.props.manualRef) {
      this.props.manualRef(this)
    }
  }

  render() {
    const props = {...this.props}
    const className = classNames(this.getPrefixCls(), props.className, {
      [this.getActiveClassName()]: !props.disabled && props.active,
      [this.getselectedClassName()]: props.isSelected,
      [this.getDisabledClassName()]: props.disabled,
    })
    let attrs: {
      title?: string;
      className?: string;
      role?: string;
      'aria-disabled'?: boolean;
      'aria-selected'?: boolean;
    } = {
      ...props.attribute,
      title: props.title,
      className,
      // set to menuitem by default
      role: props.role || 'menuitem',
      'aria-disabled': props.disabled,
    }

    if (props.role === 'option') {
      attrs = {
        ...attrs,
        role: 'option',
        'aria-selected': props.isSelected
      }
    } else if (props.role === null || props.role === 'node') {
      attrs.role = 'node'
    }

    const mouseEvent = {
      onClick: props.disabled ? null : this.onClick,
      onMouseLeave: props.disabled ? null : this.onMouseLeave,
      onMouseEnter: props.disabled ? null : this.onMouseEnter,
    }

    const style = {
      ...props.style,
    }
    if (props.mode === 'inline') {
      if (props.direction === 'rtl') {
        style.paddingRight = props.inlineIndent * props.level
      } else {
        style.paddingLeft = props.inlineIndent * props.level
      }
    }
    menuAllProps.forEach(key => delete props[key])
    delete props.direction
    let icon = this.props.itemIcon
    if (typeof this.props.itemIcon === 'function') {
      icon = React.createElement(this.props.itemIcon as any, this.props)
    }
    return (
      <li
        {...(props as any)}
        {...attrs}
        {...mouseEvent}
        style={style}
        ref={this.saveNode}
      >
        {props.children}
        {icon}
      </li>
    )
  }
}

const connected = connect(
  ({ activeKey, selectedKeys }, { eventKey, subMenuKey }) => ({
    active: activeKey[subMenuKey] === eventKey,
    isSelected: selectedKeys.indexOf(eventKey) !== -1
  })
)(MenuItem)

export default connected;
