import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import JobVacancies from '../screens/JobVacancies';
import JobDetails from '../screens/JobDetails';

const Stack = createStackNavigator();

const JobsNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="JobVacancies"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="JobVacancies" component={JobVacancies} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
    </Stack.Navigator>
  );
};

export default JobsNavigation;
