import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import GroupListDetail, { getGroupFromEntityName, getListFromEntityName, getDetailFromEntityName, } from '../../../../app/components/GroupListDetail';
import { Button, Text, SearchBar } from 'react-native-elements';
import constants from '../../constants';
import EngineDetail from '../Pipelines/engineDetail';
import EngineDetailCompose from '../Pipelines/engineDetailCompose';
import EngineDetailEdit from '../Pipelines/engineDetailEdit';
import ResourceDetail from '../Pipelines/ResourceDetail';
import ResourceDetailEdit from '../Pipelines/ResourceDetailEdit';
import ResourceDetailCompose from '../Pipelines/ResourceDetailCompose';
import ParserDetail from '../Pipelines/ParserDetail';
import ParserDetailEdit from '../Pipelines/ParserDetailEdit';
import ParserDetailCompose from '../Pipelines/ParserDetailCompose';
import SegmentDetailGenerator from '../Pipelines/SegmentDetailGenerator';
import SegmentDetailEditGenerator from '../Pipelines/SegmentDetailEditGenerator';
import SegmentDetailComposeGenerator from '../Pipelines/SegmentDetailComposeGenerator';
import mcr_segmentform from './mcr_segmentform';
import pricing_segmentform from './pricing_segmentform';
import scoring_segmentform from './scoring_segmentform';
import limit_segmentform from './limit_segmentform';
import adverse_segmentform from './adverse_segmentform';
import { getMCRSegmentRulesetRulesTable, getPricingSegmentRulesetRulesTable, getScoringSegmentRulesetRulesTable, getLimitSegmentRulesetRulesTable, getAdverseSegmentRulesetRulesTable, } from './modelTableLayout';
let MCRSegmentDetailCompose = SegmentDetailComposeGenerator({
  baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
  segmentform: mcr_segmentform,
  titlePrefix: 'MCR Segment',
});
let PricingSegmentDetailCompose = SegmentDetailComposeGenerator({
  baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
  segmentform: pricing_segmentform,
  titlePrefix: 'Pricing Segment',
});
let ScoringSegmentDetailCompose = SegmentDetailComposeGenerator({
  baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
  segmentform: scoring_segmentform,
  titlePrefix: 'Scoring Segment',
});
let LimitSegmentDetailCompose = SegmentDetailComposeGenerator({
  baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
  segmentform: limit_segmentform,
  titlePrefix: 'Limit Segment',
});
let AdverseSegmentDetailCompose = SegmentDetailComposeGenerator({
  baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
  segmentform: adverse_segmentform,
  titlePrefix: 'Adverse Segment',
});

