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
  Platform
} from 'react-native';
import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// const ScrollView = Animatable.createAnimatableComponent(ReactNative.ScrollView);


class Profile extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View animation="bounceInLeft" style={styles.container}>
      {/* <ScrollView animation="bounceInLeft" duration={800} delay={0} style={[styles.container]}> */}
        <Text style={ styles.heading }>In the Profile app About to ANimiate</Text>		
        {/* <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text> */}
        <Button
        onPress={()=>{console.log('pressing button in profile')}}
          small
          iconRight
          icon={{ name: 'code', }}
          title="Code" />
        <Button
          small
          iconRight
          icon={{ name: 'share-apple',  type: 'evilicon', }}
          title="Share Apple" />
        <Button
          small
          iconRight
          icon={{ name: 'battery-full',  type: 'foundation', }}
          title="Battery Full" />
      {/* </ScrollView> */}
      </View>
    );
  }
}

export default Profile;