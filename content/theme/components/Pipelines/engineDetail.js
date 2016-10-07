import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import MenuBar, { ActionBar, } from '../../../../app/components/MenuBar';
import Form from '../../../../app/components/Form';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

class EngineDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
   
    return (
      <DetailView {...this.props}>
          <Text>THIS IS FROM EXTENDING</Text>
          <Text>{JSON.stringify(this.props.detailData,'',2)}</Text>
          <Text>height ReactPropTypes.number height sets the height of this component.</Text>
      </DetailView>
    );
  }
}

export default EngineDetail;