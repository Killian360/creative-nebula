export default function NAVIGATIONhome(state = true, action)
 {
  switch (action.type) {
  case 'NAVIGATIONhomeON':
    return state= true
  case 'NAVIGATIONhomeOFF':
  return state= false
  default:
    return state
  }
}
