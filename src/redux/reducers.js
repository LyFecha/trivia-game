const initialState = {
  questions: [false],
  token: false,
  numQuestion: 0,
  stats: [["AaohA577LGYAGdagp3UHODa387OIHUHADhou","7/10","Medium","Mythology"]],
  goodAnswers: 0,
  category: "",
  difficulty: "",
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DATA":
      return {...state, ...action.payload}
    case "SET_CATEGORY_DIFFICULTY":
      return {...state, ...action.payload}
    case "NOT_LOADED":
      return {...state, loaded: action.payload}
    case "GET_TOKEN":
      return {...state, token: action.payload}
    case "NEXT_QUESTION":
      return {...state, numQuestion: state.numQuestion+1}
    case "RESET_QUESTIONS":
      return {...state, numQuestion: 0, questions: [], goodAnswers: 0, category: "", difficulty: ""}
    case "ADD_STATS":
      return {...state, stats: [...state.stats, action.payload]}
    case "REMOVE_STATS":
      const newStats = [...state.stats]
      newStats.splice(action.payload, 1)
      return {...state, stats: newStats}
    case "GOOD_ANSWER":
      return {...state, goodAnswers: state.goodAnswers+1}
    case "ERROR":
      console.log(action.payload)
      return {...state}
    default:
      return state
  }
}