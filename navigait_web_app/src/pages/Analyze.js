import React, { Component } from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
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
    id: 0,
    title: "Right Foot Strike",
    description: "",
    frames: [],
    savePDF: false,
    showPDF: false,
    pdf: null
  }

  componentDidMount() {
    const canvas = this.canvasElementRef
    const queryParams = new URLSearchParams(window.location.search)
    const processed = queryParams.get("processed")
    const fullTitle = queryParams.get("fullTitle")
    this.setState({
      processed: processed,
      fullTitle: fullTitle
    })
    canvas.current.width = "100%"
    canvas.current.height = "auto"
  }

  captureFrame = () => {
    const video = this.videoElementRef
    const canvas = this.canvasElementRef

    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;
    canvas.current.getContext("2d").drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight)
    canvas.current.toBlob(blob => {
      const frame = {
        id: "id" + this.state.id.toString(),
        frame: window.URL.createObjectURL(blob),
        title: this.state.title,
        description: this.state.description
      }
      let updatedFrames = this.state.frames
      updatedFrames.push(frame)
      // hacky fix, first input not recognized when generating pdf
      if (this.state.id === 0)
      {
        updatedFrames.push(frame)
      }
      this.setState({
        frames: updatedFrames,
        id: this.state.id + 1
      })
    })
    canvas.current.width = "100%"
    canvas.current.height = "auto"
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

    for (let i = 0; i < frames.length; i++) {
      const input = await document.querySelector("#"+frames[i].id)
      console.log(input)
      html2canvas(input, {width: width, height: height})
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png")
          if (i % 2 === 0) {
            pdf.addImage(imgData, "JPEG", 15, 400, width, height)
            if (i + 1 !== frames.length)
            {
              pdf.addPage()
            }
          }
          else {
            pdf.addImage(imgData, "JPEG", 15, 30, width, height)
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
      id: 0,
      savePDF: false
    })
  }

  cancelSave = () => {
    this.setState({
      savePDF: false
    })
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render () {
    const {fullTitle, processed, showPDF, savePDF} = this.state
    console.log(this.state)
    return (
      <div>
        <Header activeItem="Analyze" />
        <div className="container-fluid pt-5 col-md-10">
          <main className="row px-4 mt-5">
            <Link to="/dashboard" className="mb-3" style={{ textDecoration: "none" }}>&#8592; Back to Dashboard</Link>
              <div className="col-md-12 text-center">
              {
                (processed !== null && fullTitle !== null) ?
                  <video crossOrigin="anonymous" ref={this.videoElementRef} controls width="100%" height="auto">
                    <source src={"https://navigait-uploads.ddns.net:10444/api/videos/stream?processed="+this.state.processed+"&fullTitle="+this.state.fullTitle} type="video/mp4"></source>
                  </video> : null
              }
              </div>
              <div className="text-center">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group mt-2">
                      <select className="form-select" value={this.state.title} onChange={this.onChange} id="title">
                        <option value="Right Foot Strike">Right Foot Strike</option>
                        <option value="Left Foot Strike">Left Foot Strike</option>
                        <option value="Right Hip Drop">Right Hip Drop</option>
                        <option value="Left Hip Drop">Left Hip Drop</option>
                      </select>
                    </div>
                  </div>
                  {
                    (savePDF) ?
                    <>
                      <div className="col-md-2"><button className="btn btn-secondary btn-lg mt-2" onClick={this.savePDF}>Save PDF</button></div>
                      <div className="col-md-2"><button className="btn btn-danger btn-lg mt-2" onClick={this.cancelSave}>Cancel</button></div>
                    </> :
                    <>
                      <div className="col-md-2"><button className="btn btn-info btn-lg mt-2" onClick={this.captureFrame}>Capture</button></div>  
                      <div className="col-md-2"><button className={classnames((this.state.frames.length > 0) ? "btn btn-success btn-lg mt-2" : "btn btn-success btn-lg mt-2 disabled")} onClick={this.generatePDF}>Export</button></div>
                    </>
                  }
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <textarea className="form-control mt-1" id="description" rows="2" placeholder="Annotations" value={this.state.description} onChange={this.onChange}></textarea>
                  </div>
                  <div className="col-md-2 mt-2">
                    <p>Captures: {(this.state.frames.length > 0) ? this.state.frames.length - 1 : 0}</p>
                  </div>
                </div>
              </div>
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