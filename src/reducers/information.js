const information = (state={}, action) => {
  switch (action.type) {
    case 'LOAD_INFORMATION':
      return {
        ...state,
        isLoaded: action.payload.isLoaded,
        recommendation: action.payload.recommendation
      };
    case 'SET_RECOMMENDATION':
      return {
        ...state,
        recommendation: action.payload
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload
      };
    case 'SET_WEATHER':
      return {
        ...state,
        weather: action.payload
      };
    default:
      return state
  }
}

export default information  