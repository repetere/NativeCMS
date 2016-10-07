import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, TouchableHighlight, } from 'react-native';
import { Button, Text, SearchBar, List, ListItem } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';
import LoadingView from '../LoadingIndicator/LoadingView';
import EmptyDisplay from '../EmptyDisplay';
import MenuBar, { ActionBar, } from '../MenuBar';
import Icons from '../Icons';
import moment from 'moment';
import numeral from 'numeral';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import debounce from 'debounce';
import { request, } from '../../util/request';
import querystring from 'querystring';

const GROUP_LIST_MASTER_WIDTH = 350;

function getDataSource() {
  return new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    // sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  });
}

function getBlankDefaultHeader() {
  return {
    title: 'n/a',
    createdat: new Date(),
    primaryasset: {
      fileurl:'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

function getListStateFromProps(props) {
  let ds = getDataSource();
  return {
    pages: props.pages || 1,
    rows: ds.cloneWithRows(Object.assign([], props.rows)),
    rowscount: (props.rows) ? props.rows.length : 0,
    totalcount: props.totalcount || (props.rows) ? props.rows.length : 0,
  };
}

function getInitialListStateFromProps(props) {
  return Object.assign({
    isRefreshing: false,
    dataError: false,
    dataLoaded: false,
  }, 
  getListStateFromProps(props));
}

function getDefaultRenderRowData(data) {
  let rowData = Object.assign({}, getBlankDefaultHeader(), data);
  return {
    content: Object.assign({
      key: rowData._id,
      title: rowData.title,
      subtitle: moment(rowData.createdat).format('llll'),
    }, rowData),
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
    image: {
      uri: rowData.primaryasset.fileurl,
    },
  };
}

function getRefreshData() {
  this.setState({ isRefreshing: true, });
  setTimeout(() => {
    console.log('now refreshing!');
    this.setState({
      // loaded: this.state.loaded + 10,
      isRefreshing: false,
      // rowData: rowData,
    });
  }, 1000);
}

function getDataForLists(config, options = {}) {
  console.log('getDataForLists CALLDED this.props',this.props,'this.state',this.state,{config})
  let queryString = '?'+querystring.stringify(Object.assign({}, options.query, {
    format: 'json',
  }));
  let stateData = {
    dataError: false,
    dataLoaded: false,
  };
  let stateDataProp = {};
  // request(this.props.GroupListDetail.list.fetchUrl, {
  return new Promise((resolve, reject) => {
    request(this.props[config.componentPropsName].entities[this.state.GroupListDetailStateData.selectedGroup].list.fetchUrl+queryString, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
      },
    })
    .then(responseData => {
      console.log({responseData})

      stateData.dataLoaded = true;
      stateData.pages = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.pagesProp ];
      stateData.rows = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.dataProp ];
      stateData.totalcount = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.countProp ];
      // stateData  
      stateDataProp[config.componentStateDataName] = stateData;
      
      this.setState({
        GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
      });
      resolve(responseData);
    })
    .catch(error => {
      console.log({error})
      stateData.dataLoaded = true;
      stateData.dataError = error;
      this.setState({
        GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
      });
      reject(error);
    });
  });
  
}

function getDetailState(context, nextProps) {
  // console.log('getDetailState', { nextProps });
  return Object.assign({},
    nextProps.GroupListDetailStateData.detailData, {
      goBackToExtension: nextProps.onChangeExtension.bind(context, '/pipelines', {
        passProps: {
          GroupListDetailStateData: Object.assign({}, nextProps.GroupListDetailStateData, { detailData: {},}),
        },
        config: { transitionDirection: 'left', },
      }),
    });
}

