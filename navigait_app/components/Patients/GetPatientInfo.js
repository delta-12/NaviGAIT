import axios from "axios"

export const GetAllPatients = (setData, setErrors) => {

    setData({})
    setErrors({})

    axios
        .get("http://localhost:5000/api/patients/infoAll")
        .then(res => setData(res.data))
        .catch(err => setErrors(err.response.data))
}