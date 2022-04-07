import { Component } from "react"
import { Link } from "react-router-dom"

export default class HeaderItem extends Component {

    render() {
        return (
            <li className="nav-item">
                <Link to={this.props.to}>
                    <div className={(this.props.active === this.props.name) ? "nav-link active" : "nav-link"}>{this.props.name}
                        { (this.props.active === this.props.name) ? <span className="visually-hidden">(current)</span> : null}
                    </div>
                </Link>
            </li>
        )
    }

}