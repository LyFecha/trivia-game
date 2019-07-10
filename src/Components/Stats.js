import React from 'react'
import { CATEGORIES, DIFFICULTY } from '../constants'
import { addStats, removeStats} from '../redux/actions'
import { connect } from 'react-redux'

class Stats extends React.Component {
  constructor() {
    super()
    this.state = {
        category: "Any Category",
        difficulty: "Any Difficulty",
        token: "",
        score: "",
        removeLine: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event) {
    if (event.target.name === "add") {
        const {category, difficulty, token, score} = this.state
        this.props.addStats([token, score, difficulty, category])
    } else if (event.target.name === "remove" && parseInt(this.state.removeLine) > 0 && parseInt(this.state.removeLine) <= this.props.stats.length) {
        this.props.removeStats(this.state.removeLine-1)
    }
  }

  componentDidUpdate() {
      
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const displayStats = this.props.stats.map((val,key) => <tr key={key}>{val.map((val2,key2) => <td key={"_"+key2}>{val2}</td>)}</tr>)
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <table className="table table-striped table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Token</th>
                        <th>Score</th>
                        <th>Difficulty</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {displayStats}
                    <tr>
                        <td><input name="token" value={this.state.token} onChange={this.handleChange} placeholder="Token"/></td>
                        <td><input name="score" value={this.state.score} onChange={this.handleChange} placeholder="Score"/></td>
                        <td>
                            <select name="difficulty" value={this.state.difficulty} onChange={this.handleChange}>
                                {DIFFICULTY.map(elem => <option key={elem[0]} value={elem[1]}>{elem[1]}</option>)}
                            </select>
                        </td>
                        <td>
                            <select name="category" value={this.state.category} onChange={this.handleChange}>
                                {CATEGORIES.map(elem => <option key={elem[0]} value={elem[1]}>{elem[1]}</option>)}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button name="add" onClick={this.handleClick}>Add</button>
            <button name="remove" onClick={this.handleClick}>Remove :</button>
            <input name="removeLine" value={this.state.removeLine} onChange={this.handleChange} placeholder="Line to remove"/>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {stats: state.stats}
}

export default connect(mapStateToProps, {addStats, removeStats})(Stats)
