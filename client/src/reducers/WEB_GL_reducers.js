export default function WEB_GL(state = true, action)
{
  if(navigator.userAgent.match(/Android|webOS|iPhone|iPod|iPad|Blackberry/i) )
  {
    return state= false
  } else {
    switch (action.type) {
  case 'TOOGLEWEBGLON':
  return state= true
  case 'TOOGLEWEBGLOFF':
  return state= false
  default:
    return state
  }
  }
}
