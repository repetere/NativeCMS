import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Platform, ListView, Image, Dimensions, Text, } from 'react-native';
import styles from '../../../../app/components/Styles/shared';
import layoutStyles from '../../../../app/components/Styles/layout';
import { HR, H1, H2, GRID_ITEM, RESPONSIVE_GRID, RESPONSIVE_TWO_COLUMN, } from '../../../../app/components/LayoutElements';
import DetailView from '../../../../app/components/GroupListDetail/DetailView';
import Accordian from '../../../../app/components/Accordian';
// import constants from '../../constants';
import { getSegmentRulesHeader, getSegmentRulesRenderRowData, getSegmentRulesTable, getSegmentConditionsHeader, getSegmentConditionsRenderRowData, getSegmentConditionsTable, getParserVariablesHeader, getParserVariablesRenderRowData, getParserVariableTable, } from './pipelineTableLayout';

class EngineDetail extends Component {
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
              title={this.props.detailData.category || 'n/a'}
              description="Category"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.primary_application || 'n/a'}
              description="Primary Application"
              />
            <GRID_ITEM 
              useLabel={true}
              title={this.props.detailData.description || 'n/a'}
              description="Description"
              />
          </RESPONSIVE_GRID>

          <H2 style={{ marginTop:20, }}>Resources</H2>
          <RESPONSIVE_GRID columns={(this.props.detailData.system_of_record_associated_data && this.props.detailData.system_of_record_associated_data.resources && this.props.detailData.system_of_record_associated_data.resources.length%2===0 && this.props.detailData.system_of_record_associated_data.resources.length>1)?2:1}>
            { (this.props.detailData.system_of_record_associated_data && this.props.detailData.system_of_record_associated_data.resources && this.props.detailData.system_of_record_associated_data.resources.length>0)?(this.props.detailData.system_of_record_associated_data.resources.map((resource, i) => {
              return <GRID_ITEM key={i} {...resource} icon={
                { icontype: 'Octicons', name: 'database', }} description={`(${resource.source_configuration.data_source}) ${resource.description}`} />;
            })):(<GRID_ITEM gridItemContentStyle={{borderTopWidth:0}}><Text>No Resources selected</Text></GRID_ITEM>)}
          </RESPONSIVE_GRID>
          <H2 style={{ marginTop:20, }}>Parser</H2>
          <RESPONSIVE_GRID columns={1}>
            <GRID_ITEM 
              gridItemContentStyle={{ borderTopWidth:0, }}
              >
              {(this.props.detailData.system_of_record_associated_data && this.props.detailData.system_of_record_associated_data.parser && this.props.detailData.system_of_record_associated_data.parser.title)?(<Accordian
            title={this.props.detailData.system_of_record_associated_data.parser.title}
            collapsible={true}
            icontype="Octicons"
            iconCollapsed="plus"
            iconOpened="dash"
            useLeftIcon={true}
            iconSize={14}
            containerStyle={[layoutStyles.gridItemContent, { marginTop:5, paddingTop:0, paddingBottom:0, }]}
            children={getParserVariableTable.call(this, this.props.detailData.system_of_record_associated_data.parser.variables)}/>):(<Text>No Parser selected</Text>)}
            </GRID_ITEM>
          </RESPONSIVE_GRID>
          
          <H2 style={{ marginTop: 20, }}>Segments</H2>
          <RESPONSIVE_GRID columns={1}>
            {(this.props.detailData.system_of_record_associated_data && this.props.detailData.system_of_record_associated_data.segments && this.props.detailData.system_of_record_associated_data.segments.length>0)?( this.props.detailData.system_of_record_associated_data.segments.map((segment, i) => {
              return (
              <GRID_ITEM key={i} {...segment} >
                <Accordian
                  title="Conditions"
                  collapsible={true}
                  icontype="Octicons"
                  iconCollapsed="plus"
                  iconOpened="dash"
                  useLeftIcon={true}
                  iconSize={14}
                  containerStyle={[layoutStyles.gridItemContent, { marginTop:5, paddingTop:0, paddingBottom:0, }]}
                  children={getSegmentConditionsTable.call(this, segment.conditions)} />
                <View>
                <Accordian
                  title="Rules"
                  collapsible={true}
                  icontype="Octicons"
                  iconCollapsed="plus"
                  iconOpened="dash"
                  useLeftIcon={true}
                  iconSize={14}
                  containerStyle={[layoutStyles.gridItemContent, { marginTop:5, paddingTop:0, paddingBottom:0, }]}
                  children={getSegmentRulesTable.call(this, segment.ruleset.rules)} />
                </View>
                  
              </GRID_ITEM>);
            })):(<GRID_ITEM gridItemContentStyle={{borderTopWidth:0}}><Text>No Segements selected</Text></GRID_ITEM>)}
          </RESPONSIVE_GRID>
        </View>
      </DetailView>
    );
  }
}

export default EngineDetail;