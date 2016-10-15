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
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

class EngineDetailCompose extends Component {
  constructor(props){
    super(props);
    let engineData = (this.props.GroupListDetailStateData && this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData) ? this.props.GroupListDetailStateData.detailData.detailData : {};
    this.state = engineData;
  }
  getFormLayoutData() {
    return [{
      layoutColumns: 2,
      formElements: [{
        type:'text',
        label:'Title',
        name:'title',
        // value:'text',
      }, {
        type:'text',
        label:'Name',
        name:'name',
        // value:'text',
      }, {
        type:'text',
        label:'Category',
        name:'category',
        // value:'text',
      }, {
        type: 'select',
        label:'Primary Application',
        name: 'primary_application',
        // value: 'ECS',
        options: [{
          label: 'ECS',
          value: 'ECS',
        }, {
          label: 'PTU',
          value:'PTU',  
        }, ],
      }, {
        type:'textarea',
        label:'Description',
        name:'content',
        // value:'text',
      }, {
        type:'checkbox',
        label:'Active',
        name:'active',
        // value:'text',
      }, ],
    }, {
      layoutColumns: 1,
      formElements: [{
        type: 'datalist',
        label: 'Parser',
        name: 'system_of_record_associated_data.parser',
        idSelector: '_id',
        // value: 'ECS',
        data:[],
      }, {
        type:'datalist',
        label:'Resources',
        name: 'system_of_record_associated_data.resources',
        idSelector: '_id',
        idLabel: 'title',
        data: [],
        multi: true,
        // value:'text',
      }, {
        type: 'divider',    
      }],
    }, {
      layoutColumns: 2,
      formElements: [{
        type:'submit',
        label:'Save',
        name:'submit_button',
        value: 'Save',
        passProps: {
          backgroundColor: 'mediumaquamarine',
          style: {
            color: 'white',
          },
        }
      }, {
        type:'button',
        label:'Cancel',
        name: 'cancel_button',
        onPress: this.props.closeExtensionModal,
        value: 'Cancel',
        // passProps: {
        //   raised:true,
        // }
      }, ],  
    }];
  }
  editEngine(formdata) {
    console.log('editEngine formdata', {formdata} );
  }
  changeEngine(formdata) {
    console.log('changeEngine formdata', { formdata });
    if (formdata.title !== this.state.title) {
      this.setState({ title: formdata.title, });
    }
  }
  render() {
    let _engine = this.state;
    console.log('ENGINE DETAIL Compose this.props', this.props, { _engine, });
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

export default EngineDetailCompose;