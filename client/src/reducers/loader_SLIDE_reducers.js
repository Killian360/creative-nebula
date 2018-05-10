export function loader_SLIDE1(state=false, action) {
  switch (action.type) {
    case 'getLoadedLayer1':
      return state = {
        loaded1: action.txt,
      }
    default:
      return state
  }
}
export function loader_SLIDE2(state=false, action) {
  switch (action.type) {
    case 'getLoadedLayer2':
      return state = {
        loaded2: action.txt,
      }
    default:
      return state
  }
}

export function loader_SLIDE3(state=false, action) {
  switch (action.type) {
    case 'getLoadedLayer3':
      return state = {
        loaded3: action.txt,
      }
    default:
      return state
  }
}
