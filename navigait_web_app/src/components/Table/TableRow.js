import { Component } from "react"
import axios from "axios"

export default class TableRow extends Component {

    onDeleteClick = e => {
        e.preventDefault()
        const data = new FormData()
        data.append("videoID", this.props.id)
        data.append("fullTitle", this.props.fullTitle)
        data.append("processed", this.props.processed)
        axios.post("https://navigait-uploader.ddns.net:10444/api/videos/delete", data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const date = new Date(this.props.dateUploaded).toLocaleString().replace(":00 ", " ")
        return (
            <tr className="table-default">
                <th scope="row">{(date === "Invalid Date") ? "" : date}</th>
                <td>{this.props.title}</td>
                {
                (this.props.processed) ? <td><p className="text-success">Processed</p></td> : <td><p className="text-danger">Processing...</p></td>
                }
                <td>{this.props.patient}</td>
                <td>{this.props.description}</td>
                {/* <td><button className="btn" style={{border: "none", color: "#2780e3"}}>Edit</button></td> */}
                <td><button className="btn" style={{border: "none", color: "#2780e3"}}>Download</button></td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}} onClick={this.onDeleteClick}>Delete</button></td>
            </tr>
        )
    }

}