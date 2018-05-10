export default function HOMEPREV_URL (state={url:"/"}, action) {
  switch (action.type) {
    case 'GetHomePrevURL':
    return state = {
      url: action.text
    }
    default:
      return state
  }
}
