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
import Table from '../../../../app/components/Table';
import Accordian from '../../../../app/components/Accordian';
import { checkStatus, request, } from '../../../../app/util/request';
import LoadingView from '../../../../app/components/LoadingIndicator/LoadingView';
import { Button, FormLabel, FormInput, Text, } from 'react-native-elements';
import constants from '../../constants';
import moment from 'moment';
import capitalize from 'capitalize';
import pluralize from 'pluralize';


// class EditList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
    
//   }
//   renderTitle() {
    
//   }
//   renderListElement() {
    
//   }
// }

function getSegmentRulesHeader() {
  return {
    function: 'functionName',
    defaults: '{state}',
  };
}
function getSegmentRulesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'Function',
      label: data.function_name,
    }, {
      style: {
        width: 500,
      },
      heading: 'Defaults',
      label: JSON.stringify(data.default_state),
    },],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
function getSegmentRulesTable(rules) {
  return (<Table
        name="segment-rules-table"
        pages={1}
        rows={rules}
        totalcount={rules.length}
        getBlankHeader={getSegmentRulesHeader}
        getRenderRowData={getSegmentRulesRenderRowData}
        noImage={true}
        noAction={true}
        {...this.props}
        >
      </Table>);
}

function getSegmentConditionsHeader() {
  return {
    operation: 'AND',
    property: 'state',
    test: 'EQUAL',
    value: 'n/a',
    minimum: 'n/a',
    maximum: 'n/a',
  };
}
function getSegmentConditionsRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:100,
      },
      heading: 'Operation',
      label: data.condition_operation || 'AND',
    }, {
      style: {
        width: 300,
      },
      heading: 'Property',
      label: data.state_property_attribute,
    }, {
      style: {
        width: 90,
      },
      heading: 'Test',
      label: data.condition_test,
    }, {
      style: {
        width: 100,
      },
      heading: 'Value',
      label: data.state_property_attribute_value_comparison,
    }, {
      style: {
        width: 100,
      },
      heading: 'Minimum',
      label: data.state_property_attribute_value_minimum,
    }, {
      style: {
        width: 100,
      },
      heading: 'Maximum',
      label: data.state_property_attribute_value_maximum,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
function getSegmentConditionsTable(conditions) {
  return (<Table
        name="segment-conditions-table"
        pages={1}
        rows={conditions}
        totalcount={conditions.length}
        getBlankHeader={getSegmentConditionsHeader}
        getRenderRowData={getSegmentConditionsRenderRowData}
        noImage={true}
        noAction={true}
        {...this.props}
        >
      </Table>);
}


function getParserVariablesHeader() {
  return {
    state: 'n/a',
    resource: 'n/a',
    type: 'n/a',
    operation: 'n/a',
  };
}
function getParserVariablesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'State',
      label: data.state_property_attribute,
    }, {
      style: {
        width: 200,
      },
      heading: 'Resource',
      label: data.resource_property_attribute,
    }, {
      style: {
        width: 90,
      },
      heading: 'Type',
      label: data.calculation_type,
    }, {
      style: {
        width: 300,
      },
      heading: 'Operation',
      label: data.calculation_operation,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
function getParserVariableTable(variables) {
  return (<Table
        name="parser-variable-table"
        pages={1}
        rows={variables}
        totalcount={variables.length}
        getBlankHeader={getParserVariablesHeader}
        getRenderRowData={getParserVariablesRenderRowData}
        noImage={true}
        noAction={true}
        {...this.props}
        >
      </Table>);
}
class EngineDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render() {
    console.log('ENGINE DETAIL this.props.detailData', this.props.detailData);
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
              title={this.props.detailData.content || 'n/a'}
              description="Description"
              />
          </RESPONSIVE_GRID>

          <H2 style={{ marginTop:20, }}>Resources</H2>
          <RESPONSIVE_GRID columns={2}>
            { this.props.detailData.system_of_record_associated_data.resources.map((resource, i) => {
              return <GRID_ITEM key={i} {...resource} icon={
                { icontype: 'Octicons', name: 'database', }} description={`(${resource.source_configuration.data_source}) ${resource.description}`} />;
            })}
          </RESPONSIVE_GRID>
          <H2 style={{ marginTop:20, }}>Parser</H2>
          <RESPONSIVE_GRID columns={1}>
            <GRID_ITEM 
              gridItemContentStyle={{borderTopWidth:0}}
              >
            <Accordian
            title={this.props.detailData.system_of_record_associated_data.parser.title}
            collapsible={true}
            icontype="Octicons"
            iconCollapsed="plus"
            iconOpened="dash"
            useLeftIcon={true}
            iconSize={14}
            containerStyle={[layoutStyles.gridItemContent, { marginTop:5, paddingTop:0, paddingBottom:0, }]}
            children={getParserVariableTable.call(this, this.props.detailData.system_of_record_associated_data.parser.variables)}/>
            </GRID_ITEM>
          </RESPONSIVE_GRID>
          
          <H2 style={{ marginTop: 20, }}>Segments</H2>
          <RESPONSIVE_GRID columns={1}>
            { this.props.detailData.system_of_record_associated_data.segments.map((segment, i) => {
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
            })}
          </RESPONSIVE_GRID>
        </View>
      </DetailView>
    );
  }
}

export default EngineDetail;