import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';

export default function (formProps) {
  return [ {
    layoutColumns: 2,
    formElements: [{
      type:'text',
      label:'Title',
      name:'title',
      // value:'text',
    }, {
      type:'text',
      label:'Name',
      name:'name',
      // value:'text',
    }, {
      type:'text',
      label:'Category',
      name:'category',
      // value:'text',
    }, {
      type: 'select',
      label:'Primary Application',
      name: 'primary_application',
      // value: 'ECS',
      options: [{
        label: 'ECS',
        value: 'ECS',
      }, {
        label: 'PTU',
        value:'PTU',  
      }, ],
    }, {
      type:'textarea',
      label:'Description',
      name:'description',
      // value:'text',
    }, {
      type:'checkbox',
      label:'Active',
      name:'active',
      // value:'text',
    }, ],
  }, {
    layoutColumns: 1,
    formElements: [{
      type: 'datalist',
      label: 'Parser',
      name: 'system_of_record_associated_data.parser',
      idSelector: '_id',
      formatter: function (data) {
        return (<View>
          <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
          <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
          {(data.variables && data.variables.length>0)?<Text style={layoutStyles.gridItemDescription}>{data.variables.map(variable=>variable.state_property_attribute).join()}</Text>:null}
        </View>);
      },
      dataQuery: {
        url: constants.pipelines.all.BASE_URL + constants.pipelines.parsers.GET_INDEX,
        options: {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': formProps.user.jwt_token,
          },
        },
        resultArray:'parsers',
      },
      // value: 'ECS',
      // data: [ {
      //   _id:'jf09ajh80hv420ds',
      //   title: 'my parser 1',
      //   name: 'my-parser-1',
      //   description: 'this is another parser',
      //   createdat: new Date(),
      // }, {
      //   _id:'0j293jhlkzdjf',
      //   title: 'is another parse two',
      //   name: 'is-another-parser-two',
      //   description: 'another parser to put in a list',
      //   createdat: new Date(),
      // }, {
      //   _id:'nlij3049j0gsdg',
      //   title: 'three pence parser',
      //   name: 'three-pence-parser',
      //   description: 'Parsing three variables',
      //   createdat: new Date(),
      // }, ],
    }, {
      type:'datalist',
      label:'Resources',
      name: 'system_of_record_associated_data.resources',
      idSelector: '_id',
      idLabel: 'title',
      formatter: function (data) {
        return (<View>
          <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
          <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
          {(data.variables && data.variables.length>0)?<Text style={layoutStyles.gridItemDescription}>{data.variables.map(variable=>variable.state_property_attribute).join()}</Text>:null}
        </View>);
      },
      dataQuery: {
        url: constants.pipelines.all.BASE_URL + constants.pipelines.resources.GET_INDEX,
        options: {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': formProps.user.jwt_token,
          },
        },
        resultArray:'resources',
      },
      multi: true,
      // value:'text',
    }, {
      type:'datalist',
      label:'Segments',
      name: 'system_of_record_associated_data.segments',
      idSelector: '_id',
      idLabel: 'title',
      formatter: function (data) {
        return (<View>
          <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
          <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
          {(data.variables && data.variables.length>0)?<Text style={layoutStyles.gridItemDescription}>{data.variables.map(variable=>variable.state_property_attribute).join()}</Text>:null}
        </View>);
      },
      dataQuery: {
        url: constants.pipelines.all.BASE_URL + constants.pipelines.segments.GET_INDEX,
        options: {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Access-Token': formProps.user.jwt_token,
          },
        },
        resultArray:'segments',
      },
      multi: true,
      // value:'text',
    }, {
      type: 'divider',    
    }, ],
  }, {
    layoutColumns: 2,
    formElements: [{
      type:'submit',
      label:'Save',
      name:'submit_button',
      value: 'Save',
      passProps: {
        backgroundColor: 'mediumaquamarine',
        style: {
          color: 'white',
        },
      }
    }, {
      type:'button',
      label:'Cancel',
      name: 'cancel_button',
      onPress: formProps.closeExtensionModal,
      value: 'Cancel',
      // passProps: {
      //   raised:true,
      // }
    }, ],  
  }, ];
};
