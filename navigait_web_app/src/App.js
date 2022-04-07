import { Component } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"

export default class App extends Component {

  render () {
    return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
          </Routes>
      </BrowserRouter>
    )
  }
}