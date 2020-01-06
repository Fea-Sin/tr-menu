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
