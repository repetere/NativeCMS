import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
// import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import { request, } from '../../../../app/util/request';
import constants from '../../constants';
import engineform from './engineform';

class EngineDetailCompose extends Component {
  constructor(props){
    super(props);
    let engineData = {};
    this.state = engineData;
  }
  // componentWillReceiveProps(nextProps) {
  //   let engineData = {};
  //   this.setState(engineData);
  // }
  getFormLayoutData() {
    return engineform(this.props);
  }
  editEngine(formdata) {
    // console.log('editEngine formdata', { formdata });
    formdata.system_of_record_associated_data = Object.assign({}, formdata.system_of_record_associated_data);
    request(constants.pipelines.all.BASE_URL + constants.pipelines.engines.POST_NEW,
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
        this.props.handleErrorNotification({ message:'Could not create a new Engine. '+e, }, e);
      });
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
      <View style={{ flex:1, alignSelf:'stretch', }}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, { padding:10, paddingBottom:120, }]} className="engineScrollView">
          <H2>New Engine: {_engine.title}</H2>
          <HR style={{ marginBottom:20, }}/>
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