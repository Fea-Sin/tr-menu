import { TransitionNameType, MotionType } from 'rc-trigger/lib/interface'; // eslint-disable-line

export type RenderIconType =
  | React.ReactNode
  | ((props: any) => React.ReactNode);

export interface MenuInfo {
  key: React.key;
  keyPath: React.key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

export interface SelectInfo extends MenuInfo {
  selectedKeys?: React.key[];
}

export type SelectEventHandler = (info: SelectInfo) => void;

export type HoverEventHandler = (info: {
  key: React.key;
  hover: boolean;
}) => void;

export type MenuHoverEventHandler = (info: {
  key: React.key;
  domEvent: React.MouseEvent<HTMLElement>;
}) => void;

export type MenuClickEventHandler = (info: MenuInfo) => void;

export type DestroyEventHandler = (key: React.key) => void;

export type OpenEventHandler = (
  keys:
    | React.key[]
    | {
        key: React.key;
        item: React.ReactInstance;
        trigger: string;
        open: boolean;
      },
) => void;

export type MenuMode =
  | 'horizontal'
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'inline';

export type OpenAnimation = string | Record<string, any>;

export interface MiniStore {
  getState: () => any;
  setState: (state: any) => void;
}

export type LegacyFunctionRef = (node: React.ReactInstance) => void;

export type BuiltinPlacements = Record<string, any>;

export type TriggerSubMenuAction = 'click' | 'hover';

export { TransitionNameType, MotionType };
