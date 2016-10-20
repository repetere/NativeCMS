import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';
import { getResourceVariablesHeader, getResourceVariablesRenderRowData, getResourceVariableTable } from './pipelineTableLayout';

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
      label:'Source',
      name:'source',
      // value:'text',
    }, {
      type:'text',
      label:'State Property Name',
      name:'state_property_name',
      // value:'text',
    }, ],
  }, {
    layoutColumns: 1,
    formElements: [{
      type:'textarea',
      label:'Source Configuration',
      name:'source_configuration',
      // value:'text',
    }, {
      type: 'datatable',
      label: 'Variables',
      name: 'variables',
      dataTableHeader: getResourceVariablesHeader,
      dataTableRow: getResourceVariablesRenderRowData,
      // dataTableComponent: getResourceVariableTable,
      newItems: [ {
        type: 'text',
        label: 'Input',
        name:'input_property_attribute',
      }, {
        type: 'text',
        label: 'Resource',
        name:'resource_property_attribute',
      }, {
        type: 'select',
        label: 'Value',
        name:'resource_property_value',
        // value: 'ECS',
        options: [{
          label: 'Please select',
          value: '',
        },{
          label: 'Schema',
          value: 'schema',
        }, {
          label: 'Look Up',
          value:'look_up',  
        }, {
          label: 'Standard Function',
          value:'standard_function',  
        }, ],
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
