import { Component } from "react"

export default class TableRow extends Component {

    render() {
        // const {errors} = this.state
        const date = new Date(this.props.date).toLocaleString().replace(":00 ", " ")
        return (
            <tr className="table-default">
                <th scope="row">{(date === "Invalid Date") ? "" : date}</th>
                <td>{this.props.title}</td>
                {
                (this.props.processed) ? <td><p className="text-success">Processed</p></td> : <td><p className="text-danger">Processing...</p></td>
                }
                <td>{this.props.patient}</td>
                <td>{this.props.description}</td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}}>Edit</button></td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}}>Download</button></td>
                <td><button className="btn" style={{border: "none", color: "#2780e3"}}>Delete</button></td>
            </tr>
        )
    }

}