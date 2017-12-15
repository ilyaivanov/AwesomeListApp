import * as React from 'react';
import repository from '../data/models/awesome'
import {navigate} from '../data/models/navigation'
import List from './List';
import {StackNavigator} from 'react-navigation';
import {setStatic} from 'recompose';

export const getLinkFromNav = (navigation: any): string =>
  navigation.state.params ? navigation.state.params.link : '';

const withTitle = (Component: any) =>
  setStatic('navigationOptions', ({navigation}: any) => ({
    title: navigate(repository, getLinkFromNav(navigation)).title,
  }))(Component);


const ModalStack = StackNavigator({
  Home: {
    screen: withTitle(List),
  },
});

//class-based container to make hot-reloading working
export default class App extends React.Component {
  render() {
    return <ModalStack/>;
  }
};
