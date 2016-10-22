import React, { Component, } from 'react';
import Table from '../../../../app/components/Table';

export function getMCRSegmentRulesetRulesHeader() {
  return {
    object : 'credit_bureau',
    field : 'fico_score',
    maximum : '850',
    minimum : '580',
    operand : 'and',
    or_group: 'n/a',
    output: 'n/a',
    // "output" : "credit_bureau_fico_score_pass",
// "or_group" : "n/a",
// "operand" : "and",
// "maximum" : "850",
// "minimum" : "580",
// "field" : "fico_score",
// "object" : "credit_bureau"
  };
}
export function getMCRSegmentRulesetRulesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width: 150,
      },
      heading: 'Object',
      label: data.object || ' ',
    }, {
      style: {
        width:150,
      },
      heading: 'Field',
      label: data.field || ' ',
    }, {
      style: {
        width: 100,
      },
      heading: 'Maximum',
      label: data.maximum,
    }, {
      style: {
        width: 100,
      },
      heading: 'Minimum',
      label: data.minimum,
    }, {
      style: {
        width: 100,
      },
      heading: 'Condition Group',
      label: data.or_group,
    }, {
      style: {
        width: 200,
      },
      heading: 'Output',
      label: data.output,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getMCRSegmentRulesetRulesTable(rules) {
  return (<Table
    name="segment-mcr-rules-table"
    pages={1}
    rows={rules}
    totalcount={rules.length}
    getBlankHeader={getMCRSegmentRulesetRulesHeader}
    getRenderRowData={getMCRSegmentRulesetRulesRenderRowData}
    noImage={true}
    noAction={true}
    {...this.props}
    >
  </Table>);
}

/*
"output" : "credit_bureau_fico_score_pass",
"or_group" : "n/a",
"operand" : "and",
"maximum" : "850",
"minimum" : "580",
"field" : "fico_score",
"object" : "credit_bureau"
 */
