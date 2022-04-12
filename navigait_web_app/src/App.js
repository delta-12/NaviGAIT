import { Component } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import Analyze from "./pages/Analyze"
import Patients from "./pages/Patients"

export default class App extends Component {

  render () {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/patients" element={<Patients />} />
          </Routes>
      </BrowserRouter>
    )
  }
}