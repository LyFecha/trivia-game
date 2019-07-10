import React from 'react'
import { connect } from 'react-redux'
import { resetQuestions } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class Reset extends React.Component {
  componentDidMount() {
      this.props.resetQuestions()
  }

  render() {
    return (
      <Redirect to="/play"/>
    )
  }
}

export default connect(null, {resetQuestions})(Reset)
