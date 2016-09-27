/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component, PropTypes, } from 'react';
import { View, Platform, AsyncStorage, ActivityIndicator,ActivityIndicatorIOS } from 'react-native';
import Tabs from 'react-native-tabs';
import AppConfigExtensions from '../../../content/config/extensions.json';
import AppConfigSettings from '../../../content/config/settings.json';
import AppLoginSettings from '../../../content/config/login.json';
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
import constants from '../../constants';
import { historySettings, getHistory, } from '../../routers/history';
import { Router, Route, /*browserHistory, hashHistory, createMemoryHistory,*/ } from 'react-router';
import { getComponentFromRouterLocation, getTabFromLocation, } from '../../util/location';

const history = getHistory(historySettings, AppConfigSettings, store);
const LoadingIndicators = (Platform.OS === 'web') ? ActivityIndicatorIOS : ActivityIndicator;
const defaultExtensionRoute = AppConfigSettings.defaultExtensionRoute || 'home';
const defaultExtensionComponent = AppConfigSettings.defaultExtensionComponent || 'Home';

class MainApp extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    /**
     *THIS IS FOR LANDING ON A DIFFERENT PAGE
    */
    let pageLocation = getTabFromLocation(AppExtensions, getComponentFromRouterLocation(this.props.location.pathname));
    if (pageLocation !== defaultExtensionRoute) {
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
  componentDidMount() {
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
    ])
      .then((results) => {
        let jwt_token = results[ 0 ];
        let jwt_token_data = JSON.parse(results[ 1 ]);
        let jwt_user_profile = JSON.parse(results[ 2 ]);

        // console.log('MAIN componentDidMount jwt_token', jwt_token);
        // console.log('MAIN componentDidMount jwt_token_data', jwt_token_data);
        // console.log('MAIN componentDidMount jwt_user_profile', jwt_user_profile);
        if (jwt_token_data && jwt_user_profile) {
          let url = AppLoginSettings.login.url;
          let response = {};
          let json = {
            token: jwt_token_data.token,
            expires: jwt_token_data.expires,
            timeout: jwt_token_data.timeout,
            user: jwt_user_profile,
          };
          this.props.saveUserProfile(url, response, json);
        } else if(jwt_token) {
          this.props.getUserProfile(jwt_token);
        }
        else {
          console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
        }
        this.setState({
          jwt_token,
        });        
        this.props.initialAppLoaded();
      })
      .catch((error) => {
        console.log('MAIN componentDidMount: JWT USER Login Error.', error);
        this.props.logoutUser();
      });
  }
  onChangePage(el) {
    this.context.router.push(`/${el.props.name}`);
    this.props.onChangePage(el.props.name);
  }
  render() {
    let self = this;
    let CurrentApp = AppExtensions[ capitalize(this.props.page.location) ] || AppExtensions[defaultExtensionComponent];
    let displayContent = (
      <View style={[styles.container]}>
        <CurrentApp {...this.props}  />
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
    let displayLogin = (
      <View style={[styles.container]}>
        <AppExtensions.Login {...this.props}  />
      </View>
    );
    let displayLoading = (
      <View style={[styles.container]}>
        <LoadingIndicators
          animating={this.state.animating}
          style={[{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
          }, {
            height: 80,
          }]}
          size="large"
        />
      </View>
    );
    // console.log('MAIN APP: this.props', this.props);
    if (this.props.page.initial_app_state_loaded === false) {
      // console.log('MAIN APP: this.props.page.initial_app_state_loaded', this.props.page.initial_app_state_loaded);
      return displayLoading;
    } else if (this.props.user.isLoggedIn) {
      // console.log('MAIN APP: this.props.user.isLoggedIn', this.props.user.isLoggedIn);
      return displayContent;
    } else {
      // console.log('MAIN APP: displayLogin');
      return displayLogin;      
    }
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    user: state.user,
    tabBarExtensions: state.tabBarExtensions,
    fetchData: state.fetchData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialAppLoaded:()=>store.dispatch(actions.pages.initialAppLoaded()),
    onChangePage:(location) => store.dispatch(actions.pages.changePage(location)),
    requestData: (url, options, responseFormatter) => store.dispatch(actions.fetchData.request(url, options, responseFormatter)),
    setLoginStatus: (loggedIn) => store.dispatch(actions.user.setLoginStatus(loggedIn)),
    getUserProfile: (jwt_token) => store.dispatch(actions.user.getUserProfile(jwt_token)),
    saveUserProfile: (url, response, json) => store.dispatch(actions.user.saveUserProfile(url, response, json)),
    loginUser: (formdata) => store.dispatch(actions.user.loginUser(formdata)),
    logoutUser: () => store.dispatch(actions.user.logoutUser()),
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