const information = (state={}, action) => {
  switch (action.type) {
    case 'LOAD_INFORMATION':
      return {
        ...state,
        information: action.payload
      };
    default:
      return state
  }
}

export default information  