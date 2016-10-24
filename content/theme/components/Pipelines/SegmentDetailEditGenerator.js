import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, TextInput, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import ResponsiveForm from '../../../../app/components/ResponsiveForm';
import { request, } from '../../../../app/util/request';
// import constants from '../../constants';
// import segmentform from './segmentform';

export default function SegmentDetailEditGenerator(options) {
  let { baseUpdateURL, titlePrefix ='Segment:', segmentform } = options;

  return class SegmentDetailEdit extends Component {
    constructor(props) {
      super(props);
      let segmentData = (this.props.GroupListDetailStateData && this.props.GroupListDetailStateData.detailData && this.props.GroupListDetailStateData.detailData.detailData) ? this.props.GroupListDetailStateData.detailData.detailData : {};
      this.state = segmentData;
      // console.log('SegmentDetailEdit constructor', { props, });
    }
    componentWillReceiveProps(nextProps) {
      // console.log('SegmentDetailEdit componentWillReceiveProps', { nextProps, });
      let segmentData = (nextProps.GroupListDetailStateData && nextProps.GroupListDetailStateData.detailData && nextProps.GroupListDetailStateData.detailData.detailData) ? nextProps.GroupListDetailStateData.detailData.detailData : {};
      // if (nextProps.fetchData.json) {
      this.setState(segmentData);
      // }
    }
    getFormLayoutData() {
      return segmentform(this.props);
    }
    editSegment(formdata) {
      // console.log('editSegment formdata', { formdata });
      request(baseUpdateURL + formdata._id, //constants.pipelines.all.BASE_URL + constants.pipelines.segments.POST_UPDATE
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
          this.props.handleErrorNotification({ message: 'Could not update Segment. ' + e, }, e);
        });
    }
    changeSegment(formdata) {
      // console.log('changeSegment formdata', { formdata });
      if (formdata.title !== this.state.title) {
        this.setState({ title: formdata.title, });
      }
    }
    render() {
      let _segment = this.state;
      // console.log('ENGINE DETAIL Compose this.props', this.props, { _segment, });
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', }}>
          <ScrollView style={styles.scrollViewStandardContainer} contentContainerStyle={[ styles.scrollViewStandardContentContainer, { padding: 10, paddingBottom: 120, }]} className="segmentScrollView">
            <H2>{`${titlePrefix} ${_segment.title}`}</H2>
            <HR style={{ marginBottom: 20, }} />
            <ResponsiveForm
              ref="segmentComposeForm"
              onSubmit={this.editSegment.bind(this)}
              onChange={this.changeSegment.bind(this)}
              formdata={_segment}
              formgroups={this.getFormLayoutData.call(this)}
              />
          </ScrollView>
        </View>
      );
    }
  };
}