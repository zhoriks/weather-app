const form = (state={}, action) => {
  switch (action.type) {
    case 'LOAD_INFORMATION':
      return {
        ...state,
        isLoaded: action.payload.isLoaded,
        recommendation: action.payload.recommendation,
        result: action.payload.result
      };
    case 'SET_RECOMMENDATION':
      return {
        ...state,
        recommendation: action.payload
      };
    case 'SET_CHANGE':
      return {
        ...state,
        value: action.payload.value
      };
    case 'SUBMIT__VALUE':
      return {
        ...state,
        value: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state
  }
}

export default form