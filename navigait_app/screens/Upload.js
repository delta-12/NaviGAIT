import { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { globalStyles } from "../styles/global"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { UploadVideo } from "../components/Upload/UploadVideo"
import { UploadTextInput } from "../components/Upload/UploadTextInput"
import { UploadButton } from "../components/Upload/UploadButton"

export function Upload() {

  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [loaded, setLoaded] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [title, setTitle] = useState("")
  const [patient, setPatient] = useState("")
  const [description, setDescription] = useState("")

  return (
    <View style={globalStyles.uploadBackground}>
      <View style={globalStyles.uploadCenterBox}>
        <View style={globalStyles.importButtons}>
          <UploadButton width="45%" height="100%" color="crimson" icon="video" text="Take Video" />
          <View style={{height: "100%", width: "10%" }}/>
          <UploadButton width="45%" height="100%" color="crimson" icon="file-import-outline" text="Choose From Library" />
        </View>
        <UploadTextInput placeholder="Enter Title" text={title} setText={setTitle} />
        <UploadTextInput placeholder="Enter Patient Name" text={patient} setText={setPatient} />
        <UploadTextInput placeholder="Enter Description" text={description} setText={setDescription} /> 
        <View style={globalStyles.uploadButton}>
          <UploadButton width="100%" height="100%" color="mediumseagreen" icon="upload" text="Upload" />
        </View>
      </View>
    </View>
  )

}