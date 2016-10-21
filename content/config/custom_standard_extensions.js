import Home from '../theme/components/Home';
import Pipelines from '../theme/components/Pipelines';
import Models from '../theme/components/Models';
// import Pipelines from '../theme/components/Stats';
import StatsItems from '../theme/components/Stats/items';
import StatsItemDetail from '../theme/components/Stats/itemDetail';
// import Credit from '../theme/components/Credit';
// import EngineDetail from '../theme/components/Pipelines/engineDetail';

exports.custom_extensions = {
  Home,
  Pipelines,
  Models,
  // Stats,
  // Credit,
};
exports.custom_routes = {
  '/':Home,
  '/home':Home,
  '/pipelines':Pipelines,
  '/pipelines/engines':Pipelines,
  '/pipelines/engines/:id':Pipelines,
  '/pipelines/resources':Pipelines,
  '/pipelines/resources/:id':Pipelines,
  '/pipelines/parsers':Pipelines,
  '/pipelines/parsers/:id':Pipelines,
  '/pipelines/segments':Pipelines,
  '/pipelines/segments/:id':Pipelines,
  '/models':Models,
  '/models/engines':Models,
  '/models/engines/:id':Models,
  '/models/resources':Models,
  '/models/resources/:id':Models,
  '/models/parsers':Models,
  '/models/parsers/:id':Models,
  '/models/segments':Models,
  '/models/segments/:id':Models,
  '/operations':Pipelines,
  '/operations/engines':Pipelines,
  '/operations/engines/:id':Pipelines,
  '/operations/resources':Pipelines,
  '/operations/resources/:id':Pipelines,
  '/operations/parsers':Pipelines,
  '/operations/parsers/:id':Pipelines,
  '/operations/segments':Pipelines,
  '/operations/segments/:id':Pipelines,
  '/data':Pipelines,
  '/stats':Pipelines,
  '/modeler':Pipelines,
};

// export default custom_extensions;