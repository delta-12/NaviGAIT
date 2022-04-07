import { Component } from "react"
import HeaderItem from "./HeaderItem"


export default class Header extends Component {

    state = {
        menu: false
    }

    toggleMenu = e => {
        e.preventDefault()
        this.setState({ menu: !this.state.menu })
    }

    render() {
        return (

            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    
                    <div className="navbar-brand" >NaviGAIT Web Console v1.0.0</div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="true" aria-label="Toggle navigation" onClick={this.toggleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={(this.state.menu) ? "navbar-collapse collapse show" : "navbar-collapse collapse"} id="navbarColor01" >
                        <ul className="navbar-nav me-auto">
                            <HeaderItem name="Dashboard" active={this.props.activeItem} to="/dashboard" />
                            <HeaderItem name="Upload" active={this.props.activeItem} to="/upload" />
                            {/* <HeaderItem name="Download" active={this.props.activeItem} to="/download" /> */}
                        </ul>
                    </div>

                </div>
                
            </nav>

        )
    }

}