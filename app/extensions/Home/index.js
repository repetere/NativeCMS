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
  Platform,
  Image,
} from 'react-native';
import styles from '../../components/Styles/shared';
import gridStyles from '../../components/Styles/gridView';
import 'whatwg-fetch';
import 'babel-polyfill';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
import GridView from 'react-native-grid-view';

class RepoItem extends Component {
  render() {
    console.log('rendering RepoItem props', this.props);
     // /*this.props.owner.avatar_url*/
    return (
      <View style={gridStyles.gridItem} key={this.props.id}>
        <Image
          source={{ uri: 'http://lorempixel.com/400/400', }}
          style={gridStyles.thumbnail}
        />
        <View >
          <Text 
          style={gridStyles.title}
          numberOfLines={3}>{this.props.clone_url}</Text>
          <Text style={gridStyles.year}>year: {this.props.description}</Text>
        </View>
      </View>
    );
  }
}

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
    console.log('this.state.fetchData.json ',this.state.fetchData.json );
    let repoGrid = (this.state.fetchData.json && this.state.fetchData.json.length>0)?<GridView items={this.state.fetchData.json} itemsPerRow={3} renderItem={this.renderItem}  style={gridStyles.listView}/>:<Text>No repos</Text>;
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
        
        <View style={styles.container}>
          {repoGrid}
        </View>
      </View>
    );
  }
  renderItem(item) {
    return <RepoItem {...item} key={item.id} />;
  }
}

export default Home;