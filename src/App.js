import React, {Component} from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { NavbarComponent } from "./components";
import Home from './pages/Home'
import Success from './pages/Success'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/sukses" element={<Success/>} exact />
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}
