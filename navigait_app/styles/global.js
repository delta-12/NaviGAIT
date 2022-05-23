import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({

  container: {
    flex: 1
  },

  table: {
    flex: 1, 
    justifyContent: "flex-start", 
    alignItems: "center"
  },

  uploadBackground: {
    flex: 1,
    alignItems: "center"
  },

  uploadCenterBox: {
    height: "50%",
    width: "85%",
    backgroundColor: "lightgrey",
    marginVertical: 40
  },

  importButtons: {
    flex: 4,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },

  inputText: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20
  },

  uploadButton: {
    flex: 2,
    margin: 20,
    alignItems: "center"
  }

})