import React, { Component, } from 'react';
import Table from '../../../../app/components/Table';

export function getSegmentRulesHeader() {
  return {
    function: 'functionName',
    defaults: '{state}',
  };
}
export function getSegmentRulesRenderRowData(data) {
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
export function getSegmentRulesTable(rules) {
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

export function getSegmentConditionsHeader() {
  return {
    operation: 'AND',
    property: 'state',
    test: 'EQUAL',
    value: 'n/a',
    minimum: 'n/a',
    maximum: 'n/a',
    condition_group_id: 'n/a',
  };
}
export function getSegmentConditionsRenderRowData(data) {
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
    }, {
      style: {
        width: 100,
      },
      heading: 'Condition Group',
      label: data.condition_group_id,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getSegmentConditionsTable(conditions) {
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

export function getParserVariablesHeader() {
  return {
    state: 'n/a',
    resource: 'n/a',
    type: 'n/a',
    operation: 'n/a',
  };
}
export function getParserVariablesRenderRowData(data) {
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
      // usePRE:true,  
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
export function getParserVariableTable(variables) {
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

export function getResourceVariablesHeader() {
  return {
    input: 'n/a',
    resource: 'n/a',
    value: 'n/a',
  };
}
export function getResourceVariablesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'Input',
      label: data.input_property_attribute,
    }, {
      style: {
        width: 200,
      },
      heading: 'Resource',
      label: data.resource_property_attribute,
    }, {
      style: {
        width: 390,
      },
      heading: 'value',
      label: data.resource_property_value,
    },],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getResourceVariableTable(variables) {
  return (<Table
        name="resource-variable-table"
        pages={1}
        rows={variables}
        totalcount={variables.length}
        getBlankHeader={getResourceVariablesHeader}
        getRenderRowData={getResourceVariablesRenderRowData}
        noImage={true}
        noAction={true}
        {...this.props}
        >
      </Table>);
}

export function getSegmentRulesetRulesHeader() {
  return {
    function_name: 'n/a',
    default_state: 'n/a',
  };
}
export function getSegmentRulesetRulesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width:200,
      },
      heading: 'Function',
      label: data.function_name,
    }, {
      style: {
        width: 400,
      },
      usePRE: true,
      useJSON:true,
      heading: 'Default State',
      label: data.default_state,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getSegmentRulesetRulesTable(rules) {
  return (<Table
        name="segment-rules-table"
        pages={1}
        rows={rules}
        totalcount={rules.length}
        getBlankHeader={getSegmentRulesetRulesHeader}
        getRenderRowData={getSegmentRulesetRulesRenderRowData}
        noImage={true}
        noAction={true}
        {...this.props}
        >
      </Table>);
}

export var newSegmentConditionItems = [
  {
    type: 'select',
    label: 'Operation',
    name: 'condition_operation',
    // value: 'ECS',
    options: [ {
      label: 'Please select',
      value: '',
    }, {
      label: 'AND',
      value: 'AND',
    }, {
      label: 'OR',
      value: 'OR',
    }, ],
  }, {
    type: 'text',
    label: 'State',
    name: 'state_property_attribute',
  }, {
    type: 'select',
    label: 'Test',
    name: 'condition_test',
    // value: 'ECS',
    options: [ {
      label: 'Please select',
      value: '',
    }, {
      label: 'CAP',
      value: 'CAP',
    }, {
      label: 'FLOOR',
      value: 'FLOOR',
    }, {
      label: 'RANGE',
      value: 'RANGE',
    }, {
      label: 'EQUAL',
      value: 'EQUAL',
    }, {
      label: 'NOT EQUAL',
      value: 'NOT EQUAL',
    }, {
      label: 'IN',
      value: 'IN',
    }, {
      label: 'NOT IN',
      value: 'NOT IN',
    }, ],
  }, {
    type: 'text',
    label: 'Value',
    name: 'state_property_attribute_value_comparison',
  }, {
    type: 'text',
    label: 'Minimum',
    name: 'state_property_attribute_value_minimum',
  }, {
    type: 'text',
    label: 'Maximum',
    name: 'state_property_attribute_value_maximum',
  }, {
    type: 'text',
    label: 'Condition Group',
    name: 'condition_group_id',
  },
];
