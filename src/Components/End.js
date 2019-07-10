import React from 'react'
import { connect } from 'react-redux'
import { addStats } from '../redux/actions'
import { Link } from 'react-router-dom'

class End extends React.Component {
  componentDidMount() {
    const {questions, goodAnswers, token, difficulty, category} = this.props
    this.props.addStats([token, `${goodAnswers}/${questions.length}`, difficulty, category])
  }

  render() {
    return (
      <div>
        <h4>Your score is :</h4>
        <h2 className="text-center">{`${this.props.goodAnswers}/${this.props.questions.length}`}</h2>
        <div className="container">
            <Link className="row justify-content-end btn btn-primary" to="/play/reset">Nice !</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {questions, goodAnswers, token, difficulty, category} = state
  return {questions, goodAnswers, token, difficulty, category}
}

export default connect(mapStateToProps, {addStats})(End)
