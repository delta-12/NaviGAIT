import React, { Component } from "react"
import Header from "../components/Header/Header"
import VideoPlayer from "react-video-player-extended"

export default class Analyze extends Component {

  videoElementRef = React.createRef()
  canvasElementRf = React.createRef()
  frames = []

  state = {
    processed: null,
    fullTitle: null,
    showPlayer: true,
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

  // async getVideoTrack() {
  //   const video = this.videoElementRef
  //   video.current.src = "https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle
  //   await video.current.play()
  //   const [track] = video.current.captureStream().getVideoTracks()
  //   video.current.onended = (evt) => track.stop()
  //   return track
  // }

  // onClick = async(e) => {
  //   if (window.MediaStreamTrackProcessor) {
  //     let stopped = false
  //     let frames = this.frames
  //     const track = await this.getVideoTrack()
  //     const processor = new window.MediaStreamTrackProcessor(track)
  //     const reader = processor.readable.getReader()
  //     readChunk()
  
  //     function readChunk() {
  //       reader.read().then(async({ done, value }) => {
  //         if (value) {
  //           const bitmap = await createImageBitmap(value)
  //           const index = frames.length
  //           frames.push(bitmap)
  //           // select.append(new Option("Frame #" + (index + 1), index));
  //           value.close()
  //         }
  //         if (!done) {
  //           readChunk()
  //         } else {
  //           // select.disabled = false;
  //         }
  //       });
  //     }
  //     // button.onclick = (evt) => stopped = true;
  //     // button.textContent = "stop";
  //   } else {
  //     console.error("your browser doesn't support this API yet");
  //   }
    
  // }

  captureVideo = e => {
    const video = this.videoElementRef
    const canvas = this.canvasElementRf
    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;
    // let canvasContext = canvas.current.getContext("2d");
    // let bitmap = createImageBitmap(canvasContext)
    // canvasContext.drawImage(bitmap, 0, 0);
    // console.log(canvas.current.toDataURL('image/png'));
    canvas.current.getContext("2d").drawImage(video.current, 0, 0)
    // canvas.current.toBlob() = (blob) => {
    //   // const img = new Image()
    //   // img.src = window.URL.createObjectUrl(blob)
    // }
    canvas.current.toBlob(blob => {
      console.log(blob)
    })
  }
 
  // handlePlay = () => {
  //   this.setState({isPlaying: true})
  // }
 
  // handlePause = () => {
  //   this.setState({isPlaying: false})
  // }
 
  // handleVolume = value => {
  //   this.setState({volume: value});
  // }

  // showFrames = e => {
  //   e.preventDefault()
  //   console.log(this.frames)
  // }

  render () {
    const {fullTitle, processed, isPlaying, volume} = this.state
    console.log(this.state)
    return (
      <div>
        <Header activeItem="Analyze" />
        <div className="container-fluid pt-5">
          <main className="px-4 mt-5">
            {/* <button className="btn" onClick={this.onClick}>Start</button> */}
            {/* <button className="btn" onClick={this.showFrames}>Frames</button> */}
            <button className="btn" onClick={this.captureVideo}>Capture</button>
              {
                (processed !== null && fullTitle !== null) ?
                  <video crossOrigin="anonymous" ref={this.videoElementRef} controls width="100%" height="auto">
                    <source src={"https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle} type="video/mp4"></source>
                  </video> : null
                //   <VideoPlayer
                //   url = {"https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle}
                //   // isPlaying={isPlaying}
                //   // volume={volume}
                //   // onPlay={this.handlePlay}
                //   // onPause={this.handlePause}
                //   width="896px"
                //   height="504px"
                //   // markers={[{id: 1, time: 5, color: '#ffc837', title: 'Marker 1'}]}
                // /> : null
              }
              <canvas ref={this.canvasElementRf}></canvas>
            </main>
        </div>
      </div>
    )
  }
}