class Group extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('GROUP ', { nextProps });
    this.setState(nextProps.GroupListDetail);
  }
  render() {
    console.log('Group props', this.props);
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let groupMenuBarProps = {
      title: this.props.GroupListDetail.groupTitle,
    };
    let loadedDataView = (
      <View style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder,{
        width: GROUP_LIST_MASTER_WIDTH,
        borderRightWidth:1,
        borderRightColor: 'lightgray',
        position: 'absolute',
        left: (this.props.GroupListDetailStateData.showGroupSidebar)?0:(-1*GROUP_LIST_MASTER_WIDTH),
        top: 0,
        bottom: 0,
        zIndex: 90,
        backgroundColor:'whitesmoke',
      },
        ]}  >
        <MenuBar {...groupMenuBarProps}/>
        {this.getGroups()}
      </View>
    );  
    return loadedDataView;     
  }
  getGroups() {
    function getPath(groupName, context) {
      return context.props.GroupListDetail.baseURL+(context.props.GroupListDetail.entities[ groupName ].path || '/' + groupName).toLowerCase();
    }
    return (<List style={{
      backgroundColor: 'white',
      marginTop: 20,
      marginBottom: 20,
    }}>
      {Object.keys(this.props.GroupListDetail.entities).map((group, i) => { 
        return (<ListItem
          title={group}
          key={i}
          onPress={() => {
            this.props.onChangeExtension(getPath(group, this), { skipSceneChange: true, });
            this.props.getGroupListDetailFunctions.setSelectedGroup(group);
            this.props.getGroupListDetailFunctions.showGroupSidebar(false);
            console.log('pressed group', group);
          } }
          />);
      })}
    </List>);
  }
}

class GroupList extends Component{
  constructor(props) {
    super(props);
    // console.log('this.props.GroupListDetailStateData',this.props.GroupListDetailStateData)
    this.getRenderRowData = props.getRenderRowData || getDefaultRenderRowData;
    this.searchFunction = debounce(this.props.getGroupListDetailFunctions.getListData, 200);
    this.state = getInitialListStateFromProps(props.GroupListDetailStateData.listData);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('GROUP LIST componentWillReceiveProps nextProps',nextProps,'this.state',this.state,'nextProps.GroupListDetail.list && this.state.rowscount < 0',Object.keys(nextProps.GroupListDetail.list).length>0 && this.state.rowscount <1 )
    let newProps = nextProps.GroupListDetailStateData.listData;
    if (Object.keys(nextProps.GroupListDetail.list).length>0 && this.state.rowscount <1) {
      this.props.getGroupListDetailFunctions.getListData();
    } else if (newProps.rows) {
      this.setState(getListStateFromProps(newProps));
    }
  }
  componentDidMount() {
    // console.log('GROUP LIST props',this.props)
    // if (this.props.GroupListDetail.list && this.state.rowscount < 1) {
    //   this.props.getGroupListDetailFunctions.getListData();
    // }
  }
  render() {
    let loadingView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
       
    if (this.props.GroupListDetail.list) {
      let emptyView = (<EmptyDisplay message={'No '+capitalize(pluralize(this.props.GroupListDetail.list.componentProps.title+' found'))}/>);
      let loadedDataView = (
        <View style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder
        ]}  >
          <MenuBar {...this.props.GroupListDetail.list.menuBar} />
          <View style={styles.stretchBox}>
            <SearchBar
              lightTheme
              onChangeText={(data) => {
                this.searchFunction({ query: { search: data, }, });
              } }
              placeholder={'Search for '+pluralize(capitalize(this.props.GroupListDetail.list.componentProps.title))+'...'}
              inputStyle={{
                backgroundColor: 'white',
                borderBottomWidth: 0,
                borderTopWidth: 0,
              }}
              containerStyle={{ backgroundColor: 'darkgray', borderWidth:0, }}/>
            {(this.state.rowscount < 1) ? emptyView : (
              <ListView
                style={[ styles.flexBox, ]}
                contentContainerStyle={layoutStyles.positionRelative}
                enableEmptySections={true}
                dataSource={this.state.rows}
                renderRow={this.renderRow.bind(this, this.getRenderRowData) }
                initialListSize={(Platform.OS === 'web' && this.state.rowscount < 20) ? 100000000 : undefined}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={getRefreshData.bind(this)}
                      tintColor="slategrey"
                      title="Loading"
                      titleColor="slategrey"
                      colors={['lightslategray', ]}
                      progressBackgroundColor="lightsteelblue"
                    />
                  }>
                >
              </ListView>
            )}
          </View>
        </View>
        );
   
      return loadedDataView;     
    } else {
      let emptyView = (
        <View style={[ styles.scrollViewStandardContainer, layoutStyles.menuBarSpaceAndBorder,
        ]}  >
          <MenuBar />
          <EmptyDisplay message=" " />
        </View>);   
      return emptyView;
    }
  }
  renderRow(tranformFunction, data) {
    // console.log('groupList renderRow', { tranformFunction }, { data })
    let renderData = tranformFunction(data);
    // let { /*height,*/ width, } = Dimensions.get('window');
    // console.log('width-100', width-100 ,{width});
    return (
      <ListItem
        {...renderData.content}
        onPress={() => {
          // console.log('list item press func');
          this.props.getGroupListDetailFunctions.setDetailData({ detailData: data, renderData, });
        } }
        />
    );
  }
}

class GroupDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillReceiveProps(nextProps) {
    let groupDetailOptions = getDetailState(this, nextProps);
    this.setState(groupDetailOptions);
    // console.log('nextProps.getGroupListDetailFunctions.useSingleViewHelpers()', nextProps.getGroupListDetailFunctions.useSingleViewHelpers());
  }
  render() {
    // let loadingView = (<LoadingView/>);
    let emptyMessage = (this.props.GroupListDetail.list) ? 'No '+capitalize(this.props.GroupListDetail.list.componentProps.title)+' selected' : ' ' ;
    let emptyView = (<EmptyDisplay message={emptyMessage}/>);
    // let errorView = (<LoadingView/>);
    // console.log({ CustomDetailComponent });

    if (this.props.GroupListDetail.detail && this.props.GroupListDetail.detail.detailComponent && this.state.detailData){
      let CustomDetailComponent = this.props.GroupListDetail.detail.detailComponent;
      return <CustomDetailComponent {...this.state} {...this.props}/>;     
    } else {
      return emptyView;     
    }
  }
}

function closeModal(name) {
  this.refs[ name ].close();
}

function generateModals(actions, props) {
  let { width, height, } = Dimensions.get('window');
  // console.log('Dimensions',{ width, height, })
  let modals = actions.map((action, i) => {
    let modalOptions = Object.assign({
      style:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        // margin: 10,
        // marginRight:20,
      },
      backdrop:true,
      position: 'top',
      key:i,
      ref: `modal_generate_modal_${i}`,
      component: false,
      passProps: {},
    }, action.modalOptions);


    modalOptions.passProps = Object.assign({}, modalOptions.passProps, {
      closeExtensionModal: closeModal.bind(this, modalOptions.ref),
    });
    modalOptions.style = Object.assign({
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'stretch',
      width: (width >600)? (width-200):(width-30),
      marginTop: (height >700)? 50:20,
    }, modalOptions.style);    
    
    let ModalOptionComponent = modalOptions.component;
    let ModelContent = (modalOptions.component) ? (<ModalOptionComponent {...modalOptions.passProps}/>):null;

    return (modalOptions.component===false) ? null : (<Modal style={modalOptions.style} backdrop={modalOptions.backdrop} key={modalOptions.key}  position={modalOptions.position} ref={modalOptions.ref}>
      {ModelContent}
    </Modal>);
  });
  return modals;
}

