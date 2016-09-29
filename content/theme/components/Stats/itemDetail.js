import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import HTMLText from '../../../../app/components/HTMLText';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';

class ItemDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount() { 
  }
  componentWillReceiveProps(nextProps) {
    console.log({ nextProps, });
    // if (nextProps.fetchData.json) {
    //   this.setState({
    //   });
    // }
  }
  render() {
    let HTMLTEXT = (this.props && this.props.detailData && this.props.detailData.content) ? this.props.detailData.content:'';
    return (
      <View style={[ styles.flexBox, {}]}>
        <Text>afds</Text>
        <HTMLText style={styles.welcome} html={HTMLTEXT}></HTMLText>  
        <Text>{JSON.stringify(this.props.detailData,'',2)}</Text>
        <Text>height ReactPropTypes.number 

height sets the height of this component.

It works similarly to height in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that. See https://developer.mozilla.org/en-US/docs/Web/CSS/height for more details.

justifyContent ReactPropTypes.oneOf([ 'flex-start', 'flex-end', 'center', 'space-between', 'space-around' ]) 

justifyContent aligns children in the main direction. For example, if children are flowing vertically, justifyContent controls how they align vertically. It works like justify-content in CSS (default: flex-start). See https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content for more details.

left ReactPropTypes.number 

left is the number of logical pixels to offset the left edge of this component.

It works similarly to left in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See https://developer.mozilla.org/en-US/docs/Web/CSS/left for more details of how left affects layout.

margin ReactPropTypes.number 

Setting margin has the same effect as setting each of marginTop, marginLeft, marginBottom, and marginRight. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin for more details.</Text>
      </View>
    );
  }
}

export default ItemDetail;