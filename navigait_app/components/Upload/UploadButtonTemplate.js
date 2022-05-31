import { Text, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export const UploadButtonTemplate = props => {

    return (
        <TouchableOpacity
            style={{width: props.width, height: props.height, backgroundColor: props.color, justifyContent: "center", alignItems: "center"}}
            onPress={props.onPress}
        >
            <MaterialCommunityIcons name={props.icon} color={"white"} size={20} />
            <Text style={{color: "white"}}>{props.text}</Text>
        </TouchableOpacity>
    )

}