export default function MENU(state = false, action)
 {
  switch (action.type) {
  case 'TOOGLEMENUON':
    return state= true
  case 'TOOGLEMENUOFF':
  return state= false
  default:
    return state
  }
}
