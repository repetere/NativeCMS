import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, Text, Image, Dimensions, TextInput, } from 'react-native';
import layoutStyles from '../../../../app/components/Styles/layout';
import constants from '../../constants';
import { getSegmentConditionsHeader, getSegmentConditionsRenderRowData, newSegmentConditionItems, } from '../Pipelines/pipelineTableLayout';
import { getMCRSegmentRulesetRulesHeader, getMCRSegmentRulesetRulesRenderRowData, getPricingSegmentRulesetRulesHeader, getPricingSegmentRulesetRulesRenderRowData, } from './modelTableLayout';

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
      dataTableHeader: getPricingSegmentRulesetRulesHeader,
      dataTableRow: getPricingSegmentRulesetRulesRenderRowData,
      newItems: [
        {
          type: 'text',
          label: 'Minimum',
          name:'minimum_full_score',
        }, {
          type: 'text',
          label: 'Maximum',
          name:'maximum_full_score',
        }, {
          type: 'text',
          label: 'Rating',
          name:'rating',
        }, {
          type: 'text',
          label: 'Annual Interest Rate',
          name:'annual_interest_rate',
        }, {
          type: 'text',
          label: 'Origination Fee Rate',
          name:'origination_fee_rate',
        }, {
          type: 'text',
          label: 'APR',
          name:'apr',
        }, {
          type: 'text',
          label: 'Expected Annual Default Rate',
          name:'expected_annual_default_rate',
        }, {
          type: 'text',
          label: 'Term',
          name:'term',
        }, {
          type: 'select',
          label: 'Guarantor',
          name:'guarantor_required',
          // value: 'ECS',
          options: [
            {
              label: 'Please select',
              value: '',
            }, {
              label: 'YES',
              value: 'YES',
            }, {
              label: 'NO',
              value:'NO',  
            }, 
          ],
        }, 
      ],
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
