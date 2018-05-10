import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home/';
import ProjectViewer from './projectviewer/';
import GlobalComponent from './globalComponents/';
import ScrollBarProject from './projectGlobal';

import './css/main.css';
import {store} from './reducers/combinereducers.js';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React, {exclude: [/^Connect/, /^Route/, /^Form/, /^Text/,/^Field/, /^Switch/, /^Tilt/]});
}

console.log("React version : "+React.version);
console.log("%c ==== Charras Jeremy | UI/UX Designer ====","background: #1f559d; padding:5px; font-size: 12px; color: #ffffff")
console.log("%c ==== [React] [Redux] [Pixi] [GSAP] [ApolloExpress + MongoDB ] ====","background: #291682; padding:5px; font-size: 12px; color: #ffffff")

class App extends React.Component{
   constructor(props) {
       super(props);
       this.state = {Webglwork: true, showNav:true, response: '' };
       if(navigator.userAgent.match(/Android|webOS|iPhone|iPod|iPad|Blackberry/i) )
       {
         store.dispatch({ type: 'NotDesktop' });
       }
     }

     shouldComponentUpdate() {
       return false;
    }

     render(){
     return (
       <React.Fragment>
         <CookiesProvider>
       <Provider store={store}>
         <Router>
           <React.Fragment>
          <Route path="*" component={GlobalComponent}/>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/projects" component={ScrollBarProject}/>
          <Route path="/projects/:slide" component={ProjectViewer}/>
          <Route path="/content/:contentID" component={Home}/>
          </Switch>
       </React.Fragment>
         </Router>
       </Provider>
     </CookiesProvider>
       <div id="globalGradient">
       </div>
     </React.Fragment>
   )
     }

}


var Main = document.getElementById('app');

ReactDOM.render(<App/>,Main
);
