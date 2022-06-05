import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Analyze } from "../screens/Analyze"
import { Captures } from "../screens/Captures"
import { PatientLibrary } from "../screens/PatientLibrary"

const PStack = createNativeStackNavigator();

export function PatientStack() {
  return (
    <PStack.Navigator initialRouteName="Patient-Specific Library" >
      <PStack.Screen 
      name="Patient-Specific Library"
      component={ PatientLibrary }
      />
      <PStack.Screen 
      name="Analyze"
      component={ Analyze }
      />
      <PStack.Screen 
      name="Captures"
      component={ Captures }
      />
    </PStack.Navigator>
  );
}