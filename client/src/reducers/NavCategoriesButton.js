export default function NavCategoryButton(state = {
  "button1":true, "button2":true, "button3":true
}, action)
 {
   switch (action.type) {
     case 'ToogleBtn1':
       return state = {
         ...state,
         "button1":action.state
       }
       case 'ToogleBtn2':
         return state = {
           ...state,
           "button2":action.state
         }
         case 'ToogleBtn3':
         return state = {
           ...state,
           "button3":action.state
         }
     default:
       return state
   }
}
