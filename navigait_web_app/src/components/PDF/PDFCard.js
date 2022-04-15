import { Component } from "react"

export default class PDFTemplate extends Component {

    render() {
        return (
            <div id={this.props.frame.title}>
                <h3 className="text-secondary">{this.props.frame.title}</h3>
                <hr style={{ color: "black" }}></hr>
                <div className="row">
                    <div className="col-md-6">
                        <img src={this.props.frame.frame} width="100%" alt={this.props.frame.description} />
                    </div>
                    <div className="col-md-6">
                        <p className="text-secondary">{this.props.frame.description}</p>
                    </div>
                </div>
            </div>
        )
    }

}