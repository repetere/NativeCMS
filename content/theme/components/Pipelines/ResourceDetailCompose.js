import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
// import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import { request, } from '../../../../app/util/request';
import constants from '../../constants';
import requestform from './requestform';

class ResourceDetailCompose extends Component {
  constructor(props){
    super(props);
    let resourceData = {};
    this.state = resourceData;
  }
  // componentWillReceiveProps(nextProps) {
  //   let resourceData = {};
  //   this.setState(resourceData);
  // }
  getFormLayoutData() {
    return requestform(this.props);
  }
  editResource(formdata) {
    // console.log('editResource formdata', { formdata });
    formdata.system_of_record_associated_data = Object.assign({}, formdata.system_of_record_associated_data);
    request(constants.pipelines.all.BASE_URL + constants.pipelines.resources.POST_NEW,
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
        this.props.handleErrorNotification({ message:'Could not create a new Resource. '+e, }, e);
      });
  }
  changeResource(formdata) {
    // console.log('changeResource formdata', { formdata });
    if (formdata.title !== this.state.title) {
      this.setState({ title: formdata.title, });
    }
  }
  render() {
    let _resource = this.state;
    // console.log('ENGINE DETAIL Compose this.props', this.props, { _resource, });
    return (
      <View style={{ flex:1, alignSelf:'stretch', }}>
        <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, { padding:10, paddingBottom:120, }]} className="resourceScrollView">
          <H2>New Resource: {_resource.title}</H2>
          <HR style={{ marginBottom:20, }}/>
          <ResponsiveForm 
            ref="resourceComposeForm"
            onSubmit={this.editResource.bind(this)}
            onChange={this.changeResource.bind(this)}
            formdata={_resource}
            formgroups={this.getFormLayoutData.call(this)}
            />
        </ScrollView>
      </View>
    );
  }
}

export default ResourceDetailCompose;