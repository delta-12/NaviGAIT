import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Library} from "../screens/Library"
import {Analyze} from "../screens/Analyze"

const Stack = createNativeStackNavigator();

export function Dashboard() {
  return (
    <Stack.Navigator initialRouteName="Library">
      <Stack.Screen 
      name="Library" 
      component={Library}
      />
      <Stack.Screen 
      name='Analyze' 
      component={Analyze}
      />
    </Stack.Navigator>
  );
}