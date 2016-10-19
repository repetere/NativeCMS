import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, Text, TextInput, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
// import ActionBar from '../../../../app/components/MenuBar/ActionBar';
import Accordian from '../../../../app/components/Accordian';
import { getResourceVariableTable, } from './pipelineTableLayout';


class ResourceDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    // console.log('ENGINE DETAIL this.props', this.props);
    return (
      <DetailView {...this.props}>
        <View style={layoutStyles.detail_widthPadding}>
          <H1 style={{borderBottomWidth:0}}>{this.props.detailData.title}</H1>
          <RESPONSIVE_GRID columns={2}>
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.name}
              description="Name"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.state_property_name || 'n/a'}
              description="State Property"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.source || 'n/a'}
              description="Source"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.description || 'n/a'}
              description="Description"
              />
          </RESPONSIVE_GRID>
          <RESPONSIVE_GRID columns={1}>
            <GRID_ITEM 
              description="Configuration"
              >
              {(Platform.OS === 'web') ? (<pre>{JSON.stringify(this.props.detailData.source_configuration, null, 2)}</pre>): (
                <Text>{JSON.stringify(this.props.detailData.source_configuration, null, 2)}</Text>
              )}
            </GRID_ITEM>
          </RESPONSIVE_GRID>

          <H2 style={{ marginTop:20, }}>Variables</H2>
          <RESPONSIVE_GRID columns={1}>
            {getResourceVariableTable.call(this, this.props.detailData.variables||[])}
          </RESPONSIVE_GRID>
        </View>
      </DetailView>
    );
  }
}

export default ResourceDetail;