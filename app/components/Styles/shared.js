import {
  StyleSheet,
  Platform,
} from 'react-native';

let webFixes = (Platform.OS === 'web') ? {
  scrollViewWrapperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'auto',
    display: 'block',
  },
  scrollViewStandardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    padding: 8,
    overflow: 'auto',
    display: 'block',
  },
} : {};

const styles = StyleSheet.create(Object.assign({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollViewStandardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    padding: 8,
  },
  scrollViewStandardContentContainer: {
    paddingVertical: 20,
    position: 'relative',
    marginBottom: 60,
  },
  scrollViewWrapperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 60,
  },
  statusBarPadding: {
    paddingTop:20
  },
  appContainer: {
    flex: 1,
    paddingTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexBox: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'black',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBar:{
    backgroundColor:'whitesmoke',
    borderTopWidth:1,
    borderTopColor:'lightgray',
    height:60,
  },
  tabBarText:{
    fontSize:12,
  },
},webFixes));

export default styles;
