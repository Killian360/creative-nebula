export default function PROJECTISREADING(state = false, action)
 {
  switch (action.type) {
  case 'ReadingOn':
    return state= true
  case 'ReadingOff':
  return state= false
  default:
    return state
  }
}
