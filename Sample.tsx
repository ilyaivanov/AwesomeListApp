import * as React from 'react';
import {Text, View} from 'react-native';

interface Props {
  type: 'sample' | 'too much'
}

export default ({type}: Props) => <View>
  <Text>Sample</Text>
  <Text>{type}</Text>
</View>