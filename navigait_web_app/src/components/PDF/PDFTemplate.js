import { Component } from "react"
import PDFCard from "./PDFCard"

export default class PDFTemplate extends Component {

    render() {
        return (
            <div className="d-grid">
                <h1 className="text-primary" id="pdfTitle">NaviGAIT Gait Analysis</h1>
                <br />
                <br />
                {
                    (this.props.frames.map((f) => <PDFCard key={Math.random()*20} frame={f} />))
                }
            </div>
        )
    }

}