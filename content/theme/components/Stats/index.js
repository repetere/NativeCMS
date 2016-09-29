import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import ActivityIndicator from '../../../../app/components/LoadingIndicator';
import Layout from '../../../../app/components/Layout';
import { Button, } from 'react-native-elements';
import ApplicationComponent from './applications';
import CustomerComponent from './customers';
if (Platform.OS === 'web') {
  require('babel-polyfill');
}
let layoutData = {
  extensionTitle: 'Promise Data Service',
  layoutType: 'tabs',
  selectedTab:'applications',
  tabs: {
    applications:{
      name: 'applications',
      title: 'Applications',
      component: ApplicationComponent, 
      props:{},
    }, 
    customers: {
      name: 'customers',
      title: 'Customers',
      component: CustomerComponent, 
      props:{},
    }, 
  },
};

class Stats extends Component {
  constructor(props){
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  render() {
    return (<Layout {...this.props} layoutData={layoutData} />);
  }
}

export default Stats;