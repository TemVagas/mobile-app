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
import MyDetails from '../screens/MyDetails';
import VacancyDetails from '../screens/VacancyDetails';
import SubmitAvatar from '../screens/SubmitAvatar';
import SubmitCurriculum from '../screens/SubmitCurriculum';

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
      <Stack.Screen name="MyDetails" component={MyDetails} />
      <Stack.Screen name="VacancyDetails" component={VacancyDetails} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="SubmitAvatar" component={SubmitAvatar} />
      <Stack.Screen name="SubmitCurriculum" component={SubmitCurriculum} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
