/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { cloneElement, Component } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Picker } from 'react-native';
import { Button, } from 'react-native-elements';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../LayoutElements';

// import {} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// let formKeyCounter = 0;
class ResponsiveForm extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.formdata);
  }
  submitForm() {
    this.props.onSubmit(this.state);
  }
  componentWillUpdate(prevProps, prevState) {
    if (this.props.onChange) {
      this.props.onChange(prevState);
    }
  }
  render() {
    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      return (<RESPONSIVE_GRID key={i} columns={formgroup.layoutColumns || 2}>
        {formgroup.formElements.map((formElement, i) => {
          if (formElement.type === 'text' || formElement.type === 'textarea') {
            return (<GRID_ITEM key={i}
              description={formElement.label}
              >
              <TextInput {...formElement.passProps}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                multiline={(formElement.type==='textarea')?true:false}
                onChangeText={(text) => {
                  let updatedStateProp = {};
                  updatedStateProp[ formElement.name ] = text;
                  this.setState(updatedStateProp);
                } }
                value={formElement.value || this.state[formElement.name]} />
            </GRID_ITEM>);
          } else if (formElement.type === 'checkbox') {
            return (<GRID_ITEM key={i}
              description={formElement.label}
              >
              <Switch {...formElement.passProps}
                onValueChange={(value) => {
                  let updatedStateProp = {};
                  updatedStateProp[ formElement.name ] = value;
                  this.setState(updatedStateProp);
                } }
                // style={{marginBottom: 10}}
                value={formElement.value || this.state[formElement.name]} />
            </GRID_ITEM>);
          } else if (formElement.type === 'select') {
            return (<GRID_ITEM key={i}
              description={formElement.label}
              >
              <Picker
                selectedValue={this.state.language}
                onValueChange={(lang) => this.setState({language: lang})}>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </GRID_ITEM>);
          } else if (formElement.type === 'button') {
            return (<View key={i} style={{ padding:10, }}
              >
              <Button {...formElement.passProps}
                title={formElement.value}
                onPress={formElement.onPress} />
            </View>);
          } else if (formElement.type === 'submit') {
            return (<View key={i} style={{ padding:10, }}
              >
              <Button {...formElement.passProps}
                title={formElement.value}
                onPress={this.submitForm.bind(this)} />
            </View>);
          } else {
            return <View key={i} />;
          }
        })}
      </RESPONSIVE_GRID>);
    });
    return (<Animatable.View
      ref="view" style={[ {
        flex: 1,
        alignSelf: 'stretch',
      }, this.props.formStyle,
      ]}>
      {formGroupData}
    </Animatable.View>);
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate this.props.error', this.props.error);
    if (this.props.formerror) {
      switch (this.props.errorNotification) {
        case 'bounce':
          return this.refs.view.bounce(800);
        default:
          return this.refs.view.tada(800);
      }
    }
  }
}
export default ResponsiveForm;
