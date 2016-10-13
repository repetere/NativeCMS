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
    this.state = {
      engine: this.props.GroupListDetailStateData.detailData.detailData,
    };
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
        type:'text',
        label:'Primary Application',
        name:'primary_application',
        // value:'text',
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
        type: 'select',
        label: 'category',
        name: 'category2',
        value: 'ECS',
        options: [{
          label: 'ECS',
          value: 'ECS',
        }, {
          label: 'PTU',
          value:'PTU',  
        }, ],
      }, {
        type:'checkbox',
        label:'Active',
        name:'active2',
        // value:'text',
      },],
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
    console.log('changeEngine formdata', {formdata} );
  }
  render() {
    let _engine = this.state.engine;
    console.log('ENGINE DETAIL Compose this.props', this.props, { _engine, });
    return (
      <View style={{flex:1,alignSelf:'stretch'}}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, {padding:10, paddingBottom:120}]} className="engineScrollView">
          <H2>Edit {_engine.title}</H2>
          <ResponsiveForm 
            ref="engineComposeForm"
            onSubmit={this.editEngine.bind(this)}
            // onChange={this.changeEngine.bind(this)}
            formdata={_engine}
            formgroups={this.getFormLayoutData.call(this)}
            />
        </ScrollView>
      </View>
    );
  }
}

export default EngineDetailCompose;