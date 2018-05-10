export default function NAVIGATION(state = true, action)
 {
  switch (action.type) {
  case 'NAVIGATIONON':
    return state= true
  case 'NAVIGATIONOFF':
  return state= false
  default:
    return state
  }
}
