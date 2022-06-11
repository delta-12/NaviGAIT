import { Component } from "react"
import { Text } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { PatientStack } from "./PatientStack"
import { DashboardStack } from "./DashboardStack"
import { GetAllPatients } from "../components/Patients/GetPatientInfo"

const Drawer = createDrawerNavigator();

export class Drawers extends Component {

  state = {
    data: {},
    errors: {}
  }

  setData = data => {
    this.setState({ data: data })
  }

  setErrors = errors => {
    this.setState({ errors: errors })
  }

  componentDidMount() {
    GetAllPatients(this.setData, this.setErrors)
  }

  render() {
    return (
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home Stack"  >
        <Drawer.Screen name="HomeStack" component={ DashboardStack } options={{title:"Dashboard"}} />
        {
          (this.state.data.success) ? this.state.data.patients.map(patient => <Drawer.Screen key={patient._id} name={patient.name} component={ PatientStack } options={{title: patient.name}} />) : null
        }
        {
          (this.state.errors.success === false) ? <Text>{this.state.errors.error}</Text> : null
        }
      </Drawer.Navigator>
    )
  }

}