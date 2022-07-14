import * as React from 'react';
import {Text} from 'react-native';



const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {JSON.stringify(route.params.data)}</Text>;
};


export default ProfileScreen;