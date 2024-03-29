import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
// import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import { request, } from '../../../../app/util/request';
import constants from '../../constants';
import parserform from './parserform';

class ParserDetailCompose extends Component {
  constructor(props){
    super(props);
    let parserData = {};
    this.state = parserData;
  }
  // componentWillReceiveProps(nextProps) {
  //   let parserData = {};
  //   this.setState(parserData);
  // }
  getFormLayoutData() {
    return parserform(this.props);
  }
  editParser(formdata) {
    // console.log('editParser formdata', { formdata });
    formdata.system_of_record_associated_data = Object.assign({}, formdata.system_of_record_associated_data);
    request(constants.pipelines.all.BASE_URL + constants.pipelines.parsers.POST_NEW,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Access-Token': this.props.user.jwt_token,
        },
        body: JSON.stringify(formdata),
      })
      .then(updatedStatus => {
        if (updatedStatus && updatedStatus.data && updatedStatus.data.doc) {
          formdata._id = updatedStatus.data.doc._id;
        }
        this.props.getGroupListDetailFunctions.appendListDetailFromCompose(formdata);
        this.props.closeExtensionModal();
        // console.log('post updated', { updatedStatus, });
      })
      .catch(e => {
        this.props.handleErrorNotification({ message:'Could not create a new Parser. '+e, }, e);
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
          <H2>New Parser: {_parser.title}</H2>
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

export default ParserDetailCompose;