import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SubmitAvatar from '../screens/SubmitAvatar';
import SubmitCurriculum from '../screens/SubmitCurriculum';

const Stack = createStackNavigator();

const AuthNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.RevealFromBottomAndroid,
      }}
    >
      <Stack.Screen name="SingIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SubmitAvatar" component={SubmitAvatar} />
      <Stack.Screen name="SubmitCurriculum" component={SubmitCurriculum} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
