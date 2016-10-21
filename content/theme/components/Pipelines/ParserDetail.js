import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, Text, TextInput, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import Accordian from '../../../../app/components/Accordian';
import { getParserVariableTable, } from './pipelineTableLayout';


class ParserDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    console.log('PARSER DETAIL this.props.detailData.variables', this.props.detailData.variables);
    return (
      <DetailView {...this.props}>
        <View style={layoutStyles.detail_widthPadding}>
          <H1 style={{borderBottomWidth:0}}>{this.props.detailData.title}</H1>
          <RESPONSIVE_GRID columns={2}>
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.title}
              description="Title"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.name}
              description="Name"
              />
          </RESPONSIVE_GRID>
          <RESPONSIVE_GRID columns={1}>
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.description || 'n/a'}
              description="Description"
              />
          </RESPONSIVE_GRID>
          <H2 style={{ marginTop:20, }}>Variables</H2>
          <RESPONSIVE_GRID columns={1}>
            {getParserVariableTable.call(this, Object.assign([], this.props.detailData.variables))}
          </RESPONSIVE_GRID>
        </View>
      </DetailView>
    );
  }
}

export default ParserDetail;