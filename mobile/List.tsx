import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import repository from '../data/models/awesome';
import {navigate} from '../data/models/navigation';
import {Link} from "../types";
import {getLinkFromNav} from "./App";
import {isLocalLink} from "../data/utils";

const Item = ({title, onPress}: { title: string, onPress: any }) => <TouchableOpacity style={s.item} onPress={onPress}>
  <View style={s.sampleIcon}/>
  <Text>{title}</Text>
</TouchableOpacity>;

export default (props: any) => {
  const section = navigate(repository, getLinkFromNav(props.navigation));
  return <View style={s.container}>
    <FlatList
      keyExtractor={item => item.link}
      data={section.links}
      renderItem={({item}: { item: Link }) => <Item title={item.title}
                                                    onPress={() => isLocalLink(item.link) ? props.navigation.navigate('Home', {link: item.link}) : undefined}/>}
    />
  </View>;
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sampleIcon: {
    margin: 10,
    height: 30,
    width: 30,
    backgroundColor: 'grey'
  }
});
