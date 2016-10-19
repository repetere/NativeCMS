/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { cloneElement, Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Switch, Picker, Platform, Dimensions, TouchableOpacity, ListView, } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, getGridMarginStyle, } from '../LayoutElements';
// let NativeSelect = (Platform.OS === 'web') ? {} : require('react-native-dropdown') ;
import Icons from '../Icons';
import Table from '../Table';
import debounce from 'debounce';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Animatable from 'react-native-animatable';
import layoutStyles from '../Styles/layout';
import styles from '../Styles/shared';
import { request, } from '../../util/request';
import querystring from 'querystring';

function getDataSource() {
  return new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });
}

function getDataListStateFromProps(props) {
  let dataArray = (props && props.length > 10) ? props.slice(0, 9) : props;
  // console.log('getListStateFromProps', { props });
  let ds = getDataSource();
  return {
    pages: 1,
    rows: ds.cloneWithRows(Object.assign([], dataArray)),
    rowscount: (dataArray) ? dataArray.length : 0,
    totalcount: (dataArray) ? dataArray.length : 0,
  };
}

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
    returnVal = (property[ attrArray[ 0 ] ])? property[ attrArray[ 0 ] ][ attrArray[ 1 ] ]:undefined;
  }
  
  if (selector && !options.skipSelector) {
    return returnVal[ selector ]; 
  } else {
    return returnVal;
  }
}

function getFormTextInputArea(options) {
  let { formElement, i, formgroup, width, } = options;
  // console.log(this.state, { formElement })
  let initialValue = formElement.value || this.state[ formElement.name ];
  if (typeof initialValue !== 'string') {
    initialValue = JSON.stringify(initialValue, null, 2);
  }
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
      style={{ minHeight: (formElement.type==='textarea')?80:40, borderColor: 'lightgrey', padding:5, borderWidth: 1, fontSize:16,  borderRadius:3, }} 
      multiline={(formElement.type==='textarea')?true:false}
      onChangeText={(text) => {
        let updatedStateProp = {};
        updatedStateProp[ formElement.name ] = text;
        this.setState(updatedStateProp);
      } }
      value={initialValue} />
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
            updatedStateProp[ formElement.name ] = formElement.options[value].value;
            this.setState(updatedStateProp);
          } }
          defaultValue={this.state[formElement.name] || formElement.value}
          style={{
            height: 40, borderColor: 'lightgrey', borderWidth: 1, justifyContent: 'center', borderRadius: 3,
            padding:5,
          }}
          textStyle={{ justifyContent:'center', flex:1 }}
          dropdownStyle={{
            borderColor: 'gray', borderWidth: 1, minWidth:300, alignItems:'stretch', alignSelf: 'stretch',
          }}
          options={formElement.options.map(option => option.label)} />
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
        <Text style={{ justifyContent:'center', alignSelf:'center', fontSize:14, }} numberOfLines={1}>{this.props.document.title}</Text>
      )
      : this.props.children;
    
    return (childComponents) ? (<TouchableOpacity  {...this.props.button}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor:'gainsboro', padding:3, paddingLeft:10, paddingRight:10, borderRadius:3, }} {...this.props.container}>
        <Icons style={{ marginRight:10, alignSelf:'center', alignItems:'center', top:2, }} size={24}
          {...this.props.icon}
          ></Icons>
          {childComponents}
      </View>
    </TouchableOpacity>) : null;
  }
}

function searchDataList(options) {
  let { arr, searchstring, } = options;
  // console.log({ arr, searchstring, })
  return arr.filter((arrayItem) => {
    return arrayItem.title.search(new RegExp(searchstring, 'i')) !== -1;
  }); 
}

function renderFormDataListItem(options, dataItem, sectionId, rowId) {
  // console.log({ sectionId, rowId, });
  let renderDataListFormatter = (options.formatter) ? options.formatter :
    function (data) {
      return (<View>
        <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
        <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
      </View>);
    };
  // console.log('renderFormDataListItem', { options, });
  return (
    <TouchableOpacity key={rowId} onPress={() => {
      console.log('multi',options.multi)
      options.onPress({
        value: dataItem,
        attribute: options.attribute,
      });
    }}>
      <View style={{
        flex: 1,
        borderTopWidth: 1,
        borderColor: 'lightgrey',
        padding: 5,
      }}>
       {renderDataListFormatter(dataItem)}
      </View>
    </TouchableOpacity>);
}

function searchForDataListData(options) {
  let { text, formElement, } = options;
  return new Promise((resolve, reject)=>{
    try {
      let searchText = (text.length < 1) ? '!!!INVALID!!!' : text;  
      if (formElement.dataQuery) {
        let queryString = '?'+querystring.stringify(Object.assign({ search:searchText, }, {
          format: 'json',
        }));
        request(formElement.dataQuery.url + queryString, formElement.dataQuery.options)
          .then(responseData => {
            // console.log('GOT AJAX RESPONSE');
            // console.log({ responseData });
            let filteredResults = searchDataList.call(this, {
              searchstring: searchText,
              arr: responseData[ formElement.dataQuery.resultArray ],
            });
            resolve(filteredResults);
          })
          .catch(e => {
            reject(e);
          });
      } else {
        let filteredResults = searchDataList.call(this, {
          searchstring: searchText,
          arr: this.datalists[ formElement.name ].data,
        });
        resolve(filteredResults);
      }
    } catch (e) {
      reject(e);
    }
  });
}

