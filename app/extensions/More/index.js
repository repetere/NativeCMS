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
    // console.log('RowComponent this.props', this.props);
    return (<TouchableHighlight underlayColor={'#eee'} style={{ padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth: 1, borderColor: '#eee' }} {...this.props.sortHandlers}>
      <Text>{this.props.data.name}</Text>
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
  
  componentWillMount() {
    data = {};
    order = [];
    this.props.tabBarExtensions.all.forEach(tab => {
      data[ tab.name ] = tab;
      order.push(tab.name);
    });
  }
  componentWillReceiveProps (nextProps) {
    data = {};
    order = [];
    nextProps.tabBarExtensions.all.forEach(tab => {
      data[ tab.name ] = tab;
      order.push(tab.name);
    });
  }
  
  
  render() {

    console.log('this.props.tabBarExtensions', this.props.tabBarExtensions);
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
          contentContainerStyle={(Platform.OS==='web')?layoutStyles.positionRelative:undefined}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[ 0 ]);
            let newArrayOfTabExtensions = order.map(o => data[ o ]);
            // console.log('new order', { order, newArrayOfTabExtensions, });
            this.props.setTabExtensions(newArrayOfTabExtensions);
            this.forceUpdate();
          }}
          renderRow={(row, sectionID, rowID)  => <RowComponent sectionID={sectionID} rowID={rowID} data={row} />}
        />
      </View>
    );
  }
}
export default More;
