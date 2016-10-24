import React, { Component, } from 'react';
import Table from '../../../../app/components/Table';

/**
  "label" : "Constant variable set to 1",
  "object" : "constant",
  "field" : "constant",
  "minimum" : "1",
  "maximum" : "1",
  "weight" : "816",
  "average_weight" : "n/a",
  "reason_code" : "n/a",
  "category" : "base_score",
  "score_cap" : "n/a"
 */
export function getScoringSegmentRulesetRulesHeader() {
  return {
    object: 'constant',
    field: 'constant',
    minimum: '1',
    maximum: '1',
    weight: '816',
    average_weight: 'n/a',
    reason_code: 'n/a',
    category: 'base_score',
    score_cap: 'n/a',
    label: 'Constant variable set to 1',
  };
}
export function getScoringSegmentRulesetRulesRenderRowData(data) {
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
      // usePRE:true,  
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
        width: 80,
      },
      heading: 'Weight',
      label: data.weight,
    }, {
      style: {
        width: 80,
      },
      heading: 'Avg Weight',
      label: data.average_weight,
    }, {
      style: {
        width: 80,
      },
      heading: 'Reason Code',
      label: data.reason_code,
    }, {
      style: {
        width: 100,
      },
      heading: 'Category',
      label: data.category,
    }, {
      style: {
        width: 100,
      },
      heading: 'Score Cap',
      label: data.score_cap,
    }, {
      style: {
        width: 200,
      },
      usePRE:true,  
      heading: 'Label',
      label: data.label,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getScoringSegmentRulesetRulesTable(rules) {
  return (<Table
    name="segment-scoring-rules-table"
    pages={1}
    rows={rules}
    totalcount={rules.length}
    getBlankHeader={getScoringSegmentRulesetRulesHeader}
    getRenderRowData={getScoringSegmentRulesetRulesRenderRowData}
    noImage={true}
    noAction={true}
    {...this.props}
    >
  </Table>);
}

export function getPricingSegmentRulesetRulesHeader() {
  return {
    minimum_full_score: '0',
    maximum_full_score: '230',
    rating: '36',
    annual_interest_rate: '0.2526',
    origination_fee_rate: '0.06',
    apr: '0.2999',
    expected_annual_default_rate: '0.10233',
    term: '36',
    guarantor_required: 'yes',
  };
}
export function getPricingSegmentRulesetRulesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width: 80,
      },
      heading: 'Minimum',
      label: data.minimum_full_score || ' ',
    }, {
      style: {
        width:80,
      },
      // usePRE:true,  
      heading: 'Maximum',
      label: data.maximum_full_score || ' ',
    }, {
      style: {
        width: 70,
      },
      heading: 'Rating',
      label: data.rating,
    }, {
      style: {
        width: 100,
      },
      heading: 'Annual Interest Rate',
      label: data.annual_interest_rate,
    }, {
      style: {
        width: 100,
      },
      heading: 'Origination Fee Rate',
      label: data.origination_fee_rate,
    }, {
      style: {
        width: 100,
      },
      heading: 'APR',
      label: data.apr,
    }, {
      style: {
        width: 100,
      },
      // usePRE:true,  
      heading: 'Expected Annual Default Rate',
      label: data.expected_annual_default_rate,
    }, {
      style: {
        width: 80,
      },
      // usePRE:true,  
      heading: 'Term',
      label: data.term,
    }, {
      style: {
        width: 100,
      },
      // usePRE:true,  
      heading: 'Guarantor',
      label: data.guarantor_required,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getPricingSegmentRulesetRulesTable(rules) {
  return (<Table
    name="segment-pricing-rules-table"
    pages={1}
    rows={rules}
    totalcount={rules.length}
    getBlankHeader={getPricingSegmentRulesetRulesHeader}
    getRenderRowData={getPricingSegmentRulesetRulesRenderRowData}
    noImage={true}
    noAction={true}
    {...this.props}
    >
  </Table>);
}

export function getMCRSegmentRulesetRulesHeader() {
  return {
    object : 'credit_bureau',
    field : 'fico_score',
    maximum : '850',
    minimum : '580',
    operand : 'and',
    or_group: 'n/a',
    output: 'n/a',
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
      // usePRE:true,  
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
      // usePRE:true,  
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
  product: '3602',
  attribute: 'n/a',
  object: 'n/a',
  field: 'n/a',
  minimum: 'n/a',
  maximum: 'n/a',
  limit: '1',
  apply_to: 'loan_to_maximum_unsecured_high_credit',
  limit_type: 'cap',
  output: 'loan_to_maximum_unsecured_high_credit_pass',
  comment: 'This variable does not exist and needs to be created - rounded down to 4 decimals - Floor 6000 (to be changed in parser)',
 */
export function getLimitSegmentRulesetRulesHeader() {
  return {
    object: 'n/a',
    field: 'n/a',
    minimum: 'n/a',
    maximum: 'n/a',
    product: '3602',
    attribute: 'n/a',
    limit: '1',
    apply_to: 'loan_to_maximum_unsecured_high_credit',
    limit_type: 'cap', //cap,floor,equal
    output: 'loan_to_maximum_unsecured_high_credit_pass',
    comment: 'This variable does not exist and needs to be created - rounded down to 4 decimals - Floor 6000 (to be changed in parser)',
  };
}
export function getLimitSegmentRulesetRulesRenderRowData(data) {
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
      // usePRE:true,  
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
      heading: 'Product',
      label: data.product,
    }, {
      style: {
        width: 100,
      },
      heading: 'Attribute',
      label: data.attribute,
    }, {
      style: {
        width: 100,
      },
      heading: 'Limit',
      label: data.limit,
    }, {
      style: {
        width: 150,
      },
      // usePRE:true,  
      heading: 'Apply To',
      label: data.apply_to,
    }, {
      style: {
        width: 200,
      },
      // usePRE:true,  
      heading: 'Output',
      label: data.output,
    }, {
      style: {
        width: 200,
      },
      usePRE:true,  
      heading: 'Comment',
      label: data.comment,
    }],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getLimitSegmentRulesetRulesTable(rules) {
  return (<Table
    name="segment-limit-rules-table"
    pages={1}
    rows={rules}
    totalcount={rules.length}
    getBlankHeader={getLimitSegmentRulesetRulesHeader}
    getRenderRowData={getLimitSegmentRulesetRulesRenderRowData}
    noImage={true}
    noAction={true}
    {...this.props}
    >
  </Table>);
}

/**
reason_code_text: 'Corresponding reason code text',
reason_code: 'AS ENTERED',
value: 'TRUE',
variable: 'adverse_reason_codes',
source: 'processing',
fail_reason_label: 'Manual Codes',
step: 'step_1',
product: 'limits-360',
 */
export function getAdverseSegmentRulesetRulesHeader() {
  return {
    product: 'limits-360',
    step: 'step_1',
    fail_reason_label: 'Manual Codes',
    source: 'processing',
    variable: 'adverse_reason_codes',
    value: 'TRUE',
    reason_code: 'AS ENTERED',
    reason_code_text: 'Corresponding reason code text',
  };
}
export function getAdverseSegmentRulesetRulesRenderRowData(data) {
  return {
    columns: [{
      style: {
        width: 150,
      },
      heading: 'Product',
      label: data.product || ' ',
    }, {
      style: {
        width:150,
      },
      // usePRE:true,  
      heading: 'Step',
      label: data.step || ' ',
    }, {
      style: {
        width: 100,
      },
      heading: 'Fail Reason',
      label: data.fail_reason_label,
    }, {
      style: {
        width: 100,
      },
      heading: 'Source',
      label: data.source,
    }, {
      style: {
        width: 200,
      },
      heading: 'Variable',
      label: data.variable,
    }, {
      style: {
        width: 70,
      },
      heading: 'Value',
      label: data.value,
    }, {
      style: {
        width: 100,
      },
      heading: 'Reason Code',
      label: data.reason_code,
    }, {
      style: {
        width: 200,
      },
      usePRE:true,  
      heading: 'Reason Text',
      label: data.reason_code_text,
    }, ],
    action: {
      icon: {
        name:'ios-arrow-forward',
      },
    },
  };
}
export function getAdverseSegmentRulesetRulesTable(rules) {
  return (<Table
    name="segment-limit-rules-table"
    pages={1}
    rows={rules}
    totalcount={rules.length}
    getBlankHeader={getAdverseSegmentRulesetRulesHeader}
    getRenderRowData={getAdverseSegmentRulesetRulesRenderRowData}
    noImage={true}
    noAction={true}
    {...this.props}
    >
  </Table>);
}