import capitalize from 'capitalize';

export function getComponentFromRouterLocation(location) {
  let locationArray = location.split('/');
  let appName = (locationArray[ 0 ].length > 0) ? locationArray[ 0 ] : locationArray[ 1 ];
  return capitalize(appName);
} 

export function getTabFromLocation (extensions, location) {
  if (!location) {
    return 'home';
  } else if (extensions[ location ]) {
    return location.toLowerCase();
  } else {
    return 'home';
  }
}
