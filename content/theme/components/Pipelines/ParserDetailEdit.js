import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import { request, } from '../../../../app/util/request';
import constants from '../../constants';
import parserform from './parserform';

class ParserDetailEdit extends Component {
  constructor(props){
    super(props);
    let parserData = (this.props.GroupListDetailStateData && this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData) ? this.props.GroupListDetailStateData.detailData.detailData : {};
    this.state = parserData;
    // console.log('ParserDetailEdit constructor', { props, });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('ParserDetailEdit componentWillReceiveProps', { nextProps, });
    let parserData = (nextProps.GroupListDetailStateData && nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData) ? nextProps.GroupListDetailStateData.detailData.detailData : {};
    // if (nextProps.fetchData.json) {
    this.setState(parserData);
    // }
  }
  getFormLayoutData() {
    return parserform(this.props);
  }
  editParser(formdata) {
    // console.log('editParser formdata', { formdata });
    request(constants.pipelines.all.BASE_URL + constants.pipelines.parsers.POST_UPDATE+formdata._id,
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
      .catch(e => {
        this.props.handleErrorNotification({ message:'Could not update Parser. '+e, }, e);
      });
  }
  changeParser(formdata) {
    // console.log('changeParser formdata', { formdata });
    if (formdata.title !== this.state.title) {
      this.setState({ title: formdata.title, });
    }
  }
  render() {
    let _parser = this.state;
    // console.log('ENGINE DETAIL Compose this.props', this.props, { _parser, });
    return (
      <View style={{ flex:1, alignSelf:'stretch', }}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, { padding:10, paddingBottom:120, }]} className="parserScrollView">
          <H2>{_parser.title}</H2>
          <HR style={{ marginBottom:20, }}/>
          <ResponsiveForm 
            ref="parserComposeForm"
            onSubmit={this.editParser.bind(this)}
            onChange={this.changeParser.bind(this)}
            formdata={_parser}
            formgroups={this.getFormLayoutData.call(this)}
            />
        </ScrollView>
      </View>
    );
  }
}

export default ParserDetailEdit;