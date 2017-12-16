import * as React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from '../data/navigation';
import {Link} from '../types';
import {getLinkFromNav} from './App';
import {isLocalLink} from '../data/utils';
import repository from '../data/models/sindresorhus_awesome';

type Props = Link & {
  onPress: any
}

const Item = ({title, level, subtitle, onPress}: Props) => <TouchableOpacity style={[s.item, {paddingLeft: level * 20}]}
                                                                             onPress={onPress}>
  <View style={s.sampleIcon}/>
  <View style={s.textContainer}>
    <Text style={s.title}>{title}</Text>
    {
      subtitle ?
        <Text style={s.subtitle}>{subtitle}</Text> :
        null
    }
  </View>
</TouchableOpacity>;

const onPress = (link: string, navigation: any) =>
  isLocalLink(link) ? navigation.navigate('Home', {link}) : undefined;

export default (props: any) => {
  const section = navigate(repository, getLinkFromNav(props.navigation));
  return <View style={s.container}>
    <FlatList
      keyExtractor={(item, index) => item.link + index}
      data={section.links}
      renderItem={({item}: { item: Link }) => <Item {...item}
                                                    onPress={() => onPress(item.link, props.navigation)}/>}
    />
  </View>;
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sampleIcon: {
    margin: 10,
    height: 30,
    width: 30,
    backgroundColor: 'grey'
  },
  title: {
    fontSize: 16,
  },

  subtitle: {
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
  }
});
