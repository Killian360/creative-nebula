export default function MUSIC(state = true, action)
{
    switch (action.type) {
  case 'TOOGLEMUSICON':
  return state= true
  case 'TOOGLEMUSICOFF':
  return state= false
  default:
    return state
  }
  }
