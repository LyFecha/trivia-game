import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import FormGame from './FormGame'
import Question from './Question'
import GenerateToken from './GenerateToken'
import Reset from './Reset'
import End from './End'
import { connect } from 'react-redux'

function Game(props) {
  return (
    <div>
      {props.token ? null : <Redirect to={`${props.match.path}/token`}/>}
      <Route path={`${props.match.path}/token`} component={GenerateToken}/>
      <Route exact path={`${props.match.path}/`} component={FormGame}/>
      <Route path={`${props.match.path}/questions`} component={Question}/>
      <Route path={`${props.match.path}/end`} component={End}/>
      <Route path={`${props.match.path}/reset`} component={Reset}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {token: state.token}
}

export default connect(mapStateToProps)(Game)
