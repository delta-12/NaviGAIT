import { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default class TableRow extends Component {

    onDeleteClick = e => {
        e.preventDefault()
        const data = new FormData()
        data.append("videoID", this.props.id)
        data.append("fullTitle", this.props.fullTitle)
        data.append("processed", this.props.processed)
        axios.post("https://navigait-uploads.ddns.net:10444/api/videos/delete", data)
        // axios.post("http://localhost:5001/api/videos/delete", data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onDownloadClick = e => {
        e.preventDefault()
        const data = new FormData()
        data.append("fullTitle", this.props.fullTitle)
        data.append("processed", this.props.processed)
        axios.post("https://navigait-uploads.ddns.net:10444/api/videos/download", data, {responseType: "blob"})
        // axios.post("http://localhost:5001/api/videos/download", data, {responseType: "blob"})
            .then(res => {
                console.log(res)
                const { data, headers } = res
                // console.log(headers["content-disposition"])
                const blob = new Blob([data], {type: headers['content-type']})
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.style.display = "none"
                link.setAttribute('download', 'video.mp4'); //or any other extension
                document.body.appendChild(link)
                link.click()
                link.remove()
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
                <td><Link to={"/analyze?processed="+this.props.processed+"&fullTitle="+this.props.fullTitle} style={{ textDecoration: "none" }}><button className="btn" style={{border: "none", color: "#2780e3"}}>Analyze</button></Link></td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}} onClick={this.onDownloadClick}>Download</button></td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}} onClick={this.onDeleteClick}>Delete</button></td>
            </tr>
        )
    }

}