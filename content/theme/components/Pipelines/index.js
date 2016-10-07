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
          useGroups: true,
        },
        groupTitle: 'Pipeline',
        baseURL:'/pipelines',
        entities: {
          Engines: {
            group: {
              entityName:'Engine',
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
                modalOptions: {
                  component: LoadingView,
                  ref:'create_engine_modal',
                  style: {
                    // margin: 30,
                    
                    // width:500,
                  },
                },
              }, ],
            },
          },
          Resources: {
            group: {
              entityName:'Resource',
              fetchUrl:constants.pipelines.all.BASE_URL+constants.pipelines.resources.GET_INDEX,
              listProps: {
                pagesProp:'resourcepages',
                dataProp:'resources',
                countProp:'resourcescount',
              },
            },
            list: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.resources.GET_INDEX,
              listProps: {
                pagesProp:'resourcepages',
                dataProp:'resources',
                countProp:'resourcescount',
              },
              componentProps: {
                title:'Resource',
              },
              detailLoad: {
                method:'passProps',
              },
              menuBar: {
                title:'Resource',
                rightItem: {
                  icon: {
                    icontype: 'Ionicons',
                    name: 'ios-create-outline',
                  },
                  itemType: 'text',
                  label:'Edit',
                },
              },
            },
            detail: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.resources.GET_INDEX,
              detailComponent: EngineDetail,
              detailExtensionRoute: '/pipelines/resources/:id',
              actions: [{
                icon: {
                  icontype: 'Ionicons',
                  name: 'ios-trash-outline', //   name: 'ios-settings-outline',
                },
                itemType: 'icon',
                title: 'Delete Resource',
                description: 'delete pipeline resource',
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
                title: 'Create Resource',
                description: 'create new resources',
                type: 'modal',
                modalOptions: {
                  component: LoadingView,
                  ref:'create_resource_modal',
                  style: {
                    // margin: 30,
                    
                    // width:500,
                  },
                },
              }, ],
            },
          },
          Parsers: {
            group: {
              entityName:'Parser',
              fetchUrl:constants.pipelines.all.BASE_URL+constants.pipelines.parsers.GET_INDEX,
              listProps: {
                pagesProp:'parserpages',
                dataProp:'parsers',
                countProp:'parserscount',
              },
            },
            list: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.parsers.GET_INDEX,
              listProps: {
                pagesProp:'parserpages',
                dataProp:'parsers',
                countProp:'parserscount',
              },
              componentProps: {
                title:'Parser',
              },
              detailLoad: {
                method:'passProps',
              },
              menuBar: {
                title:'Parser',
                rightItem: {
                  icon: {
                    icontype: 'Ionicons',
                    name: 'ios-create-outline',
                  },
                  itemType: 'text',
                  label:'Edit',
                },
              },
            },
            detail: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.parsers.GET_INDEX,
              detailComponent: EngineDetail,
              detailExtensionRoute: '/pipelines/parsers/:id',
              actions: [{
                icon: {
                  icontype: 'Ionicons',
                  name: 'ios-trash-outline', //   name: 'ios-settings-outline',
                },
                itemType: 'icon',
                title: 'Delete Parser',
                description: 'delete pipeline parser',
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
                title: 'Create Parser',
                description: 'create new parsers',
                type: 'modal',
                modalOptions: {
                  component: LoadingView,
                  ref:'create_parser_modal',
                  style: {
                    // margin: 30,
                    
                    // width:500,
                  },
                },
              }, ],
            },
          },
          Segments: {
            group: {
              entityName:'Segment',
              fetchUrl:constants.pipelines.all.BASE_URL+constants.pipelines.segments.GET_INDEX,
              listProps: {
                pagesProp:'segmentpages',
                dataProp:'segments',
                countProp:'segmentscount',
              },
            },
            list: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.segments.GET_INDEX,
              listProps: {
                pagesProp:'segmentpages',
                dataProp:'segments',
                countProp:'segmentscount',
              },
              componentProps: {
                title:'Segment',
              },
              detailLoad: {
                method:'passProps',
              },
              menuBar: {
                title:'Segment',
                rightItem: {
                  icon: {
                    icontype: 'Ionicons',
                    name: 'ios-create-outline',
                  },
                  itemType: 'text',
                  label:'Edit',
                },
              },
            },
            detail: {
              fetchUrl: constants.pipelines.all.BASE_URL + constants.pipelines.segments.GET_INDEX,
              detailComponent: EngineDetail,
              detailExtensionRoute: '/pipelines/segments/:id',
              actions: [{
                icon: {
                  icontype: 'Ionicons',
                  name: 'ios-trash-outline', //   name: 'ios-settings-outline',
                },
                itemType: 'icon',
                title: 'Delete Segment',
                description: 'delete pipeline segment',
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
                title: 'Create Segment',
                description: 'create new segments',
                type: 'modal',
                modalOptions: {
                  component: LoadingView,
                  ref:'create_segment_modal',
                  style: {
                    // margin: 30,
                    
                    // width:500,
                  },
                },
              }, ],
            },
          },
        },
        /*
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
        */
        /*
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
            modalOptions: {
              component: LoadingView,
              ref:'create_engine_modal',
              style: {
                // margin: 30,
                
                // width:500,
              },
            },
          }, ],
        },
        */
      },
    };
    return (<GroupListDetail {...this.props} {...groupListOptions}/>);     
  }
}

export default Pipelines;