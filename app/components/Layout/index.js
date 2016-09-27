import React, { cloneElement, Component, } from 'react';
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
  }
  render() {
    let LocalLayoutTabComponent = this.state.tabs[ this.state.selectedTab ].component;
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
                  onSelect={el => this.setState({ selectedTab: el.props.name, }) } >{Object.keys(this.state.tabs).map((tabname) => {
                    let tabData = this.state.tabs[ tabname ];
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
        <LocalLayoutTabComponent {...this.props}/>
        <Button
          small
          iconRight
          icon={{ name: 'code', }}
          title="Code" />
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
