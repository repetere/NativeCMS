import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../Styles/shared';
import { Button, } from 'react-native-elements';

class Layout extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <Text style={ styles.heading }>In the apps app</Text>		
        <Button
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
      </ScrollView>
    );
  }
}
export default Layout;
