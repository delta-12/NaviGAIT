import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/global"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { UploadTextInput } from "../components/Upload/UploadTextInput"

export function Upload() {

  const [patient, setPatient] = React.useState("")
  const [description, setDescription] = React.useState("")

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
        <UploadTextInput placeholder="Enter Patient Name" text={patient} setText={setPatient} />
        <UploadTextInput placeholder="Enter Description" text={description} setText={setDescription} /> 
        <View style={globalStyles.uploadButton}>
          <TouchableOpacity style={{height: "100%", width: "100%", backgroundColor: 'mediumseagreen', justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="upload" color={"white"} size={20} />
            <Text style={{color: "white"}}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}