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
  componentWillReceiveProps(nextProps) {
    console.log({ nextProps, });
    let engineData = (nextProps.GroupListDetailStateData && nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData) ? nextProps.GroupListDetailStateData.detailData.detailData : {};
    // if (nextProps.fetchData.json) {
    this.setState(engineData);
    // }
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
        name:'description',
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
        formatter: function (data) {
          return (<View>
            <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
            <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
            {(data.variables && data.variables.length>0)?<Text style={layoutStyles.gridItemDescription}>{data.variables.map(variable=>variable.state_property_attribute).join()}</Text>:null}
          </View>);
        },
        dataQuery: {
          url: constants.pipelines.all.BASE_URL + constants.pipelines.parsers.GET_INDEX,
          options: {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Access-Token': this.props.user.jwt_token,
            },
          },
          resultArray:'parsers',
        },
        // value: 'ECS',
        // data: [ {
        //   _id:'jf09ajh80hv420ds',
        //   title: 'my parser 1',
        //   name: 'my-parser-1',
        //   description: 'this is another parser',
        //   createdat: new Date(),
        // }, {
        //   _id:'0j293jhlkzdjf',
        //   title: 'is another parse two',
        //   name: 'is-another-parser-two',
        //   description: 'another parser to put in a list',
        //   createdat: new Date(),
        // }, {
        //   _id:'nlij3049j0gsdg',
        //   title: 'three pence parser',
        //   name: 'three-pence-parser',
        //   description: 'Parsing three variables',
        //   createdat: new Date(),
        // }, ],
      }, {
        type:'datalist',
        label:'Resources',
        name: 'system_of_record_associated_data.resources',
        idSelector: '_id',
        idLabel: 'title',
        formatter: function (data) {
          return (<View>
            <Text style={layoutStyles.gridItemTitle}>{data.title}</Text>
            <Text style={layoutStyles.gridItemDescription}>{data.description}</Text>
            {(data.variables && data.variables.length>0)?<Text style={layoutStyles.gridItemDescription}>{data.variables.map(variable=>variable.state_property_attribute).join()}</Text>:null}
          </View>);
        },
        dataQuery: {
          url: constants.pipelines.all.BASE_URL + constants.pipelines.resources.GET_INDEX,
          options: {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Access-Token': this.props.user.jwt_token,
            },
          },
          resultArray:'resources',
        },
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

export default EngineDetailCompose;