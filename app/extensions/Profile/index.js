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
  List,
  ListItem,
  // Card, SocialIcon, ListView, PricingCard
} from 'react-native-elements';
// import * as Animatable from 'react-native-animatable';
// const ScrollView = Animatable.createAnimatableComponent(ReactNative.ScrollView);

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  // ... // more items
]


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
        <List containerStyle={{marginBottom: 20, flex:1}}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={l.avatar_url}
                key={i}
                title={l.name}
              />
            ))
          }
        </List> 
      </View>
    );
  }
}

export default Profile;