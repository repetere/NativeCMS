import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import GroupListDetail from '../../../../app/components/GroupListDetail';
import { Button, Text, SearchBar } from 'react-native-elements';
import constants from '../../constants';
import EngineDetail from './engineDetail';
import moment from 'moment';
import numeral from 'numeral';

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
          useGroups: false,
        },
        group: {
          fetchUrl:constants.pipelines.all.BASE_URL+constants.pipelines.engines.GET_INDEX,
          listProps: {
            pagesProp:'enginepages',
            dataProp:'engines',
            countProp:'enginescount',
          },
        },
        list: {
          fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.engines.GET_INDEX,
          listProps: {
            pagesProp:'enginepages',
            dataProp:'engines',
            countProp:'enginescount',
          },
          componentProps: {
            title:'Engine',
          },
          detailLoad: {
            method:'passProps',
          },
          menuBar: {
            title:'Engine',
            rightItem: {
              icon: {
                icontype: 'Ionicons',
                name: 'ios-create-outline',
              },
              itemType: 'text',
              label:'Edit'
            },
          },
        },
        detail: {
          fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.engines.GET_INDEX,
          detailComponent: EngineDetail,
          detailExtensionRoute: '/pipelines/engines/:id',
          actions: [{
            icon: {
              icontype: 'Ionicons',
              name: 'ios-trash-outline', //   name: 'ios-settings-outline',
            },
            itemType: 'icon',
            title: 'Delete Engine',
            description: 'delete pipeline engine',
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
            title: 'Create Engine',
            description: 'create new engines',
            type: 'modal',
            component: EngineDetail,
          }, ],
        },
      },
    };
    return (<GroupListDetail {...this.props} {...groupListOptions}/>);     
  }
}

export default Pipelines;