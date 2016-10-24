import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import GroupListDetail, { getGroupFromEntityName, getListFromEntityName, getDetailFromEntityName, } from '../../../../app/components/GroupListDetail';
import { Button, Text, SearchBar } from 'react-native-elements';
import constants from '../../constants';
import EngineDetail from './engineDetail';
import EngineDetailCompose from './engineDetailCompose';
import EngineDetailEdit from './engineDetailEdit';
import ResourceDetail from './ResourceDetail';
import ResourceDetailEdit from './ResourceDetailEdit';
import ResourceDetailCompose from './ResourceDetailCompose';
import ParserDetail from './ParserDetail';
import ParserDetailEdit from './ParserDetailEdit';
import ParserDetailCompose from './ParserDetailCompose';
import SegmentDetailGenerator from './SegmentDetailGenerator';
import SegmentDetailEditGenerator from './SegmentDetailEditGenerator';
import SegmentDetailComposeGenerator from './SegmentDetailComposeGenerator';
import segmentform from './segmentform';
import { getSegmentRulesetRulesTable, } from './pipelineTableLayout';

class Pipelines extends Component {
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
        groupTitle: 'Pipeline',
        baseURL:'/pipelines',
        entities: {
          Engines: {
            group: getGroupFromEntityName('engine', 'pipeline', { constants, }),
            list: getListFromEntityName('engine', 'pipeline', { constants, }),
            detail: getDetailFromEntityName('engine', 'pipeline', {
              detailComponent: EngineDetail,
              createModalComponent: EngineDetailCompose,
              editModalComponent: EngineDetailEdit,
              constants,
            }),
          },
          Resources: {
            group: getGroupFromEntityName('resource', 'pipeline', { constants, }),
            list: getListFromEntityName('resource', 'pipeline', { constants, }),
            detail: getDetailFromEntityName('resource', 'pipeline', {
              detailComponent: ResourceDetail,
              createModalComponent: ResourceDetailCompose,
              editModalComponent:ResourceDetailEdit,
              constants,
            }),
          },
          Parsers: {
            group: getGroupFromEntityName('parser', 'pipeline', { constants, }),
            list: getListFromEntityName('parser', 'pipeline', { constants, }),
            detail: getDetailFromEntityName('parser', 'pipeline', {
              detailComponent: ParserDetail,
              createModalComponent: ParserDetailCompose,
              editModalComponent:ParserDetailEdit,
              constants,
            }),
          },
          Segments: {
            group: getGroupFromEntityName('segment', 'pipeline', { constants, }),
            list: getListFromEntityName('segment', 'pipeline', { constants, }),
            detail: getDetailFromEntityName('segment', 'pipeline', {
              detailComponent: SegmentDetailGenerator({
                getSegmentRulesetRulesTable,
              }),
              createModalComponent: SegmentDetailComposeGenerator({
                baseComposeURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_NEW,
                segmentform: segmentform,
                titlePrefix: 'Segment',
              }),
              editModalComponent: SegmentDetailEditGenerator({
                baseUpdateURL: constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE,
                segmentform: segmentform,
                titlePrefix: 'Segment',
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

export default Pipelines;