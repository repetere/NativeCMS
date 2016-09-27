import {
  StyleSheet,
  Platform,
} from 'react-native';

let webFixes = (Platform.OS === 'web') ? {
  heading: {
   
  },
  scrollViewStandardContainer: {
   
  },
} : {};



const styles = StyleSheet.create(Object.assign({
  h1: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth || 1,
    paddingTop: 1,
    bottom:1,
  },
  layoutContentTitleContainer: {
    flexDirection: 'row',
    // flex:0,
  },
  layoutContentContainer: {
    padding:10,
  },
  layoutTab: {
    flex:1, flexDirection: 'row', justifyContent:'flex-start', position:'relative', bottom:0, left:0, height:35,
  },
  layoutTabIconStyle: {
    alignSelf: 'flex-start',
    flex: 0,
    bottom: -7,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    height:35,
  },
  layoutTabSelectedIconStyle: {
    color: 'red',
    // borderBottomColor: 'red', lineHeight: 10, borderBottomWidth: 5, bottom: 3, 
  },
}, webFixes));

export default styles;
