## tr-menu

menu ui component for react

## Menu props

className: additional css class of root dom node
-> Sting

mode: one of ['horizontal', 'inline', 'vertical-left', 'vertical-right']
-> String

activeKey: inital and current active menu item's key
-> Object

defaultActiveFirst: whether active first active mneu item when show if activeKeys is not set or invalid
-> Boolean

multiple: whether allow multiple select
-> Boolean

selectable: allow selecting menu items
-> Boolean

defaultSelectedKeys: inital selected keys of items
-> String[]

openKeys: open keys of items
-> String[]

defaultOpenKeys: initial open keys of SubMenuItem
-> String[]

onSelect: called when select a menu item
-> function

onClick: called when click a menu item
-> function

onOpenChange: called when open/close sub menu
-> function

onDeselect: called when deselect a menu item, only called when multiple
-> function

triggerSubMenuAction: Enum{ hover, click }

openAnimaton: animate when sub menu open or close

openTransition: css transitionName when sub menu open or close

subMenuOpenDelay: delay time to show popup sub menu

subMenuCloseDelay: delay time to hide popup sub menu

forceSubMenuRender: whether to render submenu even if it is not visible

getPopupContainer: where to render the DOM node if popup menu when the mode is horizontal or vertical
function(menuDOMNode):HTMLElement  () => document.body

builtinPlacements: object of alignConfigs for dom-align

itemIcon: 

expandIcon:

direction: Layout direction of menu component, it supports RTL direction too

## Menu.Item props

className: additional css class of root dom node

disable: no effect for click orkeydown for this item

key: correstponding to activeKey

onMouseEnter: Function({eventKey, domEvent})

onMoseLeave: Function({eventKey, domEvent})

itemIcon: Specify the menu item icon

## Menu.SubMenu props

popupClassName: additional css class of root dom node

title: sub menu's content

overflowedIndicator: overflow indicator when menu overflows in horizontal mode

key: Object corresponding to activeKey

disabled: no effect for click or keydown for this item

onMouseEnter: Function({eventKey, domEvent})

onMouseLeave: Function({eventKey, domEvent})

onTitleMouseEnter: Function({eventKey, domEvent})

onTitleMouseLeave: Function({eventKey, domEvent}

onTitleClick: Function({eventKey, domEvent})

popupOffset: Array; The offset of the popup submenu, [0, 15]

expandIcon: ReactNode; Specify the menu icon

itemIcon: Specify the menu item icon
