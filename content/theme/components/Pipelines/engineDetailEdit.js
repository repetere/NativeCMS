import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import HTMLText from '../../../../app/components/HTMLText';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import MenuBar, { ActionBar, } from '../../../../app/components/MenuBar';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import Table from '../../../../app/components/Table';
import Accordian from '../../../../app/components/Accordian';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, Text, } from 'react-native-elements';
import constants from '../../constants';
import engineform from './engineform';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

class EngineDetailEdit extends Component {
  constructor(props){
    super(props);
    let engineData = (this.props.GroupListDetailStateData && this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData) ? this.props.GroupListDetailStateData.detailData.detailData : {};
    this.state = engineData;
    // console.log('EngineDetailEdit constructor', { props, });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('EngineDetailEdit componentWillReceiveProps', { nextProps, });
    let engineData = (nextProps.GroupListDetailStateData && nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData) ? nextProps.GroupListDetailStateData.detailData.detailData : {};
    // if (nextProps.fetchData.json) {
    this.setState(engineData);
    // }
  }
  getFormLayoutData() {
    return engineform(this.props);
  }
  editEngine(formdata) {
    // console.log('editEngine formdata', { formdata });
    request(constants.pipelines.all.BASE_URL + constants.pipelines.engines.POST_UPDATE+formdata._id,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.user.jwt_token,
        },
        body: JSON.stringify(formdata),
      })
      .then(updatedStatus => {
        this.props.getGroupListDetailFunctions.updateListDetailFromCompose(formdata);
        this.props.closeExtensionModal();
        // console.log('post updated', { updatedStatus });
      })
      .catch(e => { console.log('engine post update', e) });
  }
  changeEngine(formdata) {
    // console.log('changeEngine formdata', { formdata });
    if (formdata.title !== this.state.title) {
      this.setState({ title: formdata.title, });
    }
  }
  render() {
    let _engine = this.state;
    // console.log('ENGINE DETAIL Compose this.props', this.props, { _engine, });
    return (
      <View style={{flex:1,alignSelf:'stretch'}}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, {padding:10, paddingBottom:120}]} className="engineScrollView">
          <H2>{_engine.title}</H2>
          <HR style={{marginBottom:20}}/>
          <ResponsiveForm 
            ref="engineComposeForm"
            onSubmit={this.editEngine.bind(this)}
            onChange={this.changeEngine.bind(this)}
            formdata={_engine}
            formgroups={this.getFormLayoutData.call(this)}
            />
        </ScrollView>
      </View>
    );
  }
}

export default EngineDetailEdit;