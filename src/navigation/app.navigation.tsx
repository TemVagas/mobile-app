import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { color as colors, font } from '../constants/index';

import JobsNavigation from './jobs.navigation';
import AuthNavigation from './auth.navigation';
import UserNavigation from './user.navigation';

import { useAuth } from '../contexts/auth';

const Tab = createBottomTabNavigator();

function AppNavigation() {
  const { signed } = useAuth();

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
        component={signed ? UserNavigation : AuthNavigation}
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
