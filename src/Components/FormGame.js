import React from 'react'
import { CATEGORIES, DIFFICULTY } from '../constants'
import { getData, notLoaded, resetQuestions } from '../redux/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class FormGame extends React.Component {
  constructor() {
    super()
    this.state = {
      category: "any",
      difficulty: "any",
      text: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({text: "Loading..."})

    this.props.getData(this.state.category, this.state.difficulty)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      if (this.props.questions.length > 0) {
        this.setState({text: "Redirecting..."})
      } else if (this.props.questions.length === 0) {
        this.setState({text: "No question has been found"})
      }
      this.props.notLoaded()
    }
  }

  render() {
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">
        <form>
          <select name="category" value={this.state.category} onChange={this.handleChange}>
            {CATEGORIES.map(elem => <option key={elem[0]} value={elem[0]}>{elem[1]}</option>)}
          </select>
          
          <br />
          <select name="difficulty" value={this.state.difficulty} onChange={this.handleChange}>
            {DIFFICULTY.map(elem => <option key={elem[0]} value={elem[0]}>{elem[1]}</option>)}
          </select>
          <br />
          <button onClick={this.handleClick}>Play !</button>
        </form>
        {(this.props.questions.length > 0 && this.props.questions[0]) ? <Redirect to={`${this.props.match.url}/questions`}/> : null}
        {this.state.text ? <h4 className={"alert "+(this.props.loaded && this.props.questions.length > 0 ? "alert-primary" : "alert-secondary")} role="alert">{this.state.text}</h4> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {questions: state.questions, loaded: state.loaded}
}

export default connect(mapStateToProps, {getData, notLoaded, resetQuestions})(FormGame)
