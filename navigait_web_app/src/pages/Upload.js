import { Component } from "react"
import Header from "../components/Header/Header"
import UploadVideo from "../components/UploadVideo"

export default class Upload extends Component {

    render() {
        return (
            <div className="App">
                <Header activeItem="Upload" />
                <div className="container-fluid pt-5">
                    <main className="px-4 mt-5">
                        <UploadVideo />
                    </main>
                </div>
             </div>
        )
    }
}