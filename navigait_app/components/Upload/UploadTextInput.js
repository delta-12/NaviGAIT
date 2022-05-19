import React from "react"
import { TextInput, View } from "react-native"
import { globalStyles } from "../../styles/global"

export const UploadTextInput = props => {

  return (
    <View style={globalStyles.inputText}>
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor='grey'
            autoCapitalize='words'
            value={props.text}
            onChangeText={text => props.setText(text)}
            style={{flex: 1, backgroundColor: '#ffffff',}}
        />
    </View>
  )

}