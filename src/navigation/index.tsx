import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from '../screens/SignIn';
import JobVacancies from '../screens/JobVacancies';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="JobVacancies"
        component={JobVacancies}
        options={{
          title: 'Anúcios',
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Entrar',
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
