export default function HOMESLIDE(state={slide:0}, action) {
  switch (action.type) {
    case 'getHomeSlide':
      return state = {
        slide: action.text
      }

    default:
      return state
  }
}
