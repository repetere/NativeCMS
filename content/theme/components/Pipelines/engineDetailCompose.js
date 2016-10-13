import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import HTMLText from '../../../../app/components/HTMLText';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import MenuBar, { ActionBar, } from '../../../../app/components/MenuBar';
import Form from '../../../../app/components/Form';
import Table from '../../../../app/components/Table';
import Accordian from '../../../../app/components/Accordian';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, Text, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';


class EngineDetailCompose extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    let _engine = this.props.GroupListDetailStateData.detailData.detailData;
    console.log('ENGINE DETAIL Compose this.props', this.props,{_engine});

    return (
      <View style={{flex:1,alignSelf:'stretch'}}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={styles.scrollViewStandardContentContainer} className="engineScrollView">
          <H2>Edit {_engine.title}</H2>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Text>My Text</Text>
          <Button title="this is the button title" onPress={this.props.closeExtensionModal}/>
        </ScrollView>
      </View>
    );
  }
}

export default EngineDetailCompose;