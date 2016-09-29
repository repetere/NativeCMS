import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import numeral from 'numeral';

function getDataSource() {
  return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
}
function getBlankHeader() {
  return {
    identification: {},
    contact: {},
    credit_bureau: {},
    self_reported: {},
  };
}
function getRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'GUID',
      label: data.identification.guid,
    }, {
      style: {
        width: 200,
      },
      heading: 'Date',
      label: moment(data.identification.application_submission_date).format('MM/DD/YYY | hh:mm:ssa'),
    }, {
      style: {
        width: 300,
      },
      heading: 'Email',
      label: data.contact.email,
    }, {
      style: {
        width: 90,
      },
      heading: 'Income',
      label: numeral(data.self_reported.annual_income).format('$0,0[.]00') || 'null',
    }, {
      style: {
        width: 45,
      },
      heading: 'FICO',
      label: data.credit_bureau.fico_score || 'null',
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
    image: {
      uri: 'https://facebook.github.io/react/img/logo_og.png',
    },
  };
}

class Applications extends Component {
  constructor(props){
    super(props);
    let ds = getDataSource();
    this.state = {
      fetchData: props.fetchData,
      applicationData: {
        applicationpages: 1,
        applications: ds.cloneWithRows([ { title: 'title', }]),
        applicationscount: 1,
      },
    };
  }
  componentDidMount() { 
    this.getPipelineIndex(); 
  }
  getPipelineIndex() {
    this.props.requestData(constants.pipelines.all.BASE_URL+constants.pipelines.applications.GET_INDEX, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
        // 'x-access-token': this.props.user.jwt_token,
        // 'Access-Control-Allow-Origin':'*',
      },
      // body: JSON.stringify({
      //   access_token: this.props.user.jwt_token,
      // }),
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('Parsers componentWillRecieveProps nextProps', nextProps);
    let ds = getDataSource();
    if (nextProps.fetchData.json) {
      
      this.setState({
        fetchData: nextProps.fetchData,
        applicationData: {
          applicationpages: nextProps.fetchData.json.applicationpages,
          applications: ds.cloneWithRows(nextProps.fetchData.json.applications),
          applicationscount: nextProps.fetchData.json.applicationscount,
        },
      });
    }
  }
  renderHeader() {
    let data = getBlankHeader();
    let renderData = getRenderRowData(data);

    let { height, width, } = Dimensions.get('window');
    console.log('width-100', width-100 ,{width});
    return (
      <View style={[ layoutStyles.listContainer, {
        marginBottom: 5,
        minHeight:30,
        height: 30,
        // backgroundColor: 'whitesmoke',
        borderTopColor: 'lightgrey',
        borderTopWidth: StyleSheet.hairlineWidth || 1,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth || 1,
      }]} >
        <View style={[layoutStyles.listImageWrapper,{height:10,}]}>
          
        </View>
        <View style={[ layoutStyles.listTextWrapper, {
          height:30,
          borderBottomWidth:0,
          borderBottomColor: 'transparent',
        }]}>
          <View style={{
            flexDirection:'row', overflow:'hidden', maxWidth:(width-110)
          }}>
            {renderData.columns.map((column,i) => {
              return (
                <Text key={i} style={[ layoutStyles.listText, column.style, {
                  color: 'dimgray',
                  fontWeight: 'bold',
                  fontSize: 12,
                }]} numberOfLines={1}>{column.heading.toUpperCase()} </Text>
              );
            }) }
          </View>  
          <View style={[layoutStyles.listItemIconWrapper,{height:10}]}>
            
          </View>
        </View>  
      </View>
    );
  }
  renderRow(tranformFunction, data) {
    let renderData = tranformFunction(data);
    let { height, width, } = Dimensions.get('window');
    console.log('width-100', width-100 ,{width});
    return (
      <View style={layoutStyles.listContainer} >
        <View style={layoutStyles.listImageWrapper}>
          <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={layoutStyles.listImage} resizeMode="cover" />
        </View>
        <View style={layoutStyles.listTextWrapper}>
          <View style={{
            flexDirection:'row', overflow:'hidden', maxWidth:(width-110)
          }}>
            {renderData.columns.map((column,i) => {
              return (
                <Text key={i} style={[layoutStyles.listText,column.style]} numberOfLines={1}>{column.label} </Text>
              );
            }) }
          </View>  
          <View style={layoutStyles.listItemIconWrapper}>
            <Icons name={renderData.action.icon.name} size={22} style={layoutStyles.listItemIcon} />
          </View>
        </View>  
      </View>
    );
  }
  render() {
    console.log('applicationS this.state', this.state);
    let loadingView = (<LoadingView/>);
    let loadedDataView = (
      <ListView
        style={[ styles.flexBox, { paddingLeft:6, paddingRight:6, } ]}
        contentContainerStyle={{ position:'relative', }}
        dataSource={this.state.applicationData.applications}
        renderRow={this.renderRow.bind(this, getRenderRowData) }
        renderHeader={this.renderHeader}>
      </ListView>
    );
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    if (this.state.fetchData.url === constants.pipelines.all.BASE_URL + constants.pipelines.applications.GET_INDEX) { 
      if (this.state.fetchData.error) {
        return errorView;
      } else {
        return loadedDataView; 
      }
    } else {
      return loadingView;
    }
    
  }
}

export default Applications;