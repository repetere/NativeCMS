/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { cloneElement, Component } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Picker, Platform, Dimensions, } from 'react-native';
import { Button, } from 'react-native-elements';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, getGridMarginStyle, } from '../LayoutElements';
// let NativeSelect = (Platform.OS === 'web') ? {} : require('react-native-dropdown') ;
import ModalDropdown from 'react-native-modal-dropdown';


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
  _getOptionList(name) {
    return this.refs['OPTIONLIST'+name];
  }
  render() {
    let { width,  } = Dimensions.get('window');
    let twoColumnMargins = (width > 600) ? {
      left: {
        marginRight:40, 
      },
    } : {
      right: {
        marginLeft:40,
      },
    };
    function getGridMargins(formgroup, i) {
      return (formgroup.layoutColumns === 2)
        ?
        (i % 2 === 0) ? twoColumnMargins.left : twoColumnMargins.right
        : {};
    }

    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      return (<RESPONSIVE_GRID key={i} columns={formgroup.layoutColumns || 2}>
        {formgroup.formElements.map((formElement, i) => {
          if (formElement.type === 'text' || formElement.type === 'textarea') {
            return (<GRID_ITEM key={i}
              description={formElement.label}
              style={getGridMarginStyle({
                formgroup,
                i,
                width,
              })}
              gridItemContentStyle={{ borderTopWidth:0, }}
              >
              <TextInput {...formElement.passProps}
                style={{ minHeight: 40, borderColor: 'lightgrey', padding:5, borderWidth: 1, fontSize:16,  borderRadius:3, }} 
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
              style={getGridMargins(formgroup, i)}
              gridItemContentStyle={{ borderTopWidth:0, }}
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
              style={getGridMargins(formgroup, i)}
              gridItemContentStyle={{ borderTopWidth:0, }}
              >
              {(Platform.OS === 'web') ? (
                <Picker 
                  selectedValue={formElement.value}
                  onValueChange={(value) => {
                    let updatedStateProp = {};
                    updatedStateProp[ formElement.name ] = value;
                    this.setState(updatedStateProp);
                  } }>
                  {formElement.options.map(option => {
                    return (<Picker.Item label={option.label} value={option.value} />);
                  })}
                </Picker>
              ) : (
                  <ModalDropdown 
                    onSelect={(value) => {
                      let updatedStateProp = {};
                      updatedStateProp[ formElement.name ] = value;
                      this.setState(updatedStateProp);
                    }}
                    style={{
                      height: 40, borderColor: 'lightgrey', borderWidth: 1, justifyContent:'center',
                    }}
                    textStyle={{ justifyContent:'center', flex:1 }}
                    dropdownStyle={{
                      borderColor: 'gray', borderWidth: 1, flex: 1, alignSelf: 'stretch',
                    }}
                    options={formElement.options.map(option => option.value)} />
              )}
            </GRID_ITEM>);
          } else if (formElement.type === 'button') {
            return (<View key={i} style={{ padding:10, }}
              >
              <Button {...formElement.passProps}
                buttonStyle={{borderRadius:5, }}
                title={formElement.value}
                onPress={formElement.onPress} />
            </View>);
          } else if (formElement.type === 'submit') {
            return (<View key={i} style={{ padding:10, }}
              >
              <Button {...formElement.passProps}
                buttonStyle={{borderRadius:5, }}
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
