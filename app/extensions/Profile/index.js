/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative, { StyleSheet, ScrollView, View, Text, Platform, ListView, AsyncStorage, } from 'react-native';
import styles from '../../components/Styles/shared';
import { Button, List, ListItem, } from 'react-native-elements';  // Card, SocialIcon, ListView, PricingCard
// import * as Animatable from 'react-native-animatable';
// const ScrollView = Animatable.createAnimatableComponent(ReactNative.ScrollView);
import constants from '../../constants';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  // ... // more items
];


class Profile extends Component {
  constructor(){
    super(...arguments);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      ranattr:'ok',
    };
  }
  componentDidMount() {
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
    ])
    .then(results_asyncstorage => {
      this.setState({ results_asyncstorage, user_props: this.props.user })
    })
    .catch(err => { console.log('profile err', err); });  
  }
  render() {
      console.log('profile list view',this.state.dataSource)
    return (
      <View style={[ styles.scrollViewWrapperContainer, styles.statusBarPadding, ]}>
        <ScrollView style={{flex:1}} contentContainerStyle={ { paddingVertical: 20,position:'relative' }}>

        <List containerStyle={{ marginBottom: 20, flex:1, }}>
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
        <Text>results_asyncstorage: {JSON.stringify(this.state.results_asyncstorage,null,2)}</Text>
        <Text>user_props: {JSON.stringify(this.state.user_props,null,2)}</Text>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;