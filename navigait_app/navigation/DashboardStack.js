import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Library} from "../screens/Library"
import {Analyze} from "../screens/Analyze"
import { Captures } from '../screens/Captures';

const Stack = createNativeStackNavigator();

export function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen 
      name="Library" 
      component={Library}
      />
      <Stack.Screen 
      name="Analyze"
      component={Analyze}
      />
      <Stack.Screen 
      name="Captures"
      component={Captures}
      />
    </Stack.Navigator>
  );
}