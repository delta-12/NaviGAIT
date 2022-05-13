import { Text, View, Button, StyleSheet, StatusBar, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {globalStyles} from "../styles/global"
import {Table} from "../components/Table/Table"
import React from 'react';

export function Library() {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.table}>

        <Table/>
              
      </View>
    </View>
  );
}