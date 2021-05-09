import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import SignIn from '../screens/SignIn';
import JobVacancies from '../screens/JobVacancies';

import { color as colors, font } from '../constants';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: font.regular,
        },
        keyboardHidesTabBar: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text.tertiary,
        adaptive: true,
        labelPosition: 'beside-icon',
      }}
    >
      <Tab.Screen
        name="JobVacancies"
        component={JobVacancies}
        options={{
          title: 'Anúcios',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus-circle" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Entrar',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;
