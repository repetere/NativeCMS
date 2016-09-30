import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
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
    // console.log({ nextProps, });
    // if (nextProps.fetchData.json) {
    //   this.setState({
    //   });
    // }
  }
  render() {
    let HTMLTEXT = (this.props && this.props.detailData && this.props.detailData.content) ? this.props.detailData.content:'';
    let HTMLIMG = (this.props && this.props.detailData && this.props.detailData.primaryasset) ? `<img src=${this.props.detailData.primaryasset.fileurl}>` : '';
    let { width, height, } = Dimensions.get('window');
    return (
      <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer}>
        <Button  title="GO BACK" onPress={this.props.goBack}/>  
        <HTMLText html={HTMLIMG} ></HTMLText>  
        <HTMLText html={HTMLTEXT}></HTMLText>  
        <Text>{JSON.stringify(this.props.detailData,'',2)}</Text>
        <Text>height ReactPropTypes.number height sets the height of this component.</Text>
      </ScrollView>
    );
  }
}

export default ItemDetail;