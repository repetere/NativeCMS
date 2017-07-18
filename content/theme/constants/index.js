
export default {
  pipelines: {
    all: {
      // BASE_URL: 'https://pas-dev.promisefinancial.net:8885/pas/data/v2/',
      BASE_URL: 'https://pas-development.promisefinancial.net/pas/data/v2/',
    },
    engines: {
      GET_INDEX:'engines',
      POST_NEW:'engines',
      POST_UPDATE:'engines/',
    },
    resources: {
      GET_INDEX:'resources',
      POST_NEW:'resources',
      POST_UPDATE:'resources/',
    },
    parsers: {
      GET_INDEX:'parsers',
      POST_NEW:'parsers',
      POST_UPDATE:'parsers/',
    },
    segments: {
      GET_INDEX:'segments',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    customers: {
      GET_INDEX:'customers',
    },
    applications: {
      GET_INDEX:'applications',
    },
    items: {
      GET_INDEX:'items?format=json',
      POST_UPDATE:'items/',
    },
  },
  models: {
    all: {
      // BASE_URL: 'https://pas-dev.promisefinancial.net:8885/pas/data/v2/',
      BASE_URL: 'https://pas-development.promisefinancial.net/pas/data/v2/',
    },
    creditengines: {
      GET_INDEX:'creditengines',
      POST_NEW:'creditengines',
      POST_UPDATE:'creditengines/',
    },
    resources: {
      GET_INDEX:'resources',
      POST_NEW:'resources',
      POST_UPDATE:'resources/',
    },
    parsers: {
      GET_INDEX:'parsers',
      POST_NEW:'parsers',
      POST_UPDATE:'parsers/',
    },
    mcr_segments: {
      GET_INDEX:'segments?fq=category|||in|||mcr',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    score_segments: {
      GET_INDEX:'segments?fq=category|||in|||score',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    pricing_segments: {
      GET_INDEX:'segments?fq=category|||in|||pricing',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    adverse_segments: {
      GET_INDEX:'segments?fq=category|||in|||adverse',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    limit_segments: {
      GET_INDEX:'segments?fq=category|||in|||limit',
      POST_NEW:'segments',
      POST_UPDATE:'segments/',
    },
    mcr_calculations: {
      GET_INDEX:'calculations?fq=category|||in|||mcr',
      POST_NEW:'calculations',
      POST_UPDATE:'calculations/',
    },
    score_calculations: {
      GET_INDEX:'calculations?fq=category|||in|||score',
      POST_NEW:'calculations',
      POST_UPDATE:'calculations/',
    },
    pricing_calculations: {
      GET_INDEX:'calculations?fq=category|||in|||pricing',
      POST_NEW:'calculations',
      POST_UPDATE:'calculations/',
    },
    adverse_calculations: {
      GET_INDEX:'calculations?fq=category|||in|||adverse',
      POST_NEW:'calculations',
      POST_UPDATE:'calculations/',
    },
    limit_calculations: {
      GET_INDEX:'calculations?fq=category|||in|||limit',
      POST_NEW:'calculations',
      POST_UPDATE:'calculations/',
    },
    customers: {
      GET_INDEX:'customers',
    },
    applications: {
      GET_INDEX:'applications',
    },
    items: {
      GET_INDEX:'items?format=json',
      POST_UPDATE:'items/',
    },
  },
};
