import { Component } from "react"
import Header from "../components/Header/Header"
import Table from "../components/Table/Table"

export default class Dashboard extends Component {

  render () {
    return (
      <div>
        <Header activeItem="Dashboard" />
        <div className="container-fluid pt-5">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 m-3 border-bottom">
                <h3>Videos</h3>
            </div>
            <main className="px-4">
                <Table />
            </main>
        </div>
      </div>
    )
  }
}