/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//TO DO: https://github.com/clh161/react-native-easy-grid-view
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, TouchableHighlight, } from 'react-native';
import { Button, PricingCard, } from 'react-native-elements';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import SortableListView from 'react-native-sortable-listview';
import styles from '../../components/Styles/shared';
import layoutStyles from '../../components/Styles/layout';

let data = {
  hello: { text: 'world', },
  how: { text: 'are you', },
  test: { text: 123, },
  this: { text: 'is', },
  a: { text: 'a', },
  real: { text: 'real', },
  drag: { text: 'drag and drop', },
  bb: { text: 'bb', },
  cc: { text: 'cc', },
  dd: { text: 'dd', },
  ee: { text: 'ee', },
  ff: { text: 'ff', },
  gg: { text: 'gg', },
  hh: { text: 'hh', },
  ii: { text: 'ii', },
  jj: { text: 'jj', },
  kk: { text: 'kk', },
};

let order = Object.keys(data); //Array of keys

class RowComponent extends Component{
  render() {
    return (<TouchableHighlight underlayColor={'#eee'} style={{ padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth: 1, borderColor: '#eee' }} {...this.props.sortHandlers}>
      <Text>{this.props.data.text}</Text>
    </TouchableHighlight>);
  }
}

class More extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      // ranattr:'ok',
    };
  }
  render() {
    return (
      <View style={ styles.container }>
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
        <SortableListView
          style={{flex: 1, alignSelf:'stretch'}}
          contentContainerStyle={[layoutStyles.positionRelative,  ]}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <RowComponent data={row} />}
        />
      </View>
    );
  }
}
export default More;
