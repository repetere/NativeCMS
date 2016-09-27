import Apps from '../../extensions/Apps';
import Home from '../../extensions/Home';
import More from '../../extensions/More';
import Notifications from '../../extensions/Notifications';
import Profile from '../../extensions/Profile';
import Settings from '../../extensions/Settings';
import Login from '../../extensions/Login';
import custom_standard_extensions from '../../../content/config/custom_standard_extensions';

let Extensions = Object.assign({
  Apps,
  Home,
  More,
  Notifications,
  Profile,
  Settings,
  Login,
}, custom_standard_extensions);

export default Extensions;