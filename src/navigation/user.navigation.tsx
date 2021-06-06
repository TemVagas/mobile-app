import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import AddVacancy from '../screens/AddVacancy';
import UpdateUser from '../screens/UpdateUser';
import UpdateVacancy from '../screens/UpdateVacancy';
import ChangePassword from '../screens/ChangePassword';

const Stack = createStackNavigator();

const UserNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="AddVacancy" component={AddVacancy} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateVacancy" component={UpdateVacancy} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