class SingleColumn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay:'GroupList',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData && nextProps.GroupListDetailStateData.detailData.detailData._id) {
      let groupDetailOptions = getDetailState(this, nextProps);
      let singleDetailPath = nextProps.GroupListDetail.detail.detailExtensionRoute.replace(':id', nextProps.GroupListDetailStateData.detailData.detailData._id);
      // console.log({groupDetailOptions})
      this.props.onChangeExtension(singleDetailPath, {
        passProps: Object.assign({detailViewModals:generateModals, }, nextProps, groupDetailOptions),
        config: { transitionDirection: 'top', },
      });
    }
  }
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (<GroupList {...this.props}/>);
    return loadedDataView;     
  }
}

class MultiColumn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      displaySidebar: false,
      modals:{},
    };
  }
  componentDidMount() {
    // console.log('group list this.refs', this.refs)
    this.setState({
      modals: {
        modalExtensionRefs: this.refs,
      },
    });
    // setTimeout(()=>{this.refs.modal1.open();},2000)
  }
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <ScrollView style={[styles.scrollViewHorizontal,styles.stretchBox]} contentContainerStyle={layoutStyles.groupListDetailScrollContainer} horizontal={true}>
        {(this.props.GroupListDetail.options.useGroups) ? <Group style={layoutStyles.multiColumnWidthContainer} {...this.props} /> : null}
        <View style={layoutStyles.multiColumnWidthContainer}>
          <GroupList  {...this.props} {...this.state.modals}/>
        </View>  
        <GroupDetail {...this.props} {...this.state.modals}/>
        {(this.props.GroupListDetail.detail && this.props.GroupListDetail.detail.actions)?generateModals.call(this, this.props.GroupListDetail.detail.actions, this.props):null}  
      </ScrollView>
    );
    return loadedDataView;     
  }
}

class GroupListDetail extends Component{
  constructor(props) {
    super(props);
    console.log('GroupListDetail props', props);
    this.state = {
      GroupListDetailStateData: {
        groupData:(props.GroupListDetailStateData && props.GroupListDetailStateData.groupData)?props.GroupListDetailStateData.groupData:{},
        listData:(props.GroupListDetailStateData && props.GroupListDetailStateData.listData)?props.GroupListDetailStateData.listData:{},
        detailData: (props.GroupListDetailStateData && props.GroupListDetailStateData.detailData) ? props.GroupListDetailStateData.detailData : {},
        selectedGroup: {},
        showGroupSidebar: true,
      },
    };
  }
  setDetailData(data) {
    this.setState({
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, { detailData:data, }),
    });
  }
  setSelectedGroup(groupName) {
    this.setState({
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, { selectedGroup: groupName, }),
    });
  }
  getSelectedGroupList() {
    if (this.state.GroupListDetailStateData.selectedGroup) {
      return this.props.GroupListDetail.entities[ this.state.GroupListDetailStateData.selectedGroup ];
    } else {
      return {};
    }
  }
  showGroupSidebar(shouldShowGroupSidebar) {
    this.setState({
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, { showGroupSidebar: shouldShowGroupSidebar, }),
    });
  }
  render() {
    let { width, /*height,*/ } = Dimensions.get('window');
    let getDataFunctions = {
      getGroupListDetailFunctions: {
        getListData: getDataForLists.bind(this,
          {
            componentPropsName: 'GroupListDetail',
            componentDataName: 'list',
            componentStateDataName: 'listData',
          }),
        setDetailData: this.setDetailData.bind(this),
        setSelectedGroup: this.setSelectedGroup.bind(this),
        showGroupSidebar: this.showGroupSidebar.bind(this),
        useSingleViewHelpers: ()=>width < 600,
      },
    };
    let GLDpassProps = {};
    GLDpassProps.GroupListDetail = Object.assign({}, this.props.GroupListDetail, this.getSelectedGroupList());
    let passProps = Object.assign({}, this.props, GLDpassProps);
    let dataView = (width > 600) ?
      (<MultiColumn  {...passProps} {...this.state} {...getDataFunctions}/>)
      : (<SingleColumn {...passProps} {...this.state} {...getDataFunctions}/>);
    return dataView;     
  }
}

export default GroupListDetail;