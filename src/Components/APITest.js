import React from 'react'
import './APITest.css';
import { getAPIData, addAPI, removeAPI } from '../redux/actions'
import { connect } from 'react-redux'

class APITest extends React.Component {
  constructor() {
    super()
    this.state = {
        inputs: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClick(event, key=undefined) {
    if (event.target.name === "+") {
        this.props.addAPI(this.props.match.params.field, this.state.inputs.id, {...this.state.inputs})
    } else if (event.target.name === "-") {
        this.props.removeAPI(this.props.match.params.field, parseInt(this.props.data[key].id, 10))
    } else if (event.target.name === "~") {
        const line = this.props.data[key]
        this.setState({inputs: {...line}})
        this.props.removeAPI(this.props.match.params.field, parseInt(this.props.data[key].id, 10))
    }
  }

  componentDidMount() {
    this.props.getAPIData(this.props.match.params.field)
  }

  handleChange(event) {
    this.setState({inputs: {...this.state.inputs, [event.target.name]: event.target.value}})
  }

  render() {
    let display
    console.log(this.props.data)
    if (this.props.data && this.props.data.length > 0) {
        display = this.props.data.map((val,key) =>
            <tr key={key}>
                <td><button className="col align-self-center" key={key} name="-" onClick={event => this.handleClick(event,key)}>-</button></td>
                <td><button className="col align-self-center" key={key} name="~" onClick={event => this.handleClick(event,key)}>~</button></td>
                {Object.entries(val).map((val2) => <td key={val2[0]}>{val2[1]}</td>)}
            </tr>
        )
    }
    return (
        <div className="shadow p-3 mb-5 bg-white rounded">
            {this.props.data && this.props.data.length > 0 ?
            <table className="table table-striped table-bordered table-fit">
                <thead className="thead-light">
                    <tr>
                        <th>Delete</th>
                        <th>Modify</th>
                        {Object.keys(this.props.data[0]).map(val => <th key={val}>{val}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {display}
                    <tr>
                        <td></td>
                        <td><button className="col align-self-center" name="+" onClick={this.handleClick}>+</button></td>
                        {Object.keys(this.props.data[0]).map(val => 
                            <td key={val}>
                                <input className="w-100" name={val} value={this.state.inputs[val] ? this.state.inputs[val] : ""} onChange={this.handleChange} placeholder={val}/>
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            : null}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {data: state.data}
}

export default connect(mapStateToProps, { getAPIData, addAPI, removeAPI })(APITest)