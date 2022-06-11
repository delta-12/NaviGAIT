import axios from "axios"

export const AddPatient = (setData, setErrors, patientName) => {

    setData({})
    setErrors({})

    const newPatient = {
        name: patientName
    }

    axios
        .post("http://localhost:5000/api/patients/addPatient", newPatient)
        .then(res => setData(res.data))
        .catch(err => setErrors(err.response.data))
}