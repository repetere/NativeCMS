import React, { Component, } from 'react';
import { View, Text, } from 'react-native';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Icons from '../Icons';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';

function getMenuItem(props, index, menuBarContentItemStyle = {}) {
  if (props) {
    if (props.itemType === 'icon') {
      return <Icons {...props.icon} style={[ layoutStyles.menuBarItemIcon, colorStyles.link, menuBarContentItemStyle, ]} size={24} key={index}/>;
    } else if (props.itemType === 'text'){
      return <Text key={index} style={[layoutStyles.menuBarItemIcon, layoutStyles.menuBarItemText, menuBarContentItemStyle, ]}>{props.label}</Text>;  
    }
  }
  else {
    return <View key={index} style={[layoutStyles.menuBarItemIcon, { minWidth:40, }, menuBarContentItemStyle, ]}/>;
  }
}

class ActionBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let menuItems = this.props.actions.map((action, i) => getMenuItem(action, i, this.props.menuBarContentItemStyle));

    return (<View style={[layoutStyles.menuBarContentWrapper, this.props.menuBarContentWrapperStyle, ]}>
      <View style={[layoutStyles.menuBarItemWrapper, this.props.menuBarItemWrapperStyle, ]}>
        {menuItems}
      </View>
    </View>);
  }
}

export default ActionBar;