class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let groupListOptions = {
      GroupListDetail: {
        options: {
          useGroups: true,
        },
        groupTitle: 'Models',
        baseURL:'/models',
        entities: {
          'Credit Engines': {
            group: getGroupFromEntityName('creditengine', 'model', { constants, }),
            list: getListFromEntityName('creditengine', 'model', { constants, display_title:'Credit Engines', }),
            detail: getDetailFromEntityName('creditengine', 'model', {
              detailComponent: EngineDetail,
              createModalComponent: EngineDetailCompose,
              editModalComponent: EngineDetailEdit,
              constants,
            }),
          },
          Resources: {
            group: getGroupFromEntityName('resource', 'model', { constants, }),
            list: getListFromEntityName('resource', 'model', { constants, }),
            detail: getDetailFromEntityName('resource', 'model', {
              detailComponent: ResourceDetail,
              createModalComponent: ResourceDetailCompose,
              editModalComponent:ResourceDetailEdit,
              constants,
            }),
          },
          Parsers: {
            group: getGroupFromEntityName('parser', 'model', { constants, }),
            list: getListFromEntityName('parser', 'model', { constants, }),
            detail: getDetailFromEntityName('parser', 'model', {
              detailComponent: ParserDetail,
              createModalComponent: ParserDetailCompose,
              editModalComponent:ParserDetailEdit,
              constants,
            }),
          },
          'MCR Calculations': {
            group: getGroupFromEntityName('mcr_calculation', 'model', { constants, }),
            list: getListFromEntityName('mcr_calculation', 'model', { constants,  listPropsEntityName:'calculation', display_title:'MCR Calculations', }),
            detail: getDetailFromEntityName('mcr_calculation', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getMCRSegmentRulesetRulesTable,
              }),
              createModalComponent: MCRSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: mcr_segmentform,
                titlePrefix: 'MCR Segment',
              }),
              constants,
            }),
          },
          'MCR Segments': {
            group: getGroupFromEntityName('mcr_segment', 'model', { constants, }),
            list: getListFromEntityName('mcr_segment', 'model', {
              constants,
              listPropsEntityName: 'segment',
              display_title: 'MCR Segments',
              createModalComponent: MCRSegmentDetailCompose,
            }),
            detail: getDetailFromEntityName('mcr_segment', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getMCRSegmentRulesetRulesTable,
              }),
              createModalComponent: MCRSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: mcr_segmentform,
                titlePrefix: 'MCR Segment',
              }),
              constants,
            }),
          },
          'Scoring Calculations': {
            group: getGroupFromEntityName('score_calculation', 'model', { constants, }),
            list: getListFromEntityName('score_calculation', 'model', { constants,  listPropsEntityName:'calculation', display_title:'Scoring Calculations', }),
            detail: getDetailFromEntityName('score_calculation', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getScoringSegmentRulesetRulesTable,
              }),
              createModalComponent: ScoringSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: scoring_segmentform,
                titlePrefix: 'Scoring Segment',
              }),
              constants,
            }),
          },
          'Scoring Segments': {
            group: getGroupFromEntityName('score_segment', 'model', { constants, }),
            list: getListFromEntityName('score_segment', 'model', { constants,  listPropsEntityName:'segment', display_title:'Scoring Segments', }),
            detail: getDetailFromEntityName('score_segment', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getScoringSegmentRulesetRulesTable,
              }),
              createModalComponent: ScoringSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: scoring_segmentform,
                titlePrefix: 'Scoring Segment',
              }),
              constants,
            }),
          },
          'Pricing Calculations': {
            group: getGroupFromEntityName('pricing_calculation', 'model', { constants, }),
            list: getListFromEntityName('pricing_calculation', 'model', { constants,  listPropsEntityName:'calculation', display_title:'Pricing Calculations', }),
            detail: getDetailFromEntityName('pricing_calculation', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getPricingSegmentRulesetRulesTable,
              }),
              createModalComponent: PricingSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: pricing_segmentform,
                titlePrefix: 'Pricing Segment',
              }),
              constants,
            }),
          },
          'Pricing Segments': {
            group: getGroupFromEntityName('pricing_segment', 'model', { constants, }),
            list: getListFromEntityName('pricing_segment', 'model', { constants,  listPropsEntityName:'segment', display_title:'Pricing Segments', }),
            detail: getDetailFromEntityName('pricing_segment', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getPricingSegmentRulesetRulesTable,
              }),
              createModalComponent: PricingSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: pricing_segmentform,
                titlePrefix: 'Pricing Segment',
              }),
              constants,
            }),
          },
          'Limits Calculations': {
            group: getGroupFromEntityName('limit_calculation', 'model', { constants, }),
            list: getListFromEntityName('limit_calculation', 'model', { constants,  listPropsEntityName:'calculation', display_title:'Limits Calculations', }),
            detail: getDetailFromEntityName('limit_calculation', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getLimitSegmentRulesetRulesTable,
              }),
              createModalComponent: LimitSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: limit_segmentform,
                titlePrefix: 'Limit Segment',
              }),
              constants,
            }),
          },
          'Limits Segments': {
            group: getGroupFromEntityName('limit_segment', 'model', { constants, }),
            list: getListFromEntityName('limit_segment', 'model', { constants,  listPropsEntityName:'segment', display_title:'Limits Segments', }),
            detail: getDetailFromEntityName('limit_segment', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getLimitSegmentRulesetRulesTable,
              }),
              createModalComponent: LimitSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: limit_segmentform,
                titlePrefix: 'Limit Segment',
              }),
              constants,
            }),
          },
          'Adverse Calculations': {
            group: getGroupFromEntityName('adverse_calculation', 'model', { constants, }),
            list: getListFromEntityName('adverse_calculation', 'model', { constants,  listPropsEntityName:'calculation', display_title:'Adverse Calculations', }),
            detail: getDetailFromEntityName('adverse_calculation', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getAdverseSegmentRulesetRulesTable,
              }),
              createModalComponent: AdverseSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: adverse_segmentform,
                titlePrefix: 'Adverse Segment',
              }),
              constants,
            }),
          },
          'Adverse Segments': {
            group: getGroupFromEntityName('adverse_segment', 'model', { constants, }),
            list: getListFromEntityName('adverse_segment', 'model', { constants,  listPropsEntityName:'segment', display_title:'Adverse Segments', }),
            detail: getDetailFromEntityName('adverse_segment', 'model', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable: getAdverseSegmentRulesetRulesTable,
              }),
              createModalComponent: AdverseSegmentDetailCompose,
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: adverse_segmentform,
                titlePrefix: 'Adverse Segment',
              }),
              constants,
            }),
          },
        },
      },
    };
    return (<GroupListDetail {...this.props} {...groupListOptions}/>);     
  }
}

export default Models;