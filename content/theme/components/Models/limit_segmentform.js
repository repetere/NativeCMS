import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';
import { getSegmentConditionsHeader, getSegmentConditionsRenderRowData, newSegmentConditionItems, } from '../Pipelines/pipelineTableLayout';
import { getLimitSegmentRulesetRulesHeader, getLimitSegmentRulesetRulesRenderRowData, } from './modelTableLayout';

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
      type:'text',
      label:'Category',
      name:'category',
      // value:'text',
    }, {
      type: 'datatable',
      label: 'Conditions',
      name: 'conditions',
      dataTableHeader: getSegmentConditionsHeader,
      dataTableRow: getSegmentConditionsRenderRowData,
      newItems: newSegmentConditionItems,
    }, {
      type:'text',
      label:'Ruleset Title',
      name:'ruleset.title',
      // value:'text',
    }, {
      type:'text',
      label:'Ruleset Name',
      name:'ruleset.name',
      // value:'text',
    }, {
      type: 'datatable',
      label: 'Ruleset Rules',
      name: 'ruleset.rules',
      dataTableHeader: getLimitSegmentRulesetRulesHeader,
      dataTableRow: getLimitSegmentRulesetRulesRenderRowData,
      newItems: [ {
        type: 'text',
        label: 'Object',
        name:'object',
      }, {
        type: 'text',
        label: 'Field',
        name:'field',
      }, {
        type: 'text',
        label: 'Maximum',
        name:'maximum',
      }, {
        type: 'text',
        label: 'Minimum',
        name:'minimum',
      }, {
        type: 'text',
        label: 'Product',
        name:'product',
      }, {
        type: 'text',
        label: 'Attribute',
        name:'attribute',
      }, {
        type: 'text',
        label: 'Limit',
        name:'limit',
      }, {
        type: 'text',
        label: 'Apply To',
        name:'apply_to',
      }, {
        type: 'text',
        label: 'Limit type',
        name: 'limit_type',
        options: [
          {
            label: 'Please select',
            value: '',
          }, {
            label: 'CAP',
            value: 'CAP',
          }, {
            label: 'FLOOR',
            value: 'FLOOR',
          }, {
            label: 'EQUAL',
            value: 'EQUAL',
          }, 
        ],
      }, {
        type: 'text',
        label: 'Output',
        name:'output',
      }, {
        type: 'text',
        label: 'Comment',
        name:'comment',
      }, ],
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
