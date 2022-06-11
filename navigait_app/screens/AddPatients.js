import React from 'react'
import { useState } from "react"
import { Text, View } from "react-native"
import { UploadTextInput } from "../components/Upload/UploadTextInput"
import { UploadButtonTemplate } from "../components/Upload/UploadButtonTemplate"
import { globalStyles } from "../styles/global"
import { AddPatient } from "../components/Patients/AddPatient"

export function AddPatients () {

    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})

    const [patientName, setPatientName] = useState("")

    const onPress = () => AddPatient(setData, setErrors, patientName)

    return (
        <View style={globalStyles.uploadBackground}>
            <View style={{height: "10%", width: "90%", backgroundColor: "lightgrey", marginTop: 20, flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
                <View style={{ height:"85%", width:"80%"}}>
                    <UploadTextInput placeholder="Enter Patient Name" text={patientName} setText={setPatientName} autoCapitalize="words" />
                </View>
                <View style={{height: "85%", width:"20%"}}>
                    <UploadButtonTemplate width="100%" height="100%" color="mediumseagreen" icon="account-multiple-plus" text="Add Patient" onPress={onPress} />
                </View>
            </View>
            <View style={{height: "4%", width: "90%", backgroundColor: "lightgrey", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
                {
                    (data.success) ? <Text>Successfully added patient {data.patient.name}.</Text> : <Text>{errors.name}</Text>
                }
            </View>
        </View>
    )
}