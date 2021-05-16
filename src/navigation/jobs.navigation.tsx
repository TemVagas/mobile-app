import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import JobVacancies from '../screens/Home';
import Profile from '../screens/Profile';
import VacancyDetails from '../screens/Details/vacancy';
import RecolocationDetails from '../screens/Details/recolocation';

const Stack = createStackNavigator();

const JobsNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="JobVacancies"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Stack.Screen name="JobVacancies" component={JobVacancies} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="VacancyDetails" component={VacancyDetails} />
      <Stack.Screen
        name="RecolocationDetails"
        component={RecolocationDetails}
      />
    </Stack.Navigator>
  );
};

export default JobsNavigation;
