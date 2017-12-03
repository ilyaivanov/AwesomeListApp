import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import models from '../data/models/awesome';
import {Link} from "../types";

const Item = ({title}: { title: string }) => <TouchableOpacity style={s.item}>
  <View style={s.sampleIcon}/>
  <Text>{title}</Text>
</TouchableOpacity>;

export default () => <View style={s.container}>
  <FlatList
    keyExtractor={item => item.title}
    data={models.links}
    renderItem={({item}: { item: Link }) => <Item title={item.title}/>}
  />
</View>;


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
