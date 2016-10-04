import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import { Button, Text, SearchBar, List, ListItem } from 'react-native-elements';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import LoadingView from '../LoadingIndicator/LoadingView';
import EmptyDisplay from '../EmptyDisplay';
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

function getDataForLists(config, options ={}) {
  let queryString = '?'+querystring.stringify(Object.assign({}, options.query, {
    format: 'json',
  }));
  let stateData = {
    dataError: false,
    dataLoaded: false,
  };
  let stateDataProp = {};
  // request(this.props.GroupListDetail.list.fetchUrl, {
  request(this.props[config.componentPropsName].list.fetchUrl+queryString, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Access-Token': this.props.user.jwt_token,
    },
  })
  .then(responseData => {
    stateData.dataLoaded = true;
    stateData.pages = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.pagesProp ];
    stateData.rows = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.dataProp ];
    stateData.totalcount = responseData[ this.props[config.componentPropsName][config.componentDataName].listProps.countProp ];
    // stateData  
    stateDataProp[config.componentStateDataName] = stateData;
    
    this.setState({
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
    });
  })
  .catch(error => {
    stateData.dataLoaded = true;
    stateData.dataError = error;
    this.setState({
      GroupListDetailStateData: Object.assign(this.state.GroupListDetailStateData, stateDataProp),
    });
  });
}

class Group extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <View style={[styles.scrollViewStandardContainer,{flex:1},{
        flex: 1, 
        borderRightWidth:1,
        borderRightColor: 'lightgray',
      }]}  >
       <Text style={{marginBottom: 10}}>
            group 
          </Text>
        {
          /*<ListView
          style={[ styles.flexBox, { paddingLeft:6, paddingRight:6, } ]}
          contentContainerStyle={{ position:'relative', }}
          dataSource={this.state.rows}
          renderRow={this.renderRow.bind(this, this.getRenderRowData) }
          renderHeader={this.renderHeader.bind(this) }
          initialListSize={(Platform.OS==='web')?this.state.rowscount:20}
          >
        </ListView>
        */}
      </View>  
    );
    return loadedDataView;     
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
    let newProps = nextProps.GroupListDetailStateData.listData;
    if (newProps.rows) {
      this.setState(getListStateFromProps(newProps));
    }
  }
  componentDidMount() {
    this.props.getGroupListDetailFunctions.getListData();
  }
  render() {
    console.log('group list this.state',this.state)
    let loadingView = (<LoadingView/>);
    let emptyView = (<EmptyDisplay message={'No '+capitalize(pluralize(this.props.GroupListDetail.list.componentProps.title+' found'))}/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <View style={[ styles.scrollViewStandardContainer, {
        flex: 1, 
        borderRightWidth:1,
        borderRightColor: 'lightgray',
        paddingBottom:60,
      }
      ]}  >
        <View style={{
          justifyContent:'center',
          alignItems:'stretch',
          height: 60,
          paddingTop: 20,
          backgroundColor:'whitesmoke',
          borderBottomWidth:1,
          borderBottomColor: 'lightgray',
        }}>
          <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          }}>
            <Text>sidebar</Text>  
            <Text style={{fontWeight:'bold'}}>{this.props.GroupListDetail.list.componentProps.title}</Text>  
            <Text>action</Text>  
          </View>
        </View>
        <View style={styles.stretchBox}>
          <SearchBar
            lightTheme
            onChangeText={(data)=>{this.searchFunction({query:{search:data}})}}
            placeholder='Type Here...'
            inputStyle={{ backgroundColor: 'white' }}/>
          {(this.state.rowscount < 1) ? emptyView : (
            <ListView
              style={[ styles.flexBox, ]}
              contentContainerStyle={{ position: 'relative', }}
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
                    colors={['lightslategray']}
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
  }
  renderRow(tranformFunction, data) {
    // console.log('groupList renderRow', { tranformFunction }, { data })
    let renderData = tranformFunction(data);
    // let { /*height,*/ width, } = Dimensions.get('window');
    // console.log('width-100', width-100 ,{width});
    return (
      <ListItem
        {...renderData.content}
        onPress={(data)=>{console.log('listItem press',data)}}
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
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <View style={layoutStyles.layoutContentContainer}>
          <Text style={{marginBottom: 10}}>
            group detail
          </Text>
        </View>
      </ScrollView>);
    return loadedDataView;     
  }
}

class SingleColumn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay:'GroupList',
    };
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
      displaySidebar:false,
    };
  }
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
    let errorView = (<LoadingView/>);
    let loadedDataView = (
      <ScrollView style={[styles.scrollViewHorizontal,styles.stretchBox]} contentContainerStyle={{ position:'relative', alignSelf: 'stretch', flex:1, }} horizontal={true}>
        {(this.props.GroupListDetail.options.useGroups) ? <Group style={{ width: GROUP_LIST_MASTER_WIDTH, }} {...this.props} /> : null}
        <View style={{  width: GROUP_LIST_MASTER_WIDTH, maxWidth: GROUP_LIST_MASTER_WIDTH, }}>
          <GroupList  {...this.props} />
        </View>  
        <GroupDetail {...this.props} />
      </ScrollView>
    );
    return loadedDataView;     
  }
}

class GroupListDetail extends Component{
  constructor(props) {
    super(props);
    // console.log('GroupListDetail props', props);
    this.state = {
      GroupListDetailStateData: {
        groupData:{},
        listData:{},
        detailData:{},
      },
    };
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
      },
    };
    let dataView = (width > 600) ?
      (<MultiColumn  {...this.props} {...this.state} {...getDataFunctions}/>)
      : (<SingleColumn  {...this.props} {...this.state} {...getDataFunctions}/>);
    return dataView;     
  }
}

export default GroupListDetail;