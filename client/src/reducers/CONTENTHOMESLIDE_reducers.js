export default function CONTENTHOMESLIDE (state={contentSlide:0}, action) {
  switch (action.type) {
    case 'getContentSlide':
    return state = {
      contentSlide: action.text
    }
    default:
      return state
  }
}
