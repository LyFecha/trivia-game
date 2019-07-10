import React from 'react'
import './App.css'
import NavBar from './Components/NavBar'
import { Route } from 'react-router-dom'
import About from './Components/About'
import Speech from './Components/Speech'
import Game from './Components/Game'
import Stats from './Components/Stats'

function App() {
  return (
    <div className="container">
      <div class="row justify-content-center col align-self-center">
        <NavBar />
        <div class="w-100"></div>
        <Route exact path="/" component={About} />
        <Route path="/how" component={Speech} />
        <Route path="/play" component={Game} />
        <Route path="/stats" component={Stats} />
      </div>
    </div>  
  )
}

export default App
