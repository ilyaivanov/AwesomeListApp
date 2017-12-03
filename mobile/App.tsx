import * as React from 'react';
import section from '../data/models/awesome'
import List from "./List";
import {StackNavigator} from "react-navigation";
import {setStatic} from 'recompose';


const Home = setStatic('navigationOptions', {
  title: section.title,
});

const ModalStack = StackNavigator({
  Home: {
    screen: Home(List),
  },
});



//class-based container to make hot-reloading working
export default class App extends React.Component {
  render() {
    return <ModalStack/>;
  }
};
