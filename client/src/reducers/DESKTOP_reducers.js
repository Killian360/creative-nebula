export default function DESKTOP(state = true, action)
 {
  switch (action.type) {
  case 'Desktop':
    return state= true
  case 'NotDesktop':
  return state= false
  default:
    return state
  }
}
