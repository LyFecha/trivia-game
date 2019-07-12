import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Route } from 'react-router-dom'
import About from './Components/About'
import Speech from './Components/Speech'
import Game from './Components/Game'
import Stats from './Components/Stats'
import APITest from './Components/APITest'

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center col align-self-center">
        <NavBar />
        <div className="w-100"></div>
        <Route exact path="/" component={About} />
        <Route path="/how" component={Speech} />
        <Route path="/play" component={Game} />
        <Route path="/stats" component={Stats} />
        <Route path="/pepperonisecret/:field" component={APITest}/>
      </div>
    </div>  
  )
}

export default App
