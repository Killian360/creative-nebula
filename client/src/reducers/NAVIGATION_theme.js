export default function NAVIGATIONTHEME(state = "whiteNav", action)
 {
  switch (action.type) {
  case 'NAVIGATIONBlue':
    return state= "blueNav"
  case 'NAVIGATIONWhite':
return state= "whiteNav"
  default:
    return state
  }
}
