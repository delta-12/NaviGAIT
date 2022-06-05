import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { PatientStack } from './PatientStack';
import { DashboardStack } from "./DashboardStack";

const Drawer = createDrawerNavigator();

export function Drawers() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home Stack"  >
      <Drawer.Screen name="HomeStack" component={ DashboardStack } options={{title:"Dashboard"}} />
      <Drawer.Screen name="PatientStack" component={ PatientStack } options={{title: "Patient-Specific Library"}} />
    </Drawer.Navigator>
  );
}