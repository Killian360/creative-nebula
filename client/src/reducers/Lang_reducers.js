import Lang from '../JSON/lang.json';
import LangFR from '../JSON/langFR.json';
import JSONdata from '../JSON/projets.json';
import JSONdataFR from '../JSON/projetsFR.json';


export default function LANG(state = {Flag:"EN",JsonProjects:JSONdata, JsonLang:Lang}, action)
 {
  switch (action.type) {
  case 'SwitchEN':
    return state= {Flag:"EN",JsonProjects:JSONdata, JsonLang:Lang}
    case 'SwitchFR':
      return state= {Flag:"FR",JsonProjects:JSONdataFR, JsonLang:LangFR}
  default:
    return state
  }
}
