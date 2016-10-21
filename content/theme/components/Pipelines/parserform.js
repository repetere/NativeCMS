import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';
import { getParserVariablesHeader, getParserVariablesRenderRowData, getParserVariableTable } from './pipelineTableLayout';

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
    }, ],
  }, {
    layoutColumns: 1,
    formElements: [{
      type:'textarea',
      label:'Description',
      name:'description',
      // value:'text',
    }, {
      type: 'datatable',
      label: 'Variables',
      name: 'variables',
      dataTableHeader: getParserVariablesHeader,
      dataTableRow: getParserVariablesRenderRowData,
      // dataTableComponent: getParserVariableTable,
      /*
      resource
      resource_property_attribute
      state_property_attribute
      calculation_type
      calculation_operation*/
      newItems: [ {
        type: 'text',
        label: 'State',
        name:'state_property_attribute',
      }, {
        type: 'text',
        label: 'Resource',
        name:'resource_property_attribute',
      }, {
        type: 'select',
        label: 'Calculation',
        name:'calculation_type',
        // value: 'ECS',
        options: [{
          label: 'Please select',
          value: '',
        }, {
          label: 'Schema',
          value: 'schema',
        }, {
          label: 'Look Up',
          value:'look_up',  
        }, {
          label: 'Standard Function',
          value:'standard_function',  
        }, ],
      }, {
        type: 'textarea',
        label: 'Operation',
        name:'calculation_operation',
      }],
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
}
