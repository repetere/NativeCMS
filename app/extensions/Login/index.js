/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  ListView,
} from 'react-native';
import styles from '../../components/Styles/shared';
import {
  Button,
  List,
  ListItem,
  // Card, SocialIcon, ListView, PricingCard
} from 'react-native-elements';
// http://browniefed.com/blog/react-native-layout-examples/
// https://medium.com/the-react-native-log/understanding-react-native-flexbox-layout-7a528200afd4#.noes46i4m

var loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'column',
      // paddingTop: 20,
    },
    halfHeight: {
      alignItems: 'center',
      flex: 2,
      backgroundColor: '#FF3366'
    },
    quarterHeight: {
        flex: 1,
        backgroundColor: '#000'
    }
});


class Login extends Component {
  constructor(){
    super(...arguments);
  }
  render() {
      console.log('Login list view')
    return (
      <View style={[loginStyles.container,{flexDirection: 'column'}]}>
        <View style={loginStyles.halfHeight}>
          <Text>login</Text>
        </View>
          <View style={loginStyles.quarterHeight} />
          <View style={[loginStyles.quarterHeight, {backgroundColor: '#CCC'}]} />
      </View>
    );
  }
}

export default Login;