function getFormDatalist(options) {
  let { formElement, i, formgroup, width, } = options;
  let datalistData = getPropertyAttribute({
    property: this.state, element: formElement, skipSelector: true,
  });
  let dataFromState = this.state.formDataLists[ formElement.name ].data;
  let dataListItems = getDataListStateFromProps(dataFromState);
  let emptyListStyle = (dataFromState.length > 0) ? {
    borderColor: 'lightgrey',
    borderWidth: 1,
    top: -11,
    paddingTop: 8,
    paddingBottom: 8,
  } : {};
  let updateListData = (text) => {
    searchForDataListData.call(this, { text, formElement, })
      .then((filteredResults) => {
        let updatedFormData = this.state.formDataLists;
        updatedFormData[ formElement.name ].data = filteredResults;
        this.setState({
          formDataError: null,
          formDataLists: updatedFormData,
          formDataStatusDate: new Date(),
        });
      })
      .catch(e => {
        this.setState({
          formDataError: e,
          formDataStatusDate: new Date(),
        });
      });
  };
  let updateListSearchData = debounce(updateListData, 200);
  return (<GRID_ITEM key={i}
    description={formElement.label}
    style={[getGridMarginStyle({
      formgroup,
      i,
      width,
    }), ]}
    gridItemContentStyle={{ borderTopWidth:0, }}
    >
    <TextInput {...formElement.passProps}
      style={{ minHeight: 40, borderColor: 'lightgrey', padding:5, borderWidth: 1, fontSize:16,  borderRadius:3, }} 
      multiline={(formElement.type==='textarea')?true:false}
      onChangeText={updateListSearchData}
      // value={formElement.value || getPropertyAttribute({
      //   property: this.state, element: formElement,
      // })}
      />
    <ListView
      style={[ { flex:-1, },]}
      contentContainerStyle={[layoutStyles.positionRelative, emptyListStyle, ]}
      enableEmptySections={true}
      dataSource={dataListItems.rows}
      renderRow={(formElement.multi ===true)
        ? renderFormDataListItem.bind(this, {
          onPress: this.addSingleItemProp.bind(this),
          attribute: formElement.name,
          formatter: formElement.formatter,
          multi:formElement.multi,
        })
        : renderFormDataListItem.bind(this, {
          onPress: this.setFormSingleProp.bind(this),
          attribute: formElement.name,
          formatter: formElement.formatter,
          multi:formElement.multi,
        })
      }
      initialListSize={(Platform.OS === 'web' && dataListItems.rowscount < 20) ? 100000000 : undefined}
      >
    </ListView>
    <View style={{ alignItems:'flex-start', flexDirection: 'row', flexWrap: 'wrap', flex:1, }}>
      {(!formElement.mutli && Array.isArray(datalistData) === false)
        ? (<FromTag
          icon={{
            name: 'ios-close', 
          }}
          button={{
            onPress: this.setFormSingleProp.bind(this, {
              attribute: formElement.name,
              value: undefined,
            }),
          }}  
          document={datalistData}
          />)
        : datalistData.map((dlData, i) => {
          return (<View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'flex-start'}}>
            <FromTag
          key={i}
          icon={{
            name: 'ios-close', 
          }}
          button={{
            onPress: this.removeFromSingleItemProp.bind(this, {
              attribute: formElement.name,
              value: i,
            }),
          }}  
          document={dlData}
              />
            </View>);
        })
      }
    </View>
  </GRID_ITEM>);
}

function getFormDataTable(options) {
  let { formElement, i, formgroup, width, } = options;
  // let formColumns = formElement.columns;
  // let formColumnsLength = formElement.columns.length;
  let dataTableData = getPropertyAttribute({
    property: this.state, element: formElement, skipSelector: true,
  }) || [];
  // console.log({ dataTableData, });
  return (<GRID_ITEM key={i}
    description={formElement.label}
    style={[ getGridMarginStyle({
      formgroup,
      i,
      width,
    }), ]}
    gridItemContentStyle={{ borderTopWidth: 0, }}
    >
    {/*<Text>data table {formColumns.length}</Text> */}
    <ScrollView style={[ styles.stretchBox, ]} contentContainerStyle={[
      styles.scrollViewStandardContentContainer, {
        flex: 1, alignSelf: 'stretch',
      }, ]} horizontal={true} >
      <Table
        name="resource-variable-table"
        pages={1}
        rows={dataTableData}
        totalcount={dataTableData.length}
        getBlankHeader={formElement.dataTableHeader}
        getRenderRowData={formElement.dataTableRow}
        noImage={true}
        rowActions={[ 
          {
            icon: {
              name:'ios-arrow-dropup-outline',
            },
            onPress: function movedown(detailData, detailRowData, sectionId, rowId) {
              console.log('up',{ detailData, detailRowData, sectionId, rowId }, this.props);
            },
          },
          {
            icon: {
              name:'ios-arrow-dropdown-outline',
            },
            onPress: function movedown(detailData, detailRowData, sectionId, rowId) {
              console.log('down',{ detailData, detailRowData, sectionId, rowId }, this.props);
            },
          },
          {
            icon: {
              name: 'ios-close-circle-outline',
              style: {
                color: 'firebrick',
              },
            },
            onPress: function movedown(detailData, detailRowData, sectionId, rowId) {
              console.log('remove',{ detailData, detailRowData, sectionId, rowId }, this.props);
            },
          },
        ]}
        // noAction={true}
        {...this.props}
        >
      </Table>
    </ScrollView>  
  </GRID_ITEM>);
}

