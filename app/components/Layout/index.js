import React, { Component, } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Image, Platform, } from 'react-native';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';
import { Button, } from 'react-native-elements';
import Tabs from 'react-native-tabs';

class Layout extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      tabs: this.props.layoutData.tabs || false,
      selectedTab: this.props.layoutData.selectedTab || null,
    };
    console.log('Layout this.props', this.props);
  }
  render() {
    return (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <View style={layoutStyles.layoutContentContainer}>
            <View style={layoutStyles.layoutContentTitleContainer}>
              <Text style={ [layoutStyles.h1, { paddingRight:5, } ]}>{this.props.layoutData.extensionTitle}</Text>		
              <ScrollView style={layoutStyles.layoutContentTitleContainer} horizontal={true}>
                <Tabs
                  selected={ this.state.selectedTab }
                  selectedIconStyle={[layoutStyles.layoutTabSelectedIconStyle, colorStyles.active, ]}
                  selectedStyle={[layoutStyles.layoutTabSelectedStyle, colorStyles.active, ]}
                  style={layoutStyles.layoutTab}
                  iconStyle={layoutStyles.layoutTabIconStyle}
                  onSelect={el => this.setState({ selectedTab: el.props.name, }) } >{this.props.layoutData.tabs.map((tabData) => {
                    return (
                      <Text
                        key={tabData.name}
                        name={tabData.name}>
                      {tabData.title}
                    </Text>);
                  })}
                </Tabs>		
              </ScrollView>
            </View>
          <View style={layoutStyles.hr}></View>
        </View>
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
