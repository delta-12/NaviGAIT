import { Component } from "react"

export default class Dashboard extends Component {

  render () {
    return (
      <div>
        <div className="container-fluid pt-5">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 m-3">
                <h3>Vote NaviGAIT for People's Choice Award</h3>
            </div>
            <br></br>
            <main className="d-flex px-4 text-center">
              <div>
                <h1 style={{ fontSize: "70px" }}>Text "AOM-5" to </h1>
                <br></br>
                <h1 style={{ fontSize: "45px" }}>855-742-2497</h1>
              </div>
            </main>
        </div>
      </div>
    )
  }

}