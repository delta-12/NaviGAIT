import React from 'react';
import { Text, View, Button, StyleSheet, StatusBar, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {globalStyles} from '../styles/global'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Upload() {
  const [text, setText] = React.useState("");
  return (
    
    <View style={globalStyles.uploadBackground}>
      <View style={globalStyles.uploadCenterBox}>
        <View style={globalStyles.importButtons}>
            <TouchableOpacity style={{height: "100%", width: "45%", backgroundColor: 'crimson', justifyContent:   "center", alignItems: "center"}}>
              <MaterialCommunityIcons name="video" color={"white"} size={20} />
              <Text style={{color: "white"}}>Take Video</Text>
            </TouchableOpacity>
          <View style={{height: "100%", width: "10%" }}/>
          <TouchableOpacity style={{height: "100%", width: "45%", backgroundColor: 'crimson', justifyContent: "center", alignItems: "center"}}>
              <MaterialCommunityIcons name="file-import-outline" color={"white"} size={20} />
              <Text style={{color: "white"}}>Choose From Library</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.inputText}>
          <TextInput
            placeholder='Enter Patient Name'
            placeholderTextColor='grey'
            autoCapitalize='words'
            value={text}
            onChangeText={text => setText(text)}
            style={{flex: 1, backgroundColor: '#ffffff',}}
          />
        </View>
        <View style={globalStyles.inputText}>
          <TextInput
            placeholder='Enter Description'
            placeholderTextColor='grey'
            autoCapitalize='words'
            value={text}
            onChangeText={text => setText(text)}
            style={{flex: 1, backgroundColor: '#ffffff',}} />
        </View>
        <View style={globalStyles.uploadButton}>
          <TouchableOpacity style={{height: "100%", width: "100%", backgroundColor: 'mediumseagreen', justifyContent: "center", alignItems: "center"}}>
              <MaterialCommunityIcons name="upload" color={"white"} size={20} />
              <Text style={{color: "white"}}>Upload</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
   
  );
}