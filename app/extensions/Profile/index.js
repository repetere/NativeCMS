/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  ListView,
} from 'react-native';
import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
// import * as Animatable from 'react-native-animatable';
// const ScrollView = Animatable.createAnimatableComponent(ReactNative.ScrollView);


class Profile extends Component {
  constructor(){
    super(...arguments);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      ranattr:'ok',
    };
  }
  render() {
      console.log('profile list view',this.state.dataSource)
    return (
      <View style={styles.container}>
        <Text>list view</Text>  
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        <Text>after list view</Text>  
      </View>
    );
  }
}

export default Profile;