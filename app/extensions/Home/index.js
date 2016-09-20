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
    let initialRepos = (this.props.fetchData && this.props.fetchData.response && this.props.fetchData.response.json) ? this.props.fetchData.response.json.length+'num of items' : false;
    this.state = {
      repositories: initialRepos,
    };
  }
  componentDidMount() {
    // fetch('https://api.github.com/users/typesettin/repos')
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({ repositories:responseData.length, });
    //   });
    this.props.requestData('https://api.github.com/users/typesettin/repos',
      // {},
      // function (response) {
      //    return response.json();
      // }
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log('updating componet props in HOM')
    this.setState({
      repositories: nextProps.fetchData.response.json.length+' num of length items'
    });
  }
  componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate nextProps',nextProps, 'NextState', nextState)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate nextProps',nextProps, 'NextState', nextState)
    // return a boolean value
    return true;
  }
  render() {
    // console.log('RENDERING HOME');
    console.log('rendering Home','this.state',this.state,'this.props',this.props)
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