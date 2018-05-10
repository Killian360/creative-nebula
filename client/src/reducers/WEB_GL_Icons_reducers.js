export default function WEB_GL_Icon(state = {helperWebgl:true,mailerWebgl:false}, action)
{
  switch (action.type) {
  case 'helperOpen':
  return {
   ...state,
   helperWebgl: true
 }
  case 'helperClose':
  return {
   ...state,
   helperWebgl: false
 }
  case 'MailerOpen':
  return {
   ...state,
   mailerWebgl: true
 }
  case 'MailerClose':
  return {
   ...state,
   mailerWebgl: false
 }
  default:
    return state
  }
}
