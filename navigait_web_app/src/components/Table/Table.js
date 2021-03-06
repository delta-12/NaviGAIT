import { Component } from "react"
import TableRow from "./TableRow"

export default class Table extends Component {

    render() {
      if (this.props.videos === null || this.props.videos.length === 0)
      {
        return (
          <p>No videos uploaded.</p>
        ) 
      }
      return (
        <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                {/* <th scope="col">Patient</th> */}
                {/* <th scope="col">Description</th> */}
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.videos.map((v) => <TableRow key={v._id} id={v._id} title={v.title} fullTitle={v.fullTitle} dateUploaded={(v.dateUploaded !== null ) ? v.dateUploaded : ""} description={v.description} processed={v.processed} patient={v.patient} />)}
            </tbody>
        </table>
      )
    }

} 