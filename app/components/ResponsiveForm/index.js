/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { cloneElement, Component } from 'react';
import { StyleSheet, View, Text, TextInput, Switch, Picker, Platform, Dimensions, TouchableOpacity, } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, getGridMarginStyle, } from '../LayoutElements';
// let NativeSelect = (Platform.OS === 'web') ? {} : require('react-native-dropdown') ;
import Icons from '../Icons';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Animatable from 'react-native-animatable';

function getPropertyAttribute(options) {
  let { property, element } = options;
  let attribute = element.name;
  let selector = element.idSelector;
  // console.log({ options });
  let returnVal; 
  if (attribute.indexOf('.') === -1) {
    returnVal = property[ attribute ];
  } else {
    let attrArray = attribute.split('.');
    returnVal = property[ attrArray[ 0 ] ][ attrArray[ 1 ] ];
  }
  
  if (selector && !options.skipSelector) {
    return returnVal[ selector ]; 
  } else {
    return returnVal;
  }
}

function getFormTextInputArea(options) {
  let { formElement, i, formgroup, width, } = options;
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
}

function getFormCheckbox(options) {
  let { formElement, i, formgroup, width, } = options;
  return (<GRID_ITEM key={i}
    description={formElement.label}
    style={getGridMarginStyle({
      formgroup,
      i,
      width,
    })}
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
}

function getFormSelect(options) {
  let { formElement, i, formgroup, width, } = options;
  return (<GRID_ITEM key={i}
    description={formElement.label}
    style={getGridMarginStyle({
      formgroup,
      i,
      width,
    })}
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
          } }
          defaultValue={formElement.value}
          style={{
            height: 40, borderColor: 'lightgrey', borderWidth: 1, justifyContent: 'center', borderRadius: 3,
            padding:5,
          }}
          textStyle={{ justifyContent:'center', flex:1 }}
          dropdownStyle={{
            borderColor: 'gray', borderWidth: 1, minWidth:300, alignItems:'stretch', alignSelf: 'stretch',
          }}
          options={formElement.options.map(option => option.value)} />
    )}
  </GRID_ITEM>);
}

function getFormButton(options) {
  let { formElement, i, formgroup, width, } = options;
  return (<View key={i} style={{ padding:10, }} >
    <Button {...formElement.passProps}
      buttonStyle={{ borderRadius:5, }}
      title={formElement.value}
      onPress={formElement.onPress} />
  </View>);
}

function getFormSubmit(options) {
  let { formElement, i, formgroup, width, } = options;
  return (<View key={i} style={{ padding:10, }} >
    <Button {...formElement.passProps}
      buttonStyle={{borderRadius:5, }}
      title={formElement.value}
      onPress={this.submitForm.bind(this)} />
  </View>);
}

class FromTag extends Component{
  render() {
    let childComponents = (this.props.document)
      ? (
        <Text>{this.props.document.title}</Text>
      )
      : this.props.children;
    
    return (childComponents) ? (<TouchableOpacity  {...this.props.button}>
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10 }} {...this.props.container}>
        <Icons style={{marginRight:10}} size={24}
          {...this.props.icon}
          ></Icons>
        {childComponents}
      </View>
    </TouchableOpacity>) : null;
  }
}

function getFormDatalist(options) {
  let { formElement, i, formgroup, width, } = options;
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
      // value={formElement.value || getPropertyAttribute({
      //   property: this.state, element: formElement,
      // })}
      />
    <View style={{ flexDirection: 'row', }}>
      {(!formElement.mutli) ? (<FromTag
          icon={{
            name: 'ios-close', 
          }}
          button={{
            onPress: this.setFormSingleProp.bind(this, {
              attribute: formElement.name,
              value: undefined,
            }),
          }}  
          document={getPropertyAttribute({
            property: this.state, element: formElement, skipSelector:true,
          })}
          />)
        : null
      }
    </View>
  </GRID_ITEM>);
}

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
  removeFormSingleProp(options) {
    let { value, attribute, } = options;
    console.log('remove prop form state', { value, attribute, });
  }
  setFormSingleProp(options) {
    let { value, attribute, } = options;
    let updatedStateProp = {};
    console.log('setFormSingleProp prop form state', { value, attribute, });

    if (attribute.indexOf('.') === -1) {
      updatedStateProp[ attribute ] = value;
      this.setState(updatedStateProp);
    } else {
      let attrArray = attribute.split('.');
      let stateToSet = Object.assign({}, this.state[ attrArray[ 0 ] ]);
      stateToSet[attrArray[1]]=value;
      this.setState({ [attrArray[0]] : stateToSet, });
    }
  }
  render() {
    let { width,  } = Dimensions.get('window');

    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      return (<RESPONSIVE_GRID key={i} columns={formgroup.layoutColumns || 2}>
        {formgroup.formElements.map((formElement, i) => {
          if (formElement.type === 'text' || formElement.type === 'textarea') {
            return getFormTextInputArea.call(this, { formElement, i, formgroup, width, });
          } else if (formElement.type === 'checkbox') {
            return getFormCheckbox.call(this, { formElement, i, formgroup, width, });
          } else if (formElement.type === 'select') {
            return getFormSelect.call(this, { formElement, i, formgroup, width, });
          } else if (formElement.type === 'button') {
            return getFormButton.call(this, { formElement, i, formgroup, width, });
          } else if (formElement.type === 'submit') {
            return getFormSubmit.call(this, { formElement, i, formgroup, width, });
          } else if (formElement.type === 'datalist') {
            return getFormDatalist.call(this, { formElement, i, formgroup, width, });
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
exports.getFormTextInputArea = getFormTextInputArea;
exports.getFormCheckbox = getFormCheckbox;
exports.getFormSelect = getFormSelect;
exports.getFormButton = getFormButton;
exports.getFormSubmit = getFormSubmit;
exports.getFormDatalist = getFormDatalist;
