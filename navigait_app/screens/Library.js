import { Component } from "react"
import { View } from "react-native"
import axios from "axios"
import {globalStyles} from "../styles/global"
import {Table} from "../components/Table/Table"

export class Library extends Component {

  state = {
    videos: null,
    errors: null
  }

  componentDidMount() {
    this.getVideos()
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
  }

  getVideos() {
    axios
      .get("http://localhost:5000/api/videos/infoAll")
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

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.table}>
  
          <Table videos={this.state.videos} />
                
        </View>
      </View>
    )
  }

}