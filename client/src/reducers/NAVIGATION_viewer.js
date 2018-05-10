export default function VIEWERON(state = true, action)
 {
  switch (action.type) {
  case 'VIEWERON':
    return state= true
  case 'VIEWEROFF':
  return state= false
  default:
    return state
  }
}
