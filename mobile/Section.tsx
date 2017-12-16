import * as React from 'react';
import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate, sectionExist} from './navigation/navigation';
import {Link} from '../types';
import {getLinkFromNav} from './navigation/Root';
import {connect} from 'react-redux';

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

const onPress = (link: string, navigation: any) => {
  if (sectionExist(link)) {
    navigation.navigate('Home', {link})
  } else {
    Alert.alert(`Cannot find any section with id = ${link}`);
  }
}

class Section extends React.Component<any> {
  render() {
    const props = this.props;
    const section = navigate(getLinkFromNav(props.navigation));
    return <View style={s.container}>
      <FlatList
        keyExtractor={(item, index) => item.link + index}
        data={section.links}
        renderItem={({item}: { item: Link }) => <Item {...item}
                                                      onPress={() => onPress(item.link, props.navigation)}/>}
      />
    </View>;
  };
}

export default connect()(Section);

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
