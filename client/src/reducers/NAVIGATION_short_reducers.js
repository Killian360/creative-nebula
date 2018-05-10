export default function NAVIGATIONshort(state = false, action)
 {
  switch (action.type) {
  case 'NAVIGATIONshortON':
    return state= true
  case 'NAVIGATIONshortOFF':
  return state= false
  default:
    return state
  }
}
