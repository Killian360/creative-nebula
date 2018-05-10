export default function Navpanel(state = false, action)
 {
  switch (action.type) {
  case 'SwitchON':
    return state= true
    case 'SwitchOFF':
      return state= false
  default:
    return state
  }
}
