export function getData(category="any", difficulty="any") {
  return function(dispatch, getState) {
    if (!(getState().token)) {return dispatch({ type: "ERROR", payload: "Le token n'est pas défini" })}
    return (fetch(
        `https://opentdb.com/api.php?token=${getState().token}&amount=10&encode=url3986${category !== "any" ? "&category="+category: ""}${difficulty !== "any" ? "&difficulty="+difficulty: ""}`
      ).then(response => response.json()).then(json => {
        dispatch({ type: "GET_DATA", payload: {questions: json.results, loaded: true}})
      })
    )
  }
}

export function getToken() {
  return function(dispatch) {
    return (
      fetch("https://opentdb.com/api_token.php?command=request").then(
        response => response.json()
      ).then(
        json => dispatch({type: "GET_TOKEN", payload: json.token})
      )
    )
  }
}

export function notLoaded() {
  return {type: "NOT_LOADED", payload: false}
}

export function nextQuestion() {
  return {type: "NEXT_QUESTION"}
}

export function resetQuestions() {
  return {type: "RESET_QUESTIONS"}
}

export function addStats(stat) {
  return {type: "ADD_STATS", payload: stat}
}

export function removeStats(n) {
  return {type: "REMOVE_STATS", payload: n}
}

export function goodAnswer() {
  return {type: "GOOD_ANSWER"}
}