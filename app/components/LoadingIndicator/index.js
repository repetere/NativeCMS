import { ActivityIndicator, ActivityIndicatorIOS, Platform, } from 'react-native';
const LoadingIndicators = (Platform.OS === 'web') ? ActivityIndicatorIOS : ActivityIndicator;

export default LoadingIndicators;