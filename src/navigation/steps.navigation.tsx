import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import First from '../screens/Steps/first';
import Second from '../screens/Steps/second';

const Stack = createStackNavigator();

const StepsNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="First"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="First" component={First} />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
  );
};

export default StepsNavigation;
