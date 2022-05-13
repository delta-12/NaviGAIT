import { Button, View, Text } from 'react-native';
import React from 'react';
import {globalStyles} from "../styles/global"

export function Analyze() {
  return (
    <View style={globalStyles.container}>
      <View style={{flex: 8, margin: 40, backgroundColor: 'black'}}>
        <Text style={{color: "white"}}>Video Player</Text> 
      </View>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
       <Button title="Capture"/>
       <Button title="Export"/>
      </View>
    </View>
  );
}