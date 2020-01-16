import React from 'react'; // eslint-disable-line
import { noop } from './util'; // eslint-disable-line
import { Provider, create } from 'mini-store';
import {
  RenderIconType,
  SelectInfo,
  SelectEventHandler,
  DestroyEventHandler,
  MenuMode,
  OpenEventHandler,
  OpenAnimation,
  MiniStore,
  BuiltinPlacements,
  TriggerSubMenuAction,
  MenuClickEventHandler,
  MotionType,
} from './interface';
import { getMotion } from './utils/legacyUtil';

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onSelect'> {
    defaultSelectedKeys?: string[];
    defaultActiveFirst?: boolean;
    selectedKeys?: string[];
    defaultOpenKeys?: string[];
    mode?: MenuMode;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    onClick?: MenuClickEventHandler;
    onSelect?: SelectEventHandler;
    onOpenChange?: OpenEventHandler;
    onDeselect?: SelectEventHandler;
    onDestory?: DestroyEventHandler;
    subMenuOpenDelay?: number;
    subMenuCloseDelay?: number;
    forceSubMenuRender?: boolean;
    triggerSubMenuAction?: TriggerSubMenuAction;
    level?: number;
    selectable?: boolean;
    multiple?: boolean;
    activeKey?: string;
    prefixCls: string;
    builtinPlacements?: BuiltinPlacements;
    itemIcon?: RenderIconType;
    expandIcon?: RenderIconType;
    overflowedIndicator?: React.ReactNode;
    motion?: MotionType;
    /** @deprecated please use `motion` instead */
    openTransitionName?: string;
    openAnimation?: OpenAnimation;
    direction?: 'ltr' | 'rtl'
  }

class Menu extends React.Component<MenuProps> {
  static defaultProps = {
    selectable: true,
    onClick: noop,
    onSelect: noop,
    onOpenChange: noop,
    onDeselect: noop,
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    subMenuOpenDelay: 0.1,
    subMenuCloseDelay: 0.1,
    triggerSubMenuAction: 'hover',
    prefixCls: 'tr-menu',
    className: '',
    mode: 'vertical',
    style: {},
    builtinPlacements: {},
    overflowedIndicator: <span>...</span>,
  }

  constructor(props: MenuProps) {
    super(props)

    this.isRootMenu = true
    
    let selectedKeys = props.defaultSelectedKeys;
    let openKeys = props.defaultOpenKeys;
    if ('selectedKeys' in props) {
      selectedKeys = props.selectedKeys || []
    }
    if ('openKeys' in props) {
      openKeys = props.openKeys || []
    }

    this.store = create({
      selectedKeys,
      openKeys,
      activeKey: { '0-menu-': getActiveKey(props, props.activeKey) }
    })
  }

  isRootMenu: boolean;
  store: MiniStore;

  innerMenu: typeof SubPopupMenu;

  componentDidMount() {
    this.updateMiniStore()
  }

  componentDidUpdate() {
    this.updateMiniStore()
  }

  onSelect = ( selectInfo: SelectInfo ) => {
    const { props } = this;
    if (props.selectable) {
      // root menu
      let { selectedKeys } = this.store.getState();
      const selectedKey = selectInfo.key;
      if (props.multiple) {
        selectedKeys = selectedKeys.concat([selectedKey])
      } else {
        selectedKeys = [selectedKey]
      }
      if (!('selectedKeys' in props)) {
        this.store.setState({
          selectedKeys
        })
      }
      props.onSelect({
        ...selectInfo,
        selectedKeys,
      })
    }
  };

  onClick: MenuClickEventHandler = e => {
    this.props.onClick(e)
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLElement>, callback) => {
    this.innerMenu.getWrappedInstance().onKeyDown(e, callback)
  }
  onOpenChange = event => {
    const { props } = this
    const openKeys = this.store.getState().openKeys.concat();
    let changed = false;
    const processSingle = e => {
      let oneChanged = false;
      if (e.open) {
        oneChanged = openKeys.indexOf(e.key) === -1;
        if (oneChanged) {
          openKeys.push(e.key)
        }
      } else {
        const index = openKeys.indexOf(e.key);
        oneChanged = index !== -1;
        if (oneChanged) {
          openKeys.splice(index, 1)
        }
      }
      changed = changed || oneChanged
    }
    if (Array.isArray(event)) {
      // batch change all
      event.forEach(processSingle)
    } else {
      processSingle(event)
    }
    if (changed) {
      if (!('openKeys' in this.props)) {
        this.store.setState({ openKeys })
      }
      props.onOpenChange(openKeys)
    }
  }

  onDeselect = (selectInfo: SelectInfo) => {
    const { props } = this
    if (props.selectable) {
      const selectedKeys = this.store.getState().selectedKeys.concat();
      const selectedKey = selectInfo.key
      const index = selectedKeys.indexOf(selectedKey)
      if (index !== -1) {
        selectedKeys.splice(index, 1)
      }
      if (!('selectedKeys' in props)) {
        this.store.setState({
          selectedKeys
        })
      }
      props.onDeselect({
        ...selectInfo,
        selectedKeys,
      })
    }
  }

  getOpenTransitionName = () => {
    const { props } = this
    let transitionName = props.openTransitionName
    const animationName = props.openAnimation
    if (!transitionName && typeof animationName === 'string') {
      transitionName = `${props.profixCls}-open-${animationName}`
    }
    return transitionName;
  }

  setInnerMenu = node => {
    this.innerMenu = node
  }

  updateMiniStore() {
    if ('selectedKeys' in this.props) {
      this.store.setState({
        selectedKeys: this.props.selectedKeys || []
      })
    }
    if ('openKeys' in this.props) {
      this.store.setState({
        openKeys: this.props.openKeys || []
      })
    }
  }

  render() {
    let props: MenuProps & { parentMenu?: Menu } = {...this.props}
    props.className += ` ${props.prefixCls}-root`;
    if (props.direction === 'rtl') {
      props.className += ` ${props.prefixCls}-rtl`
    }
    props = {
      ...props,
      onClick: this.onClick,
      onOpenChange: this.onOpenChange,
      onDeselect: this.onDeselect,
      onSelect: this.onSelect,
      parentMenu: this,
      motion: getMotion(this.props)
    }
    delete props.openAnimation
    delete props.openTransitionName

    return (
      <Provider store={this.store}>
        <SubPopupMenu {...props} ref={this.setInnerMenu}>
          {this.props.children}
        </SubPopupMenu>
      </Provider>
    )
  }
}

export default Menu;