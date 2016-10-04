import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ListView, ScrollView, RefreshControl, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, Text, SearchBar } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import numeral from 'numeral';

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

function getDefaultRenderRowData(data) {
  let rowData = Object.assign({}, getBlankDefaultHeader(), data);
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'Title',
      label: rowData.title,
    }, {
      style: {
        width: 200,
      },
      heading: 'Date',
      label: moment(rowData.createdat).format('MM/DD/YYYY | hh:mm:ssa'),
    }],
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
    let ds = getDataSource();
    this.getRenderRowData = props.getRenderRowData || getDefaultRenderRowData;
    this.state = {
      isRefreshing: false,
      pages: this.props.pages || 1,
      rows: (this.props.rows)? ds.cloneWithRows(this.props.rows) : ds.cloneWithRows([ /*this.getBlankHeader()*/ ]),
      rowscount: (this.props.rows) ? this.props.rows.length : 0,
      totalcount: this.props.totalcount || 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    let ds = getDataSource();
    if (nextProps.rows) {
      this.setState({
        pages: nextProps.pages,
        rows: ds.cloneWithRows(nextProps.rows),
        rowscount: nextProps.rows.length,
        totalcount: nextProps.totalcount,
      });
    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      console.log('now refreshing!');
      // prepend 10 items
      // const rowData = Array.from(new Array(10))
      // .map((val, i) => ({
      //   text: 'Loaded row ' + (+this.state.loaded + i),
      //   clicks: 0,
      // }))
      // .concat(this.state.rowData);

      this.setState({
        // loaded: this.state.loaded + 10,
        isRefreshing: false,
        // rowData: rowData,
      });
    }, 5000);
  }
  render() {
    let loadingView = (<LoadingView/>);
    let emptyView = (<LoadingView/>);
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: 60,
        paddingTop:20,
        }}>
          <Text>sidebar</Text>  
          <Text>title</Text>  
          <Text>action</Text>  
        </View>
        <View style={styles.stretchBox}>
          <SearchBar
            lightTheme
            onChangeText={(data)=>{console.log('SearchBar data',data)}}
            placeholder='Type Here...'
            inputStyle={{backgroundColor:'white'}}/>
          <ListView
            style={[ styles.flexBox, ]}
            contentContainerStyle={{ position:'relative', }}
            dataSource={this.state.rows}
            renderRow={this.renderRow.bind(this, this.getRenderRowData) }
            initialListSize={(Platform.OS === 'web' && this.state.rowscount < 20) ? 100000000 : undefined}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor="slategrey"
                  title="Loading"
                  titleColor="slategrey"
                  colors={['lightslategray']}
                  progressBackgroundColor="lightsteelblue"
                />
              }>
            >
          </ListView>
        </View>
      </View>
      );
    return loadedDataView;     
  }
  renderRow(tranformFunction, data) {
    // console.log('groupList renderRow', { tranformFunction }, { data })
    // let renderData = tranformFunction(data);
    // let { /*height,*/ width, } = Dimensions.get('window');
    // console.log('width-100', width-100 ,{width});
    return (
      <View style={styles.stretchBox} >
        <Text style={styles.tabText}>sList data</Text>

      </View>
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
    let loadedDataView = (<GroupList/>);
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
      <ScrollView style={[styles.scrollViewHorizontal,styles.stretchBox]} contentContainerStyle={{position:'relative',alignSelf: 'stretch',flex:1}} horizontal={true}>
   
     {/*}   
    */} 
        <Group style={{width:GROUP_LIST_MASTER_WIDTH}} />
        <GroupList style={{width:GROUP_LIST_MASTER_WIDTH}}/>
        <GroupDetail/>
      </ScrollView>
    );
    return loadedDataView;     
  }
}

class GroupListDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // let MultiColumn = (<MultiColumn/>);
    // let SingleColumn = (<SingleColumn/>);
    let { width, height, } = Dimensions.get('window');
    let dataView = (width > 600) ? (<MultiColumn  {...this.props}/>) : (<SingleColumn  {...this.props}/>);
    return dataView;     
  }
}

class Credit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (<GroupListDetail {...this.props}/>);     
  }
}

export default Credit;