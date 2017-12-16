import * as React from 'react';
import {findSection} from './navigation';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import {setStatic} from 'recompose';
import List from '../Section';
import {root} from '../../cli/util';

export const getLinkFromNav = (navigation: any): string =>
  navigation.state.params ? navigation.state.params.link : '';


const withTitle = (Component: any) =>
  setStatic('navigationOptions', ({navigation}: any) => ({
    title: findSection(getLinkFromNav(navigation)).title,
  }))(Component);


const ModalStack = StackNavigator({
  Home: {
    screen: withTitle(List),
  },
});

const initialState = ModalStack.router.getStateForAction(ModalStack.router.getActionForPathAndParams('Home'), null);

export const nav = (state = initialState, action: any) => {
  const nextState = ModalStack.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


const Navi = (props: any) => {
  const navigation = addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.nav,
  });
  return <ModalStack navigation={navigation}/>;
}

const mapStateToProps = (state: any) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(Navi);
