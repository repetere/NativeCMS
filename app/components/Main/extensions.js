import Apps from '../../extensions/Apps';
import Home from '../../extensions/Home';
import More from '../../extensions/More';
import Notifications from '../../extensions/Notifications';
import Profile from '../../extensions/Profile';
import Settings from '../../extensions/Settings';
import Login from '../../extensions/Login';
import custom_standard_extensions from '../../../content/config/custom_standard_extensions';

let Extensions = {
  Apps: custom_standard_extensions.Apps || Apps,
  Home: custom_standard_extensions.Home || Home,
  More: custom_standard_extensions.More || More,
  Notifications: custom_standard_extensions.Notifications || Notifications,
  Profile: custom_standard_extensions.Profile || Profile,
  Settings: custom_standard_extensions.Settings || Settings,
  Login: custom_standard_extensions.Login || Login,
};

export default Extensions;