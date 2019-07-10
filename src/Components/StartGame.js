import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class StartGame extends React.Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Redirect to={`${this.props.match.path}/questions`}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {numQuestion: state.numQuestion}
}

export default connect(mapStateToProps)(StartGame)
