import React from 'react'
import { connect } from 'react-redux'
import { nextQuestion, resetQuestions, goodAnswer } from '../redux/actions'
import { Redirect } from 'react-router-dom'

class Question extends React.Component {
  constructor() {
    super()
    this.state = {
      answered: false,
      order: [0,1,2,3],
      reordered: false,
      text: "",
      end: false,
    }
    this.doResult = this.doResult.bind(this)
    this.doNextQuestion = this.doNextQuestion.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  componentDidMount() {
    let order = [...this.state.order]
    let newOrder = []
    for (let i = 0; i < this.state.order.length; i++) {
      const idPicked = Math.floor(Math.random()*order.length)
      newOrder.push(...order.splice(idPicked,1))
    }
    this.setState({order: [...newOrder], reordered: true})
  }

  assignAnswer(id) {
    const question = this.props.questions[this.props.numQuestion]
    if (id === 3) {
      return question.correct_answer
    }
    return question.incorrect_answers[id]
  }

  doResult(event) {
    const question = this.props.questions[this.props.numQuestion]
    const {name} = event.target
    if ((question.type === "boolean" && name === question.correct_answer) || (question.type === "multiple" && this.state.order[name] === 3)) {
      this.setState({text: "Good answer !",})
      this.props.goodAnswer()
    } else {
      this.setState({text: "Bad Answer...",})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numQuestion !== this.props.numQuestion) {
      this.setState({text: ""})
    }
    if (this.state.text !== prevState && this.state.text === "") {
    }
  }

  doNextQuestion() {
    let order = [...this.state.order]
    let newOrder = []
    for (let i = 0; i < this.state.order.length; i++) {
      const idPicked = Math.floor(Math.random()*order.length)
      newOrder.push(...order.splice(idPicked,1))
    }
    this.setState({order: [...newOrder], reordered: true})
    this.props.nextQuestion()
  }

  redirect() {
    this.setState({end: true})
  }

  render() {
    const question = this.props.questions[this.props.numQuestion]
    const bad = "btn-danger"
    const good = "btn-success"
    return (
      <div className="shadow p-3 mb-5 bg-white rounded">
        <h4>{`${decodeURIComponent(question.category)} - ${decodeURIComponent(question.difficulty)}`}</h4>
        <h2>{decodeURIComponent(question.question)}</h2>
        {
          this.state.reordered ?
            question.type === "boolean" ?
              <div>
                <button className={"btn-lg btn-block "+(this.state.text ? (("True" === question.correct_answer) ? good : bad) : "")} name="True" onClick={this.doResult} disabled={this.state.text}>True</button>
                <button className={"btn-lg btn-block "+(this.state.text ? (("False" === question.correct_answer) ? good : bad) : "")} name="False" onClick={this.doResult} disabled={this.state.text}>False</button>
              </div>
            :
              <div>
                <button className={"btn-lg btn-block "+(this.state.text ? (this.state.order[0] === 3 ? good : bad) : "")} name="0" onClick={this.doResult} disabled={this.state.text}>
                  {decodeURIComponent(this.assignAnswer(this.state.order[0]))}
                </button>

                <button className={"btn-lg btn-block "+(this.state.text ? (this.state.order[1] === 3 ? good : bad) : "")} name="1" onClick={this.doResult} disabled={this.state.text}>
                  {decodeURIComponent(this.assignAnswer(this.state.order[1]))}
                </button>

                <button className={"btn-lg btn-block "+(this.state.text ? (this.state.order[2] === 3 ? good : bad) : "")} name="2" onClick={this.doResult} disabled={this.state.text}>
                  {decodeURIComponent(this.assignAnswer(this.state.order[2]))}
                </button>

                <button className={"btn-lg btn-block "+(this.state.text ? (this.state.order[3] === 3 ? good : bad) : "")} name="3" onClick={this.doResult} disabled={this.state.text}>
                  {decodeURIComponent(this.assignAnswer(this.state.order[3]))}
                </button>
              </div>
          : null
        }
        {
          this.state.text ?
            <div>
              {
                this.props.numQuestion === this.props.questions.length-1 ?
                  <button className="btn btn-primary" onClick={this.redirect}>End</button> 
                : 
                  <button className="btn btn-primary" onClick={this.doNextQuestion}>Next question</button>
              }
              <h2 className={"alert alert-"+(this.state.text[0] === "G" ? "success" : "danger")} role="alert">{this.state.text}</h2>
            </div> 
          : 
            null
        }
        {this.state.end ? <Redirect to="/play/end"/> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {questions, numQuestion} = state
  return {questions, numQuestion}
}

export default connect(mapStateToProps, {nextQuestion, resetQuestions, goodAnswer})(Question)
