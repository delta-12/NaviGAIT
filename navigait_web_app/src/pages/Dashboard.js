import { Component } from "react"
import Header from "../components/Header/Header"
import Table from "../components/Table/Table"
import axios from "axios"

export default class Dashboard extends Component {

  state = {
    videos: null
  }

  componentDidMount() {
    this.getVideos()
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
  }

  getVideos() {
    axios
      .get("/api/videos/infoAll")
      .then(res => {
        this.setState({
          videos: res.data.videos
        })
      })
      .catch(err =>
        this.setState({
          errors: err.response.data.error
        })
      )
    this.intervalID = setTimeout(this.getVideos.bind(this), 5000)
  }

  render () {
    return (
      <div>
        <Header activeItem="Dashboard" />
        <div className="container-fluid pt-5">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 m-3 border-bottom">
                <h3>Videos</h3>
            </div>
            <main className="px-4">
                <Table videos={this.state.videos} />
            </main>
        </div>
      </div>
    )
  }
}