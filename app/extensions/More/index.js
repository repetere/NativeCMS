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
  ListView,
  Platform
} from 'react-native';
import styles from '../../components/Styles/shared';
import {
  Button,
  // Card, SocialIcon, List, ListItem, ListView, PricingCard
} from 'react-native-elements';



var More = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var data = [Array.apply(null, {length: 30}).map(Number.call, Number)];
      return {
        dataSource: ds.cloneWithRows(data),
      };
    },

    render: function() {
      return (
        <ListView contentContainerStyle={inlineStyles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={inlineStyles.item}>{rowData}</Text>}
        />
      );
    }
});

var inlineStyles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100,

    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
    }
});

// class More extends Component {
//   constructor(){
//     super(...arguments);
//     this.state = {
//       ranattr:'ok',
//     };
//   }
//   render() {
//     return (
//       <View style={ styles.container }>
//         <Text style={ styles.heading }>In the apps app</Text>		
//         <Button
//           small
//           iconRight
//           icon={{ name: 'code', }}
//           title="Code" />
//         <Button
//           small
//           iconRight
//           icon={{ name: 'share-apple',  type: 'evilicon', }}
//           title="Share Apple" />
//         <Button
//           small
//           iconRight
//           icon={{ name: 'battery-full',  type: 'foundation', }}
//           title="Battery Full" />
//       </View>
//     );
//   }
// }

export default More;