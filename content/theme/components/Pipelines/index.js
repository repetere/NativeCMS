import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import ActivityIndicator from '../../../../app/components/LoadingIndicator';
import Layout from '../../../../app/components/Layout';
import 'babel-polyfill';
import { Button, } from 'react-native-elements';
import PipelineComponent from './pipes';
import ResourcesComponent from './resources';

let layoutData = {
  extensionTitle: 'Process Engine',
  layoutType: 'tabs',
  selectedTab:'pipelines',
  tabs: {
    pipelines:{
      name: 'pipelines',
      title: 'Pipelines',
      component: PipelineComponent, 
      props:{},
    }, 
    resources: {
      name: 'resources',
      title: 'Resources',
      component: ResourcesComponent, 
      props:{},
    }, 
    parsers: {
      name: 'parsers',
      title: 'Parsers',
      component: PipelineComponent, 
      props:{},
    }, 
    segments: {
      name: 'segments',
      title: 'Segments',
      component: PipelineComponent, 
      props:{},
    },
  },
};

class Pipelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  componentDidMount() {
    this.props.requestData('https://pas-dev.promisefinancial.net:8885/pas/data/v2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.user.jwt_token,
        'x-access-token': this.props.user.jwt_token,
        // 'Access-Control-Allow-Origin':'*',
      },
      body: JSON.stringify({
        access_token: this.props.user.jwt_token,
      }),
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fetchData: nextProps.fetchData,
    });
  }
  render() {
    return (<Layout {...this.props} layoutData={layoutData} />);
  }
}

export default Pipelines;