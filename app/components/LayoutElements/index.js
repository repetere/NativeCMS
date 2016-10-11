import React, { Component } from 'react';
import { Text, View, Dimensions, } from 'react-native';
import styles from '../Styles/shared';
import layoutStyles from '../Styles/layout';
import Icons from '../Icons';
import HTMLText from '../HTMLText';
// import ActionBar from '../MenuBar/ActionBar';

// import { checkStatus, request, } from '../../util/request';
// import LoadingView from '../LoadingIndicator/LoadingView';
// import { Button, FormLabel, FormInput, } from 'react-native-elements';
// import constants from '../../constants';
// import moment from 'moment';
// import capitalize from 'capitalize';
// import pluralize from 'pluralize';

exports.HR = class HR extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View {...this.props} style={[ layoutStyles.hr, this.props.componentStyle, ]}>{this.props.children}</View>;
  }
};

exports.H1 = class H1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:1,    alignSelf: 'stretch',
}}><Text {...this.props} style={[ layoutStyles.detail_h1, this.props.componentStyle, ]}>{this.props.children}</Text></View>;
  }
};

exports.H2 = class H2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{flex:1,     alignSelf: 'stretch',
}}><Text {...this.props} style={[ layoutStyles.detail_h2, this.props.componentStyle, ]}>{this.props.children}</Text></View>;
  }
};

exports.RESPONSIVE_TWO_COLUMN = class TWO_COLUMN extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { width, } = Dimensions.get('window');
    if (width > 600) {
      return this.getTwoColumns();
    } else {
      return this.getOneColumn();
    }
  }
  getOneColumn() {
    return (<View style={[this.props.componentStyle, ]}>
      {this.props.children[0]}
      {this.props.children[1]}
    </View>);
  }
  getTwoColumns() {
    return (<View style={[{ flex:1, flexDirection:'row', }, this.props.componentStyle, ]}>
      <View style={{ flex:2, }}>
        {this.props.children[0]}
      </View>
      <View style={{ flex:2, }}>
        {this.props.children[1]}
      </View>
    </View>);
  }
};

exports.RESPONSIVE_GRID = class RESPONSIVE_GRID extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    let { width, } = Dimensions.get('window');
    let gridColumns = 1;
    if (width < 600 && this.props.narrowColumns) {
      gridColumns = this.props.narrowColumns;
    } else if (width >= 600 && this.props.columns) {
      gridColumns = this.props.columns;
    }
    console.log({gridColumns})
    return (
      <View style={[ { flex:1, justifyContent:'flex-start', flexDirection: 'row', flexWrap:'wrap', }, this.props.componentStyle, ]}>
        {this.props.children.map((child,i) => {
          return (
            <View key={i} style={[{ flex:gridColumns}, this.props.gridStyle, ]}>
              {child}
            </View>);
        })}
      </View>);
  }
};