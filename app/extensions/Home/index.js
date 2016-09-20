/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import styles from '../../components/Styles/shared';
import 'whatwg-fetch';
import 'babel-polyfill';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchData: props.fetchData,
    };
  }
  componentDidMount() {
    this.props.requestData('https://api.github.com/users/janbialostok/repos');
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      fetchData: nextProps.fetchData,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Now Home to React Native in app/extensions/home ?!
        </Text>
        <Text style={styles.instructions}>
          URL: {this.state.fetchData.url}
        </Text>
        <Text style={styles.instructions}>
          Data length: {(this.state.fetchData.json) ? this.state.fetchData.json.length : 0}
        </Text>
        <Button
          onPress={() => {
            this.props.requestData('https://api.github.com/users/typesettin/repos');
          } }
          small
          iconRight
          icon={{ name: 'code', }}
          backgroundColor="slategray"
          title="Refresh Data TS" />
        
        <Button
          onPress={() => {
            this.props.requestData('https://api.github.com/users/yawetse/repos');
          } }
          small
          iconRight
          icon={{ name: 'code', }}
          backgroundColor="green"
          title="Refresh Data YE" />
        <Button
          onPress={() => {
            this.props.requestData('http://registry.npmjs.org/periodicjs.ext.cache');
          } }
          small
          iconRight
          icon={{ name: 'code', }}
          backgroundColor="green"
          title="Cache ext" />
        <Button
          onPress={() => {
            this.props.requestData('http://registry.npmjs.org/formie');
          } }
          small
          iconRight
          icon={{ name: 'code', }}
          backgroundColor="green"
          title="formie" />
      </View>
    );
  }
}

export default Home;