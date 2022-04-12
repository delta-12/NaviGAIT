import { Component } from "react"
// import { useParams } from "react-router-dom"
import Header from "../components/Header/Header"
import VideoPlayer from 'react-video-player-extended'

export default class Analyze extends Component {

  state = {
    processed: null,
    fullTitle: null,
    isPlaying: false,
    volume: 0.7
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search)
    const processed = queryParams.get("processed")
    const fullTitle = queryParams.get("fullTitle")
    this.setState({
      processed: processed,
      fullTitle: fullTitle
    })
  }
 
  handlePlay = () => {
    this.setState({isPlaying: true});
  };
 
  handlePause = () => {
    this.setState({isPlaying: false});
  };
 
  handleVolume = value => {
    this.setState({volume: value});
  }

  render () {
    const {processed, fullTitle} = this.state
    const {isPlaying, volume} = this.state
    console.log(this.state)
    return (
      <div>
        <Header activeItem="Analyze" />
        <div className="container-fluid pt-5">
          <main className="px-4 mt-5">
              {
                (processed !== null && fullTitle !== null) ?
                  <VideoPlayer
                  url = {"https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle}
                  isPlaying={isPlaying}
                  volume={volume}
                  onPlay={this.handlePlay}
                  onPause={this.handlePause}
                  width="896px"
                  height="504px"
                  onVolume={this.handleVolume}
                  // markers={[{id: 1, time: 5, color: '#ffc837', title: 'Marker 1'}]}
                /> : null
              }
            </main>
        </div>
      </div>
    )
  }
}