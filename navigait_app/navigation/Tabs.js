import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react"
import {Dashboard} from "./DashboardStack"
import {Upload} from "../screens/Upload"
import { AddPatients } from '../screens/AddPatients';

const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#4bb8b2',
        title: 'NaviGAIT',
        headerStyle: {
          backgroundColor: '#4bb8b2',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },        
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="upload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPatients"
        component={ AddPatients }
        options={{
          tabBarLabel: "Add Patients",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}