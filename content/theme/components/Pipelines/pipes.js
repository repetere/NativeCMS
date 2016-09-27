import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import { Button, } from 'react-native-elements';

class Pipes extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>In the Pipes MODULES app</Text>		
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
      </View>
    );
  }
}

export default Pipes;