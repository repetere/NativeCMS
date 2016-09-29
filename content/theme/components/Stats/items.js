import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import Table from '../../../../app/components/Table';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';
import ItemDetail from './itemDetail';

function getDataSource() {
  return new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
}

class Items extends Component {
  constructor(props){
    super(props);
    let ds = getDataSource();
    this.state = {
      fetchData: props.fetchData,
      itemData: {
        itempages: 1,
        items: [ { title: 'title' }],
        itemscount: 1,
      },
    };
  }
  componentDidMount() { 
    this.getPipelineIndex(); 
  }
  getPipelineIndex() {
    this.props.requestData(constants.pipelines.all.BASE_URL+constants.pipelines.items.GET_INDEX, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('Parsers componentWillRecieveProps nextProps', nextProps);
    let ds = getDataSource();
    if (nextProps.fetchData.json) {
      
      this.setState({
        fetchData: nextProps.fetchData,
        itemData: {
          itempages: nextProps.fetchData.json.itempages,
          items: nextProps.fetchData.json.items,
          itemscount: nextProps.fetchData.json.itemscount,
        },
      });
    }
  }

  render() {
    console.log('itemS this.state', this.state);
    let loadingView = (<LoadingView/>);
    // let loadedDataView = ;
    let errorView = (
      <View style={styles.container}>
        <Text style={styles.welcome}>ERROR</Text>		
      </View>
    );
    if (this.state.fetchData.url === constants.pipelines.all.BASE_URL + constants.pipelines.items.GET_INDEX) { 
      if (this.state.fetchData.error) {
        return errorView;
      } else {
        return (
          <Table
            name="pasdata-items-table"
            pages={this.state.itemData.itempages}
            rows={this.state.itemData.items}
            totalcount={this.state.itemData.itemscount}
            detailView={ItemDetail}
            {...this.props}
            >
          </Table>
        ); 
      }
    } else {
      return loadingView;
    }
    
  }
}

export default Items;