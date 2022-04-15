import React, { Component } from "react"
import { Link } from "react-router-dom"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import Header from "../components/Header/Header"
import PDFTemplate from "../components/PDF/PDFTemplate"

export default class Analyze extends Component {

  videoElementRef = React.createRef()
  canvasElementRef = React.createRef()

  state = {
    processed: null,
    fullTitle: null,
    title: "",
    description: "",
    frames: [],
    showPDF: false,
    pdf: null
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

  captureFrame = () => {
    const video = this.videoElementRef
    const canvas = this.canvasElementRef

    this.setState({
      description: "This is a test imageLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod elit eu magna placerat, fringilla tristique augue blandit. Vestibulum quis tempor lectus. Vivamus imperdiet laoreet magna eget luctus. Aenean aliquam, ex eget lacinia auctor, libero orci eleifend purus, et molestie ipsum nunc ac dui. Etiam mattis eget leo gravida auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla et arcu nec sollicitudin. In pretium ornare felis. Cras non eros efficitur, posuere diam faucibus, malesuada ante. Vestibulum porttitor feugiat lectus, a porttitor sapien vestibulum ut. Sed eget aliquam libero, sit amet eleifend odio. Aenean hendrerit ex lectus, ac ullamcorper lectus porttitor sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque arcu turpis, hendrerit et porta at, elementum quis enim. Maecenas justo magna, ultricies in nulla sed, tincidunt hendrerit metus."
    })

    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;
    canvas.current.getContext("2d").drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight)
    canvas.current.toBlob(blob => {
      const frame = {
        frame: window.URL.createObjectURL(blob),
        title: this.state.title,
        description: this.state.description
      }
      let updatedFrames = this.state.frames
      updatedFrames.push(frame)
      this.setState({
        frames: updatedFrames
      })
    })
    canvas.current.width = "100%";
    canvas.current.height = "auto";
  }

  generatePDF = async () => {
    const width = window.innerWidth
    const height = window.innerHeight
    const pdf = new jsPDF("l", "px", [height, width])
    const frames = this.state.frames
    console.log(frames)

    this.setState({
      showPDF: true
    })

    for(let i = 0; i < frames.length; i++) {
      const input = await document.querySelector("#"+frames[i].title)
      console.log(input)
      html2canvas(input, {width: width, height: height})
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png")
          pdf.addImage(imgData, "JPEG", 15, 30, width, height)
          if (i + 1 !== frames.length)
          {
            pdf.addPage()
          }
        })
    }

    this.setState({
      pdf: pdf,
      showPDF: false,
      savePDF: true
    })
  }

  savePDF = () => {
    this.state.pdf.save("gait-analysis.pdf")
    this.setState({
      frames: [],
      savePDF: false
    })
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render () {
    const {fullTitle, processed, showPDF} = this.state
    // console.log(this.state)
    return (
      <div>
        <Header activeItem="Analyze" />
        <div className="container-fluid pt-5">
          <main className="row px-4 mt-5">
            <Link to="/dashboard" className="mb-3" style={{ textDecoration: "none" }}>&#8592; Back to Dashboard</Link>
              <div className="col-md-10">
              {
                (processed !== null && fullTitle !== null) ?
                  <video crossOrigin="anonymous" ref={this.videoElementRef} controls width="100%" height="auto">
                    <source src={"https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle} type="video/mp4"></source>
                  </video> : null
              }
              </div>
              <div className="col-md-2 text-center">
                <button className="btn btn-primary mb-3" style={{ width: "90%", height: "10%" }} onClick={this.captureFrame}>Capture</button>
                <button className="btn btn-secondary mb-3" style={{ width: "90%", height: "10%" }} onClick={this.generatePDF}>Export</button>
                {
                  (this.state.savePDF) ? <button className="btn btn-secondary mb-3" style={{ width: "90%", height: "10%" }} onClick={this.savePDF}>Save</button> : null
                }
              </div>
              {/* <input type="text" value={this.state.title} onChange={this.onChange} id="title"></input> */}
              <canvas ref={this.canvasElementRef}></canvas>
              {
                (showPDF) ? <div id="pdf"><PDFTemplate ref={this.pdfElementRef} frames={this.state.frames} /></div> : null
              }
            </main>
        </div>
      </div>
    )
  }
}