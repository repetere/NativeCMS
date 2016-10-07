
export default {
  pipelines: {
    all: {
      BASE_URL: 'https://pas-dev.promisefinancial.net:8885/pas/data/v2/',
    },
    engines: {
      GET_INDEX:'engines',
    },
    resources: {
      GET_INDEX:'resources',
    },
    parsers: {
      GET_INDEX:'parsers',
    },
    segments: {
      GET_INDEX:'segments',
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
