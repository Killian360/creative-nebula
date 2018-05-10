export default function SLIDE(state=0, action) {
  switch (action.type) {
    case 'getSlide':
      return state = {
        slide: action.text
      }
    default:
      return state
  }
}
