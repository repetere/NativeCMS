/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { cloneElement, Component } from 'react';
import ReactNative, {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  ListView,
  Switch,
} from 'react-native';
import styles from '../../components/Styles/shared';
import Form from '../../components/Form';
import {
  Button,
  List,
  ListItem,
  FormLabel,
  FormInput,
  CheckBox,
  // Card, SocialIcon, ListView, PricingCard
} from 'react-native-elements';
// http://browniefed.com/blog/react-native-layout-examples/
// https://medium.com/the-react-native-log/understanding-react-native-flexbox-layout-7a528200afd4#.noes46i4m
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'column',
      // paddingTop: 20,
    },
    halfHeight: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
      backgroundColor: '#FF3366'
    },
    quarterHeight: {
        flex: 1,
        backgroundColor: '#000'
    },
    blueBackground: {
      backgroundColor:'steelblue',
    },
    bluelightBackground: {
      backgroundColor:'aliceblue',
    },
    formGroup: {
      flex:1,
    },
});


class Login extends Component {
  constructor(){
    super(...arguments);
  }
  render() {
    console.log('this.props.loginUser',this.props.loginUser);
    return (
      <View style={[loginStyles.container, { flexDirection: 'column', }]}>
        <View style={[loginStyles.halfHeight, loginStyles.blueBackground, ]}>
          <Text>login</Text>
        </View>
        <View style={[ loginStyles.halfHeight, loginStyles.bluelightBackground, ]}>
          <Form submitFunction={this.props.loginUser} formElements={[
            <FormLabel>Email / Username</FormLabel>,
            <FormInput name="username" placeholder="Please enter your username or email" selectTextOnFocus="true" formTextChange="true" />,
            <FormLabel>Password</FormLabel>,
            <FormInput name="password" placeholder="Please enter your Password" secureTextEntry="true"  formTextChange="true"/>,
            // <Switch
            //   // onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
            //   formSwitchChange="true"
            //   name="rememberme"
            //   // style={{marginBottom: 10}}
            //   value={false}
            //   />,
            <Button title="Login" submitOnPress="true" />,
          ]}/>
        </View>
      </View>
    );
  }
}

export default Login;