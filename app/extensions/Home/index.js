/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import styles from '../../components/Styles/shared';
import 'whatwg-fetch';
import 'babel-polyfill';
// import {
//   Button,Card, SocialIcon, List, ListItem, ListView, PricingCard
// } from 'react-native-elements';
//https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=roosevelt%20island

class Home extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      repositories: false,
    };
  }
  componentDidMount() {
    fetch('https://www.pinterest.com/yawetse/bespoke-aesthetic.rss')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ repositories:responseData, });
      });
  }
  render() {
    // console.log('RENDERING HOME');
    // console.log('rendering Home','this.state',this.state,'this.props',this.props)
    let repodata = (!this.state.repositories) ? <Text style={styles.welcome}>Loading...</Text> :
      <Text style={styles.welcome}>{"Repos: "}{JSON.stringify(this.state.repositories) }</Text>;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Now Home to React Native in app/extensions/home ?!
        </Text>
        {repodata}
      </View>
    );
  }
}

export default Home;