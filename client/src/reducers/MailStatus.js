export default function MailStatus(state = {Status:"notsend"}, action)
{
  switch (action.type) {
  case 'sending':
  return {
   Status: "sending"
 }
  case 'sent':
  return {
   Status: "sent"
 }
 case 'notsend':
 return {
  Status: "notsend"
}
case 'errorsend':
return {
 Status: "errorsend"
}
  default:
    return state
  }
}
