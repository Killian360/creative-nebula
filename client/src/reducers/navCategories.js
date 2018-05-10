export default function NavCategory(state = {
  "categories":[
  "webdesign",
  "display",
  "newsletter"
  ]
}, action)
 {
   switch (action.type) {
     case 'REMOVE_CAT':
     return {
      ...state,
      categories: state.categories.filter(categories => categories !== action.cat)
    }
      case 'ADD_CAT':
      return {
      ...state,
      categories: state.categories.concat(action.cat)
     }
     default:
       return state
   }
}
