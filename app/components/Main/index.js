/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component, PropTypes, } from 'react';
import { View, Platform, } from 'react-native';
import Tabs from 'react-native-tabs';
import AppConfigExtensions from '../../../content/config/extensions.json';
import AppConfigSettings from '../../../content/config/settings.json';
import AppExtensions from './extensions';
import styles from '../Styles/shared';
import TabIcon from '../AppTabs/TabIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import capitalize from 'capitalize';
import { createStore, } from 'redux';
import { Provider, connect, } from 'react-redux';
import combinedReducers from '../../reducers';
import store from '../../stores';
import actions from '../../actions';
import { historySettings, getHistory, } from '../../routers/history';
import { Router, Route, /*browserHistory, hashHistory, createMemoryHistory,*/ } from 'react-router';
import { getComponentFromRouterLocation, getTabFromLocation, } from '../../util/location';

const history = getHistory(historySettings, AppConfigSettings, store);

class MainApp extends Component{
  // constructor(props) {
  //   console.log('MainApp props', props);
  //   super(props);
  //   // let tabs = AppConfigExtensions.standard.concat();//.splice(3, 0, AppConfigExtensions.more);
  //   // tabs.splice(4, 0, AppConfigExtensions.more).slice(0, 4);
  //   // this.state = { 
  //   //   page: getTabFromLocation(AppExtensions, getComponentFromRouterLocation(props.location.pathname)),
  //   //   tabBarExtensions: tabs.slice(0,5),
  //   // };
  // }
  componentWillMount() {
    /**
     *THIS IS FOR LANDING ON A DIFFERENT PAGE
    */
    let pageLocation = getTabFromLocation(AppExtensions, getComponentFromRouterLocation(this.props.location.pathname));
    if (pageLocation !== 'home') {
      this.props.onChangePage(pageLocation);
    }
  }
  componentWillReceiveProps(nextProps) {
    /**
     *THIS WILL HANDLE BROWSER NAVIGATION
    */
    let incomingAppFromLocation = getTabFromLocation(AppExtensions, getComponentFromRouterLocation(nextProps.location.pathname));
    if (incomingAppFromLocation !== this.props.page.location) {
      this.props.onChangePage(incomingAppFromLocation);
    }
  }
  onChangePage(el) {
    this.context.router.push(`/${el.props.name}`);
    this.props.onChangePage(el.props.name);
  }
  render() {
    let self = this;
    let CurrentApp = AppExtensions[ capitalize(this.props.page.location) ] || AppExtensions.Home;
    return (
      <View style={styles.container}>
        <CurrentApp {...this.props} />
        <Tabs selected={this.props.page.location} 
          style={styles.tabBar}
          onSelect={this.onChangePage.bind(this)}>
            {this.props.tabBarExtensions.map((ext)=>{
              return  (<TabIcon 
              key={ext.name} 
              ext={ext}  
              name={ext.name} 
              icon={ext.icon}
              location={this.props.location}
              changePage={this.onChangePage.bind(this)}
              onSelect={this.onChangePage.bind(self)}
              />);
            })}
        </Tabs>
      </View>
    );
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    tabBarExtensions: state.tabBarExtensions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
    // onWithdraw:(amount) => bankStore.dispatch(bankActionCreators.withdrawFromAccount(amount)),
    // onToggle:() => bankStore.dispatch(bankActionCreators.toggleInfo()),
  };
};

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp);


class Main extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="*" component={MainAppContainer} />
        </Router>
      </Provider>
    );
  }
}

export default Main;