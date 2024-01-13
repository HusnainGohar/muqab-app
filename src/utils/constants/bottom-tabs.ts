import { IconNames } from '@ant-design/react-native/lib/icon';
import { Home, Inbox, Profile, Shop } from '../../screens/general';
import {
  homeScreen,
  inboxScreen,
  profileScreen,
  shopScreen,
} from './route-names';
import { TabParamList } from '../../routes';

interface BottomTabProps {
  name: keyof TabParamList;
  component: any;
  label: string;
  icon: IconNames;
}

export const bottomTabs: BottomTabProps[] = [
  { name: homeScreen, component: Home, label: 'Home', icon: 'dashboard' },
  { name: shopScreen, component: Shop, label: 'Shop', icon: 'shopping-cart' },
  { name: inboxScreen, component: Inbox, label: 'Inbox', icon: 'message' },
  { name: profileScreen, component: Profile, label: 'Profile', icon: 'user' },
];
