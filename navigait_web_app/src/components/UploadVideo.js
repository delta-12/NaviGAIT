import { Component } from "react"
import axios from "axios"
import {Progress} from "reactstrap"

export default class UploadFile extends Component {

    state = {
        selectedVideo: null,
        title: "",
        description: "",
        patient: "",
        loaded: 0,
        showProgressBar: false,
        data: {},
        errors: {}
    }

    onFilesChange = e => {
        e.preventDefault()
        this.setState({
            selectedVideo: e.target.files[0]
        })
    }

    onTitleChange = e => {
        e.preventDefault()
        this.setState({
            title: e.target.value
        })
    }

    onDescriptionChange = e => {
        e.preventDefault()
        this.setState({
            description: e.target.value
        })
    }

    onClick = e => {
        e.preventDefault()
        this.setState({
            loaded: 0,
            showProgressBar: true,
            data: {},
            errors: {}
        })
        let data = new FormData()
        data.append("title", this.state.title)
        data.append("file", this.state.selectedVideo)
        data.append("description", this.state.description)
        data.append("patient", this.state.patient)
        axios.post("https://navigait-uploader.ddns.net/api/videos/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100)
                })
            }
        })
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
            .catch(err => {
                this.setState({
                    showProgressBar: false,
                    errors: err.response.data.errors
                })
            })
    }

    render() {
        const {errors} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">
                            <label>Upload Video</label>
                            <input type="file" className="form-control mt-1" onChange={this.onFilesChange} /><small className="form-text text-danger">{errors.files}</small>
                            <input type="title" id="title" className="form-control mt-1" onChange={this.onTitleChange} value={this.state.title} error={errors.title} placeholder="Title" /><small className="form-text text-danger">{errors.title}</small>
                            <input type="description" id="title" className="form-control mt-1" onChange={this.onDescriptionChange} value={this.state.description} error={errors.description} placeholder="Description" /><small className="form-text text-danger">{errors.description}</small>
                            {(this.state.showProgressBar) ? <Progress className="mt-2" max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress> : null}
                        </div>
                        <button type="button" className="btn btn-success btn-block mt-2" onClick={this.onClick}>Upload</button>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                    {
                        (this.state.data.success) ? <small className="form-text text-success">Successfully uploaded selected video</small> : null
                    }
                    </div>
                </div>
            </div>
        )
    }
}