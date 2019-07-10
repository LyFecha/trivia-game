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
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event, key=undefined) {
    if (event.target.name === "+") {
        const {category, difficulty, token, score} = this.state
        this.props.addStats([token, score, difficulty, category])
    } else if (event.target.name === "-") {
        this.props.removeStats(parseInt(key, 10))
    } else if (event.target.name === "~") {
        const token = this.props.stats[key][0], score = this.props.stats[key][1], difficulty = this.props.stats[key][2], category = this.props.stats[key][3]
        console.log({token, score, difficulty, category})
        this.setState({token, score, difficulty, category})
        this.props.removeStats(parseInt(key, 10))
    }
  }

  componentDidUpdate() {
      
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const displayStats = this.props.stats.map((val,key) =>
        <tr key={key}>
            <td><button className="col align-self-center" key={key} name="-" onClick={event => this.handleClick(event,key)}>-</button></td>
            <td><button className="col align-self-center" key={key} name="~" onClick={event => this.handleClick(event,key)}>~</button></td>
            {val.map((val2,key2) => <td key={"_"+key2}>{val2}</td>)}
        </tr>
    )
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            <table className="table table-striped table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Delete</th>
                        <th>Modify</th>
                        <th>Token</th>
                        <th>Score</th>
                        <th>Difficulty</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {displayStats}
                    <tr>
                        <td></td>
                        <td><button className="col align-self-center" name="+" onClick={this.handleClick}>+</button></td>
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
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {stats: state.stats}
}

export default connect(mapStateToProps, {addStats, removeStats})(Stats)
