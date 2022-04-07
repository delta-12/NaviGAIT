import { Component } from "react"

export default class UploadFile extends Component {

    state = {
        selectedVideo: [],
        title: "",
        description: "",
        patient: "",
        data: {},
        errors: {}
    }

    onFilesChange = e => {
        e.preventDefault()
        this.setState({
            selectedVideo: e.target.file
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

    // onClick = e => {
    //     e.preventDefault()
    //     const data = new FormData()
    //     for(let i = 0; i < this.state.selectedFiles.length; i++) {
    //         data.append("file", this.state.selectedFiles[i])
    //     }
    //     data.append("password", this.state.password)
    //     this.setState({
    //         data: {},
    //         errors: {}
    //     })
    //     axios.post("/api/files/upload", data)
    //         .then(res => {
    //             this.setState({
    //                 password: "",
    //                 data: res.data
    //             })
    //         })
    //         .catch(err => 
    //             this.setState({
    //                 errors: err.response.data.errors
    //             })
    //         )
    // }

    render() {
        const {errors} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">
                            <label>Upload Videos</label>
                            <input type="file" className="form-control mt-1" onChange={this.onFilesChange} /><small className="form-text text-danger">{errors.file}</small>
                            <input type="title" id="title" className="form-control mt-1" onChange={this.onTitleChange} value={this.state.title} error={errors.title} placeholder="Title" /><small className="form-text text-danger">{errors.title}</small>
                            <input type="description" id="title" className="form-control mt-1" onChange={this.onDescriptionChange} value={this.state.description} error={errors.description} placeholder="Description" /><small className="form-text text-danger">{errors.description}</small>
                        </div>
                        <button type="button" className="btn btn-success btn-block mt-2">Upload</button>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                    {
                        (this.state.data.success) ? <small className="form-text text-success">Successfully uploaded selected videos.</small> : null
                    }
                    </div>
                </div>
            </div>
        )
    }
}