// let formKeyCounter = 0;
class ResponsiveForm extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      formDataError: null,
      formDataStatusDate: new Date(),
      formDataLists:{},
    }, props.formdata);
    this.datalists = {};
    props.formgroups.forEach((formgroup) => {
      formgroup.formElements.forEach((formelement) => {
        if (formelement.type === 'datalist') {
          this.datalists[ formelement.name ] = {
            data: formelement.data || [],
            status: null,
          };
          this.state.formDataLists[ formelement.name ] = {
            data: [], //formelement.data || [],
            status: null,
          };
        }
      });
    });
  }
  submitForm() {
    let formdata = Object.assign({}, this.state);
    delete formdata.formDataError;
    delete formdata.formDataLists;
    delete formdata.formDataStatusDate;
    this.props.onSubmit(formdata);
  }
  componentWillUpdate(prevProps, prevState) {
    if (this.props.onChange) {
      this.props.onChange(prevState);
    }
  }
  removeFromSingleItemProp(options) {
    let { value, attribute, } = options;
    let attrArray = attribute.split('.');
    let arrayToSet = Object.assign([], this.state[ attrArray[ 0 ] ][ attrArray[ 1 ] ]);
    // let removedItem = arrayToSet.splice(value, 1);
    arrayToSet.splice(value, 1);

    this.setFormSingleProp({ value: arrayToSet, attribute, });    
    // console.log('remove prop form state', { value, attribute, arrayToSet, removedItem, });
  }
  addSingleItemProp(options) {
    let { value, attribute, } = options;
    let attrArray = attribute.split('.');
    if (!this.state[ attrArray[ 0 ] ]) {
      this.state[ attrArray[ 0 ] ] = {};
    }
    let arrayToSet = Object.assign([], this.state[ attrArray[ 0 ] ][ attrArray[ 1 ] ]);
    // let removedItem = arrayToSet.splice(value, 1);
    arrayToSet.push(value);

    this.setFormSingleProp({ value: arrayToSet, attribute, });    
    // console.log('remove prop form state', { value, attribute, arrayToSet, removedItem, });
  }
  setFormSingleProp(options) {
    let { value, attribute, } = options;
    let updatedStateProp = {};
    // console.log('setFormSingleProp prop form state', { value, attribute, }, 'this.state.formDataLists', this.state.formDataLists);
    let updatedFormData = Object.assign({}, this.state.formDataLists);
    updatedFormData[ attribute ].data = [];
    // let dataFromState = this.state.formDataLists[ formElement.name ].data;

    if (attribute.indexOf('.') === -1) {
      updatedStateProp[ attribute ] = value;
      updatedStateProp.formDataLists = updatedFormData;
      this.setState(updatedStateProp);
    } else {
      let attrArray = attribute.split('.');
      let stateToSet = Object.assign({}, this.state[ attrArray[ 0 ] ]);
      stateToSet[attrArray[1]]=value;
      this.setState({
        [ attrArray[ 0 ] ]: stateToSet,
        formDataLists: updatedFormData,
      });
    }
  }
  render() {
    let { width,  } = Dimensions.get('window');

    let formGroupData = this.props.formgroups.map((formgroup, i) => {
      return (<RESPONSIVE_GRID key={i} columns={formgroup.layoutColumns || 2} style={formgroup.layoutStyle}>
        {formgroup.formElements.map((formElement, j) => {
          if (formElement.type === 'text' || formElement.type === 'textarea') {
            return getFormTextInputArea.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'checkbox') {
            return getFormCheckbox.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'select') {
            return getFormSelect.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'button') {
            return getFormButton.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'submit') {
            return getFormSubmit.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'datalist') {
            return getFormDatalist.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'datatable') {
            return getFormDataTable.call(this, { formElement,  i:j, formgroup, width, });
          } else if (formElement.type === 'divider') {
            return (<HR key={j}/>);
          } else if (formElement.type === 'textblock') {
            return (<Text key={j} style={{ marginTop:10, marginBottom:10, }}>{formElement.value}</Text>);
          } else {
            return <View key={j} />;
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
