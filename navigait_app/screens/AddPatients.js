import React from 'react'
import { useState } from "react"
import { Text, View } from "react-native"
import { UploadTextInput } from "../components/Upload/UploadTextInput"
import { UploadButtonTemplate } from "../components/Upload/UploadButtonTemplate"
import { globalStyles } from "../styles/global"

export function AddPatients () {

    const [patient, setPatient] = useState("")

    return (
        <View style={globalStyles.uploadBackground}>
            <View style={{height: "10%", width: "90%", backgroundColor: "lightgrey", marginTop: 20, flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
            
            <View style={{ height:"85%", width:"80%"}}>
                <UploadTextInput placeholder="Enter Patient Name" text={patient} setText={setPatient} autoCapitalize="words" />
            </View>
            <View style={{height: "85%", width:"20%"}}>
                <UploadButtonTemplate width="100%" height="100%" color="mediumseagreen" icon="account-multiple-plus" text="Add Patient" />
            </View>
        </View>
      </View>
    )
}