import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import GroupListDetail from '../../../../app/components/GroupListDetail';
import { Button, Text, SearchBar } from 'react-native-elements';
import constants from '../../constants';
import EngineDetail from './engineDetail';
import EngineDetailCompose from './engineDetailCompose';
import moment from 'moment';
import numeral from 'numeral';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

function getGroupFromEntityName(entityName, groupName) {
  return {
    entityName: capitalize(entityName), //'Engine',
    fetchUrl:constants[pluralize(groupName)/*pipelines*/].all.BASE_URL+constants[pluralize(groupName)/*pipelines*/][pluralize(entityName)/* `engines`*/].GET_INDEX,
    listProps: {
      pagesProp:`${entityName}pages`, //enginepages,
      dataProp: pluralize(entityName), //'engines',
      countProp: `${pluralize(entityName)}count`,//'enginescount',
    },
  };
}

function getListFromEntityName(entityName, groupName) {
  return {
    fetchUrl: constants[pluralize(groupName)].all.BASE_URL + constants[pluralize(groupName)][pluralize(entityName)].GET_INDEX,
    listProps: {
      pagesProp:`${entityName}pages`, //enginepages,
      dataProp: pluralize(entityName), //'engines',
      countProp: `${pluralize(entityName)}count`,//'enginescount',
    },
    componentProps: {
      title: capitalize(entityName), //'Engine',
    },
    detailLoad: {
      method: 'passProps',
    },
    menuBar: {
      title: capitalize(entityName), //'Engine',
      // rightItem: {
      //   icon: {
      //     icontype: 'Ionicons',
      //     name: 'ios-create-outline',
      //   },
      //   itemType: 'text',
      //   label:'Edit'
      // },
    },
  };
}

function getDetailFromEntityName(entityName, groupName, options) {
  return {
    fetchUrl: constants[pluralize(groupName)].all.BASE_URL + constants[pluralize(groupName)][pluralize(entityName)].GET_INDEX,
    detailComponent: options.detailComponent,
    detailExtensionRoute: `/${pluralize(groupName)}/${pluralize(entityName)}/:id`,
    actions: [{
      icon: {
        icontype: 'Ionicons',
        name: 'ios-trash-outline', //   name: 'ios-settings-outline',
      },
      itemType: 'icon',
      title: `Delete ${capitalize(entityName)}`, //'Delete Engine',
      description: `delete ${groupName} ${entityName}`, //'delete pipeline engine',
      type: 'confirmmodal',
      params: {
        path: '',
        method:'',
      },
    }, {
      icon: {
        icontype: 'Ionicons',
        name: 'ios-create-outline',
      },
      itemType: 'icon',
      title: `Edit ${capitalize(entityName)}`, //'Edit Engine',
      description: `edit ${pluralize(entityName)}`,//'create new engines',
      type: 'modal',
      modalOptions: {
        component: options.editModalComponent,
        ref: `edit_${entityName}_modal`, //'create_engine_modal',
        style: {
        },
      },
    }, {
      icon: {
        icontype: 'Ionicons',
        name: 'ios-add-circle-outline',
      },
      itemType: 'icon',
      title: `Create ${capitalize(entityName)}`,
      description: `create new ${pluralize(entityName)}`,
      type: 'modal',
      modalOptions: {
        component: options.createModalComponent,
        ref:`credit_${entityName}_modal`,
        style: { /* margin: 30, width:500, */ },
      },
    }, ],
  };
}

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
            group: getGroupFromEntityName('engine', 'pipeline'),
            list: getListFromEntityName('engine', 'pipeline'),
            detail: getDetailFromEntityName('engine', 'pipeline', {
              detailComponent: EngineDetail,
              createModalComponent: EngineDetailCompose,
              editModalComponent:EngineDetailCompose,
            }),
          },
          Resources: {
            group: getGroupFromEntityName('resource', 'pipeline'),
            list: getListFromEntityName('resource', 'pipeline'),
            detail: getDetailFromEntityName('resource', 'pipeline', {
              detailComponent: EngineDetail,
              createModalComponent: LoadingView,
              editModalComponent:LoadingView,
            }),
          },
          Parsers: {
            group: getGroupFromEntityName('parser', 'pipeline'),
            list: getListFromEntityName('parser', 'pipeline'),
            detail: getDetailFromEntityName('parser', 'pipeline', {
              detailComponent: EngineDetail,
              createModalComponent: LoadingView,
              editModalComponent:LoadingView,
            }),
          },
          Segments: {
            group: getGroupFromEntityName('segment', 'pipeline'),
            list: getListFromEntityName('segment', 'pipeline'),
            detail: getDetailFromEntityName('segment', 'pipeline', {
              detailComponent: EngineDetail,
              createModalComponent: LoadingView,
              editModalComponent:LoadingView,
            }),
          },
        },
      },
    };
    return (<GroupListDetail {...this.props} {...groupListOptions}/>);     
  }
}

export default Pipelines;