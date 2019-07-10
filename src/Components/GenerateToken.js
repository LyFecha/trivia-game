import React from 'react'
import { connect } from 'react-redux'
import { getToken } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class GenerateToken extends React.Component {

  componentDidMount() {
    this.props.getToken()
  }

  render() {
    return (
      <div>
        <h4 className="alert alert-primary" role="alert">Generating token, please wait...</h4>
        {this.props.token ? <Redirect to="/play" /> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {token: state.token}
}

export default connect(mapStateToProps, { getToken })(GenerateToken)
