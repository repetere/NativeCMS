import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';
import { getSegmentConditionsHeader, getSegmentConditionsRenderRowData, newSegmentConditionItems, } from '../Pipelines/pipelineTableLayout';
import { getAdverseSegmentRulesetRulesHeader, getAdverseSegmentRulesetRulesRenderRowData, } from './modelTableLayout';

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
      dataTableHeader: getAdverseSegmentRulesetRulesHeader,
      dataTableRow: getAdverseSegmentRulesetRulesRenderRowData,
      newItems: [ {
        type: 'text',
        label: 'Product',
        name:'product',
      }, {
        type: 'text',
        label: 'Step',
        name:'step',
      }, {
        type: 'text',
        label: 'Fail Reason',
        name:'fail_reason_label',
      }, {
        type: 'text',
        label: 'Source',
        name:'source',
      }, {
        type: 'text',
        label: 'Variable',
        name:'variable',
      }, {
        type: 'text',
        label: 'Value',
        name:'value',
      }, {
        type: 'text',
        label: 'Reason Code',
        name:'reason_code',
      }, {
        type: 'text',
        label: 'Reason Text',
        name:'reason_code_text',
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
