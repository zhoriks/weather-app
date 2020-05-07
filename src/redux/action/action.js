export function loadInformation(payload) {
  return {type: "LOAD_INFORMATION", payload}
}

export function setRecommendation(payload) {
  return {type: "SET_RECOMMENDATION", payload}
}

export function setChange(payload) {
  return {type: "SET_CHANGE", payload}
}

export function submitValue(payload) {
  return {type: "SUBMIT_VALUE", payload}
}

export function setError(payload) {
  return {type: "SET_ERROR", payload}
}