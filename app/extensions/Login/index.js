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


class Form extends Component{
  constructor() {
    super(...arguments);
    this.state = {
    };
    console.log('this.props', this.props);
  }
  onSubmit() {
    console.log('submitting form props', this.props);
    console.log('form this.state', this.state);
  }
  onChangeText(name, text) {
    // console.log('name, text', name, text);
    this.setState((previousState, currentProps) => {
      let newState = previousState;
      newState[ name ] = text;
      return newState;
    });    
  }
  onValueChange(name, value) {
    console.log('name, value', name, value);
    this.setState((previousState, currentProps) => {
      let newState = previousState;
      newState[ name ] = value;
      return newState;
    });    
  }
  render() {
    let FormData = this.props.formElements.map((formElement, i) => {
      console.log('formElement', formElement);
      let formDataProps = { key: i, };
      if (formElement.props.submitOnPress) {
        formDataProps.onPress = this.onSubmit.bind(this);
      }
      if (formElement.props.formTextChange) {
        formDataProps.onChangeText = this.onChangeText.bind(this, formElement.props.name);
      }
      if (formElement.props.formSwitchChange) {
        formDataProps.onValueChange = this.onValueChange.bind(this, formElement.props.name);
        formDataProps.value = this.state[ formElement.props.name ];
      }
      let bindedElement = cloneElement(formElement, formDataProps);
      return (bindedElement);
    });
    console.log('this.state', this.state );
    return (
      <View style={[{
        flex: 1,
        alignSelf: 'stretch',
      }, this.props.formStyle,
      ]}>
        <Text>Form</Text>
        {FormData}
      </View>
    );
  }
}

class Login extends Component {
  constructor(){
    super(...arguments);
  }
  render() {
    // console.log('Login list view');
    return (
      <View style={[loginStyles.container, { flexDirection: 'column', }]}>
        <View style={[loginStyles.halfHeight, loginStyles.blueBackground, ]}>
          <Text>login</Text>
        </View>
        <View style={[ loginStyles.halfHeight, loginStyles.bluelightBackground, ]}>
          <Form formElements={[
            <FormLabel>Email / Username</FormLabel>,
            <FormInput name="username" placeholder="Please enter your username or email" selectTextOnFocus="true" formTextChange="true" />,
            <FormLabel>Password</FormLabel>,
            <FormInput name="password" placeholder="Please enter your Password" secureTextEntry="true"  formTextChange="true"/>,
            <Switch
              // onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              formSwitchChange="true"
              name="rememberme"
              // style={{marginBottom: 10}}
              value={false}
              />,
            <Button title="Login" submitOnPress="true" />,
          ]}/>
        </View>
      </View>
    );
  }
}

export default Login;