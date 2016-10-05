import React, { Component, } from 'react';
import { View, Text, } from 'react-native';
import capitalize from 'capitalize';
import pluralize from 'pluralize';
import Icons from '../Icons';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import colorStyles from '../Styles/colors';

function getMenuItem(props, propertyName) {
  if (props[propertyName]) {
    if (props[propertyName].itemType === 'icon') {
      return <Icons {...props[propertyName].icon} style={[ layoutStyles.menuBarItemIcon, colorStyles.link, ]} size={24}/>;
    } else if (props[propertyName].itemType === 'text'){
      return <Text style={layoutStyles.menuBarItemText}>{props[propertyName].label}</Text>;  
    }
  }
  else {
    return <View style={[layoutStyles.menuBarItemIcon, { minWidth:40, }, ]}/>;
  }
}

class MenuBar extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    let rightMenuItem = getMenuItem(this.props, 'rightItem');
    let leftMenuItem = getMenuItem(this.props, 'leftItem');

    return (<View style={layoutStyles.menuBarContentWrapper}>
      <View style={layoutStyles.menuBarItemWrapper}>
        {leftMenuItem} 
        <Text style={layoutStyles.menuBarTitle}>
          { pluralize(capitalize(this.props.title)) }
        </Text> 
        {rightMenuItem}
      </View>
    </View>);
  }
}

export default MenuBar;