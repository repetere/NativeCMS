import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import Icons from '../../../../app/components/Icons';
import HTMLText from '../../../../app/components/HTMLText';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import MenuBar, { ActionBar, } from '../../../../app/components/MenuBar';
import Form from '../../../../app/components/Form';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, Text, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';


class EditList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    
  }
  renderTitle() {
    
  }
  renderListElement() {
    
  }
}

class EngineDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    console.log('ENGINE DETAIL', this.props);
    return (
      <DetailView {...this.props}>
        <View style={layoutStyles.detail_widthPadding}>
          <H1>{this.props.detailData.title}</H1>
          <RESPONSIVE_TWO_COLUMN componentStyle={layoutStyles.detail_containerBottomPaddingMargin}>
            <View>
              <FormLabel>Name</FormLabel>
              <FormInput editable={false} value={this.props.detailData.name}/>
              <FormLabel>Category</FormLabel>
              <FormInput editable={false} value={this.props.detailData.category || 'n/a'}/>
            </View>
            <View>
              <FormLabel>Primary Application</FormLabel>
              <FormInput editable={false} value={this.props.detailData.primary_application || 'n/a'}/>
              <FormLabel>Description</FormLabel>
              <FormInput editable={false} multiline={true} value={this.props.detailData.content || 'n/a'}/>
            </View>
          </RESPONSIVE_TWO_COLUMN>

          <H2 style={{marginTop:20}}>Resources</H2>
          <RESPONSIVE_GRID columns={2}>
            {this.props.detailData.system_of_record_associated_data.resources.map((resource, i) => {
              return <GRID_ITEM key={i} {...resource} description={`(${resource.source_configuration.data_source}) ${resource.description}`} />;
            })}
          </RESPONSIVE_GRID>

          <H2 style={{marginTop:20}}>Parser</H2>
          <RESPONSIVE_GRID columns={1}>
            <GRID_ITEM 
              {...this.props.detailData.system_of_record_associated_data.parser}
              />
          </RESPONSIVE_GRID>
          <H2 style={{marginTop:20}}>Segments</H2>
          <Text>{JSON.stringify(this.props.detailData,'',2)}</Text>
        </View>
      </DetailView>
    );
  }
}

export default EngineDetail;