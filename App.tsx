import 'react-native-gesture-handler';

import React from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { LogBox } from 'react-native';

import AppProvider from './src/contexts/index';

import Navigation from './src/navigation';
import { color } from './src/constants';

export default function App() {
  LogBox.ignoreAllLogs();

  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor={color.background} />
      <AppProvider>
        <Navigation />
      </AppProvider>
    </NavigationContainer>
  );
}
