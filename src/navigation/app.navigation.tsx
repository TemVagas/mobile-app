import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import SignIn from '../screens/SignIn';
import JobsNavigation from './jobs.navigation';

import { color as colors, font } from '../constants';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontFamily: font.regular,
          fontSize: wp(4),
        },
        keyboardHidesTabBar: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text.tertiary,
        adaptive: true,
        labelPosition: 'beside-icon',
      }}
    >
      <Tab.Screen
        name="JobsNavigation"
        component={JobsNavigation}
        options={{
          title: 'Anúcios',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="plus-circle"
              size={focused ? 22 : 18}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Entrar',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="user-circle"
              size={focused ? 22 : 18}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;
