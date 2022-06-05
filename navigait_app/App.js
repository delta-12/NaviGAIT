import 'react-native-gesture-handler';
import * as React from 'react';
import { Component } from 'react';
import {Tabs} from "./navigation/Tabs"
import { NavigationContainer } from '@react-navigation/native';
//import { Text, View, Button, StyleSheet, StatusBar, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { DataTable } from 'react-native-paper';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Video, AVPlaybackStatus } from 'expo-av';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import { globalStyles } from "./styles/global"
//import {TableRow} from "./components/Table/TableRow"
//import { useNavigation } from '@react-navigation/native';
//import {Table} from "./components/Table/Table"
//import {Dashboard} from "./navigation/Dashboard"
//import {Library} from "./screens/Library"
//import {Analyze} from "./screens/Analyze"



 export default class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    );
  }
}
