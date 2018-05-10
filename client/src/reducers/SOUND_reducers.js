export default function SOUND(state = true, action)
 {
  switch (action.type) {
  case 'TOOGLESOUNDON':
    return state= true
  case 'TOOGLESOUNDOFF':
  return state= false
  default:
    return state
  }
}
