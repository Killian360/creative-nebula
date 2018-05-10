import React, {Component} from "react";

import './Navigation.css';
import scrollTo from 'gsap/ScrollToPlugin';
import Config from '../config';
import {store} from '../reducers/combinereducers.js';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux'
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import {Base64} from 'js-base64';
import { Link } from 'react-router-dom';

import {
  TweenMax,
  Power2,
  Power0,
  Power1,
  Power3,
  Power4,
  Bounce,
  Elastic
} from "gsap";
import * as animate from './animation'

// import Animation from './animation';

const mapStateToProps = state => {
  return {NAVIGATION: state.NAVIGATION,
    SLIDE:state.SLIDE,
    VIEWERON:state.VIEWERON, NAVIGATIONhome: state.NAVIGATIONhome, DESKTOP: state.DESKTOP, NAVIGATIONshort: state.NAVIGATIONshort}
}
const mapDispatchToProps = dispatch => {
  return {
    NAVIGATIONON: () => dispatch({type: 'NAVIGATIONON'})
  }
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|Blackberry/i)) {
      this.state = {
        navtype: " mobileNav",
        css: "navigationMobile",
        email: "",
        message: "",
        subject: ""
      };
    } else {
      this.state = {
        navtype: " desktop",
        css: "navigation-desktop",
        email: "",
        message: "",
        subject: ""
      };
    }
  }



  componentDidMount() {
     var bg = document.getElementById("bg_btn_submit_svg");
     TweenMax.set(bg,{drawSVG:"0% 0%"});
     TweenMax.set('#next_losange',{drawSVG:'0%'});
     TweenMax.set('#previous_losange',{drawSVG:'0%'});
     if (store.getState().NAVIGATIONhome == false)
     {
       animate.animation('NavLogoShow');
     }
     else if (store.getState().NAVIGATIONhome == true)
     {
       animate.animation('NavLogoHide');
     }
     if (store.getState().NAVIGATION == false)
     {
       animate.animation('NavHide');
     } else if (store.getState().NAVIGATION == true)
     {
       animate.animation('NavShow');
     }
}

  clickedWebgl() {
    if (store.getState().WEB_GL == true) {
      store.dispatch({type: 'TOOGLEWEBGLOFF'})
    } else {
      store.dispatch({type: 'TOOGLEWEBGLON'})
    }
  }

  clickedMusic() {
    var music_player = document.getElementById('audioSource');
    var audio = document.getElementById('audio');
    if (store.getState().MUSIC == true) {
      store.dispatch({type: 'TOOGLEMUSICOFF'})
      audio.pause();
    } else {
      store.dispatch({type: 'TOOGLEMUSICON'})
      music_player.src = "sound/ambient.ogg";
      audio.load();
      audio.volume = 0.1;
      audio.play();
    }
  }

  componentWillReceiveProps(nextProps, nextState, props) {
    var mainNAV = document.getElementById("navigation");
    var Color = document.getElementsByClassName("nav-li");
    var logo = document.getElementsByClassName("logo-small-container");
    var menu_long = document.getElementsByClassName("nav-inner");

    this.URLSLIDER = location.pathname.split('/')[1];
    if (store.getState().SLIDE.slide==7)
    {
      this.NextSlide = 0;
    } else {
      this.NextSlide = +store.getState().SLIDE.slide + 1;
    }
    if (store.getState().SLIDE.slide==0)
    {
      this.PrevSlide = 7;
    } else {
      this.PrevSlide = +store.getState().SLIDE.slide - 1;
    }

    if (nextProps != this.props) {
      if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|Blackberry/i)) {
        this.state = {
          navtype: " mobileNav",
          css: "navigationMobile"
        };
      } else {
        this.state = {
          navtype: " desktop",
          css: "navigation-desktop"
        };
      }
      if (store.getState().NAVIGATIONhome == false)
      {
        animate.animation('NavLogoShow');
      }
       if (store.getState().NAVIGATIONhome == true)
      {
        animate.animation('NavLogoHide');
      }
      if (store.getState().NAVIGATION == false)
      {
        animate.animation('NavHide');
      }
       if (store.getState().NAVIGATION == true)
      {
        animate.animation('NavShow');
      }
      if (store.getState().VIEWERON == true)
      {
        animate.animation('NavViewer');
      }
      if (store.getState().VIEWERON == false)
      {
        animate.animation('NavViewerOff');
      }
      this.URLSLIDER = location.pathname.split('/')[1];

    }
  }

  onChange = (e) => {
    var btnSubmit = document.getElementById("FormContactBtn");

    const state = this.state;
    var email = this.state.email;
    var subject = this.state.subject;
    var message = this.state.message;

        state[e.target.name] = e.target.value;
        this.setState(state);

        if (email.length > 1 && subject.length > 1 && message.length > 1)
        {
          TweenMax.to(btnSubmit, 0.3,{opacity:1, display:"block"});
        } else {
          TweenMax.to(btnSubmit, 0.3,{opacity:0, display:"none"});
        }
  }

  clicked_right(e) {
    this.clickaction = true;
    var Navright = document.getElementById("Nav-right");
    var arrowright = document.getElementById("arrowright");
    TweenMax.to(arrowright, 0.1, {x:2 , ease:Bounce.easeOut});
    TweenMax.to(arrowright, 0.1, {x:0, delay:0.1});
}

overRight(e) {
      TweenMax.to('#Nav-right',0.3, {scale:'1.2', ease : Power1.easeOut});
      TweenMax.fromTo('#next_losange',0.3, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
    }

outRight() {
  TweenMax.to('#Nav-right',0.25, {scale:1});
  TweenMax.fromTo('#next_losange',0.25, {drawSVG:"0% 100%"}, {drawSVG:"100% 100%"});
}

clicked_left(e) {
  var arrowleft = document.getElementById("arrowleft");
  var Navleft = document.getElementById("Nav-left");
  this.clickaction = true;
      TweenMax.to(arrowleft, 0.1, {x:-2 , ease:Bounce.easeOut});
      TweenMax.to(arrowleft, 0.1, {x:0, delay:0.1});
    // if (store.getState().SLIDE.slide == 2) {
    //   animate.animationThumb('HideThumbRight', Wrapper3, "100");
    //   animate.animationThumb('ShowThumbLeft', Wrapper2, "-100");
    // }
  }

overLeft(e) {
    TweenMax.to('#Nav-left',0.3, {scale:'1.2', ease : Power1.easeOut});
    TweenMax.fromTo('#previous_losange',0.3, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
}

outLeft() {
  TweenMax.to('#Nav-left',0.25, {scale:1});
  TweenMax.fromTo('#previous_losange',0.25, {drawSVG:"0% 100%"}, {drawSVG:"100% 100%"});
}


  onSubmit = (e) => {
    var btnSubmit = document.getElementById("contactFormContent");
    var email = this.state.email;
    var subject = this.state.subject;
    var message = this.state.message;
    var isAuthorized;
    var currentApiRequest;

    TweenMax.to(btnSubmit, 0.3,{opacity:0, display:"none"});

    function endContact()
    {
      var contentFrame = document.getElementById("content");
      var contactFormContainer = document.getElementById("contactFormContainer");
      var contactFormGradient = document.getElementById("contactFormGradient");
      var contactFormTitle = document.getElementById("contactFormTitle");
      var formwrapper1 = document.getElementById("FormWrapper");
      var formwrapper2 = document.getElementById("FormWrapper2");
      var formwrapper3 = document.getElementById("FormWrapper3");
      var CanvasParticle = document.getElementById("particles-js");
      var input1 = document.getElementsByTagName("input");
      TweenMax.to(contentFrame,0.2, {filter: 'grayscale(0%) blur(0px) hue-rotate(0deg)'});
      TweenMax.to(contactFormContainer,0.3, {opacity:0, display:'none'});
      TweenMax.set(formwrapper1, {opacity:0});
      TweenMax.set(formwrapper2, {opacity:0});
      TweenMax.set(formwrapper3, {opacity:0});
      TweenMax.set(CanvasParticle, {opacity:0,top:"-100%"});
      TweenMax.to(contactFormGradient,0.3, {left:"-100%", opacity:0, ease:Power1.easeOut});
    }


    var bodyData = "To: jeremy@jcharras.com \nSubject: " +subject+"\n\n"+message+" NOM:"+ email;

    function start()
    {
      // 2. Initialize the JavaScript client library.
      window.gapi.client.init({
        'apiKey': "AIzaSyBjK9B7nNVH_YjnYgJ6MPNaWLOHjhRJ9UI",
        // clientId and scope are optional if auth is not required.
        'clientId': "737111427274-4enmnsr2o8ujephg60t7babb2qjaun12.apps.googleusercontent.com",
        'scope': 'https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send'
      }).then(function()
{
// window.gapi.auth2.getAuthInstance();
// window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

})
.then(function()
{
  return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/gmail/v1/rest")
}).then(function() {
      return window.gapi.client.gmail.users.messages.send({
      "userId": "me",
      "resource": {
      "raw": Base64.encode(bodyData.replace(/-/g, '+').replace(/_/g, '/')),
    }
  })
  }).then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var result = response.status;
                console.log(response.status);
                if (result == '200') {
                  endContact();
                  animate.animation('NavShow');
                } else {
                  console.log("Not logged");
                }
              },
              function(err) { console.error("Execute error", err); });
};

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true;
    if (currentApiRequest) {
      sendAuthorizedApiRequest(currentApiRequest);
    }
  } else {
    isAuthorized = false;
  }
}

function sendAuthorizedApiRequest(requestDetails) {
  currentApiRequest = requestDetails;
  if (isAuthorized) {
    // Make API request
    window.gapi.client.request(requestDetails)

    // Reset currentApiRequest variable.
    currentApiRequest = {};
  } else {
    window.gapi.auth2.signIn();
  }
}

if (email.length != 0 && subject.length != 0 && message.length != 0)
{
  window.gapi.load('client:auth2', start);
}
 }

  clickContact()
  {
    var contentFrame = document.getElementsByClassName("Maincontainer");
    var contactFormContainer = document.getElementById("contactFormContainer");
    var contactFormContent = document.getElementById("contactFormContent");
    var contactFormGradient = document.getElementById("contactFormGradient");
    var contactFormTitle = document.getElementById("contactFormTitle");
    var contactFormSVGRect = document.getElementsByClassName("iconRectContact");
    var iconContactForm = document.getElementById("iconContact");
    var iconContactForm2 = document.getElementById("iconContact2");
    var contactFormSVGRect2 = document.getElementsByClassName("iconRectContact2");
    var titleContactContainer = document.getElementById("titleContactContainer");
    var formwrapper1 = document.getElementById("FormWrapper");
    var formwrapper2 = document.getElementById("FormWrapper2");
    var formwrapper3 = document.getElementById("FormWrapper3");
    var CanvasParticle = document.getElementById("particles-js");
    var btnSubmit = document.getElementById("FormContactBtn");
    var titleSVG = document.getElementById("titleSVG");

    TweenMax.set(contentFrame, {filter: 'grayscale(0%) blur(0px) hue-rotate(0deg)'});
    TweenMax.set(btnSubmit,{opacity:0, display:"none"});
    TweenMax.to(contentFrame,0.2, {filter: 'grayscale(50%) blur(20px) hue-rotate(-15deg)'});
    TweenMax.to(contactFormContainer,0.3, {opacity:1, display:'block'});
    TweenMax.to(formwrapper1,0.3, {opacity:1,delay:0.25});
    TweenMax.to(formwrapper2,0.3, {opacity:1, delay:0.35});
    TweenMax.to(formwrapper3,0.3, {opacity:1, delay:0.45});
    TweenMax.set(CanvasParticle, {top:0});
    TweenMax.set(contactFormContent,{opacity:1, display:'block'});
    TweenMax.to(CanvasParticle,0.3, {opacity:1});
    TweenMax.to(contactFormGradient,0.3, {left:0, opacity:1, ease:Power1.easeOut});
    TweenMax.fromTo(contactFormTitle,0.3, {top:"5%", opacity:0, ease:Power1.easeOut},{opacity:1,top:"0"});
    TweenMax.fromTo(iconContactForm2,0.3, {opacity:0, y:10}, {opacity:1, y:-10,ease:Power1.easeOut, delay:0.25});
    TweenMax.fromTo(iconContactForm,0.3, {opacity:0, y:10}, {opacity:1, y:-10,ease:Power1.easeOut, delay:0.35});
    TweenMax.fromTo(titleContactContainer,0.3, {opacity:0, x:-10}, {opacity:1, x:0,ease:Power1.easeOut, delay:0.35});
    TweenMax.fromTo(contactFormSVGRect,0.5, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
    TweenMax.to(contactFormSVGRect,5,{y:-55, yoyo:true, repeat:-1, ease:Power1.easeInOut});
    TweenMax.to(iconContactForm,5,{y:15, yoyo:true, repeat:-1, ease:Power1.easeInOut, delay:0.55});
    TweenMax.to(iconContactForm2,5,{y:15, yoyo:true, repeat:-1, ease:Power1.easeInOut, delay:0.55});

    TweenMax.fromTo(contactFormSVGRect2,0.4, {opacity:0, y:-60}, {opacity:1, y:-32, ease:Power1.easeOut,delay:0.25});
    animate.animation('NavHide');
  }

  labelMail()
  {
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label");
    var FormInputMailTextSVG = document.getElementsByClassName("EMAILsvg");

    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});
    TweenMax.to(FormInputMailTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelMailUnderbar()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_mail");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:3, width:'100%'});
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label");
    var FormInputMailTextSVG = document.getElementsByClassName("EMAILsvg");

    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});
    TweenMax.to(FormInputMailTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelMailUnderbarBlur()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_mail");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:1});
  }

  labelSubject()
  {
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label--subject");
    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});

    var FormInputSubjectTextSVG = document.getElementsByClassName("SUBJECTsvg");
    TweenMax.to(FormInputSubjectTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelSubjectUnderbar()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_subject");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:3, width:'100%'});
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label--subject");
    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});

    var FormInputSubjectTextSVG = document.getElementsByClassName("SUBJECTsvg");
    TweenMax.to(FormInputSubjectTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelSubjectUnderbarBlur()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_subject");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:1});
  }

  labelWrite()
  {
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label--write");
    var FormInputMailTextSVG = document.getElementsByClassName("WRITEsvg");

    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});
    TweenMax.to(FormInputMailTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelWriteUnderbar()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_write");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:3, width:'100%'});
    var FormInputMailText = document.getElementsByClassName("input__field--contact--label--write");
    var FormInputMailTextSVG = document.getElementsByClassName("WRITEsvg");

    TweenMax.to(FormInputMailText,0.25, {y:50, color:'#c2fffe'});
    TweenMax.to(FormInputMailTextSVG,0.25, {fill:'#c2fffe'});
  }

  labelWriteUnderbarBlur()
  {
    var FormInputMailUnderbar = document.getElementsByClassName("underbar_input_write");
    TweenMax.to(FormInputMailUnderbar,0.25, {height:1});
  }

  overBtn() {
    var underbar = document.getElementsByClassName("btn-underbar-submit");
    var downloadIcon = document.getElementsByClassName("fa-w-14");
    var bg = document.getElementById("bg_btn_submit_svg");
    var FormContactBtn = document.getElementById("FormContactBtn");
      TweenMax.to(underbar, 0.2,{opacity:1, delay:0.6});
      TweenMax.fromTo(downloadIcon, 0.5,{y:-5}, {y:0, yoyo:true, repeat:-1, ease : Power1.easeOut});
      TweenMax.fromTo(bg,0.6, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
      TweenMax.to(FormContactBtn,0.3, {scale:'1.08', transformOrigin:0.5, ease : Power1.easeOut});
      // TweenMax.fromTo('#previous_losange',0.3, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
  }

  outBtn() {
    var underbar = document.getElementsByClassName("btn-underbar-submit");
    var downloadIcon = document.getElementsByClassName("fa-w-14");
    var bg = document.getElementById("bg_btn_submit_svg");
    var FormContactBtn = document.getElementById("FormContactBtn");
      TweenMax.killTweensOf(downloadIcon);
      TweenMax.to(downloadIcon, 0.5,{y:0});
      TweenMax.set(underbar, {opacity:0});
      TweenMax.fromTo(bg,0.6, {drawSVG:"100% 0%"}, {drawSVG:"100% 100%", ease:Power1.easeOut});
      TweenMax.to(FormContactBtn,0.3, {scale:'1', transformOrigin:0.5, ease : Power1.easeOut});
      // TweenMax.fromTo('#previous_losange',0.3, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut});
  }

  overClose()
  {
    var underbarClose = document.getElementsByClassName("underbar_close");
    var closeSVG = document.getElementById("closeSVG");
    TweenMax.to(underbarClose, 0.2,{height:4, opacity:1, ease:Power1.easeOut});
    TweenMax.to(closeSVG, 0.2,{y:-17, opacity:1, ease:Power1.easeOut});
  }

  outClose()
  {
    var underbarClose = document.getElementsByClassName("underbar_close");
    var closeSVG = document.getElementById("closeSVG");
    TweenMax.to(underbarClose, 0.2,{height:2, opacity:0.3, ease:Power1.easeOut});
    TweenMax.to(closeSVG, 0.2,{y:-13, opacity:0.5, ease:Power1.easeOut});
  }

  endContact()
  {
    var contentFrame = document.getElementsByClassName("Maincontainer");
    var contactFormContainer = document.getElementById("contactFormContainer");
    var contactFormGradient = document.getElementById("contactFormGradient");
    var contactFormTitle = document.getElementById("contactFormTitle");
    var formwrapper1 = document.getElementById("FormWrapper");
    var formwrapper2 = document.getElementById("FormWrapper2");
    var formwrapper3 = document.getElementById("FormWrapper3");
    var CanvasParticle = document.getElementById("particles-js");
    var input1 = document.getElementsByTagName("input");
    TweenMax.to(contentFrame,0.2, {filter: 'grayscale(0%) blur(0px) hue-rotate(0deg)'});
    TweenMax.to(contactFormContainer,0.3, {opacity:0, display:'none'});
    TweenMax.set(formwrapper1, {opacity:0});
    TweenMax.set(formwrapper2, {opacity:0});
    TweenMax.set(formwrapper3, {opacity:0});
    TweenMax.set(CanvasParticle, {opacity:0,top:"-100%"});
    TweenMax.to(contactFormGradient,0.3, {left:"-100%", opacity:0, ease:Power1.easeOut});
    animate.animation('NavShow');
  }

  hoverMenu()
  {
    var menu = document.getElementById('navigation-desktop-gradient');
    TweenMax.to(menu,0.3, {opacity:1});
  }

  LeaveMenu()
  {
    var menu = document.getElementById('navigation-desktop-gradient');
    TweenMax.to(menu,0.3, {opacity:0.85});
  }

  render() {
    return (<div>

      <div id="contactFormContainer">
        <div id="contactFormContent">
        <div id="contactFormTitle">
          <div id="titleSVG">
            <svg id="Capa_1" x="0px" y="0px"  width="100%" height="100%" viewBox="0 0 512 512">
            <rect className="iconRectContact" x="89.1" y="89.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 256 -106.0387)" width="300" height="300"/>
    <path id="iconContact" d="M235.4,263c-13.8-5.8-24.8-13.8-32.7-23.8c-8-10.1-12-21-12-32.8s4-22.8,12-32.8c8-10.1,18.9-18,32.7-23.8
  c13.8-5.8,28.9-8.7,45.1-8.7c16.3,0,31.3,2.9,45.1,8.7s24.8,13.8,32.7,23.8c8,10.1,12,21,12,32.8c0,10.1-3.1,19.7-9.1,28.6
  c-6,9-14.3,16.5-24.9,22.6c0.8,2,1.7,3.9,2.6,5.6c0.9,1.7,1.9,3.4,3.2,4.9c1.3,1.6,2.2,2.8,2.9,3.7c0.7,0.9,1.8,2.2,3.4,3.8
  c1.6,1.6,2.5,2.7,2.9,3.2c0-0.1,0.1,0.1,0.5,0.6c0.4,0.4,0.5,0.7,0.6,0.7c0.1-0.1,0.2,0.1,0.5,0.7c0.3,0.4,0.4,0.7,0.4,0.7l0.3,0.7
  c0.1,0.2,0.2,0.5,0.2,0.7c0.1,0.2,0.1,0.5,0.1,0.8s-0.1,0.6-0.1,0.8c-0.1,1.1-0.7,2-1.5,2.7c-0.8,0.7-1.7,1-2.6,1h-0.4
  c-4.3-0.6-7.9-1.3-11-2c-13.1-3.4-24.9-8.9-35.5-16.3c-7.7,1.3-15.1,2-22.5,2C264.3,271.8,249.2,268.9,235.4,263z M306.8,252.3
  l5.6,4c2.4,1.6,5,3.3,7.9,5l-4.5-10.7l12.4-7.2c8.2-4.8,14.5-10.4,19-16.9c4.6-6.5,6.8-13.2,6.8-20.2c0-8.7-3.4-16.8-10-24.4
  c-6.7-7.6-15.7-13.6-27-18c-11.3-4.4-23.5-6.6-36.6-6.6s-25.2,2.2-36.6,6.6c-11.3,4.4-20.4,10.4-27,18c-6.7,7.6-10,15.7-10,24.4
  c0,8.7,3.4,16.8,10,24.4c6.7,7.6,15.7,13.6,27,18c11.3,4.4,23.5,6.6,36.6,6.6c6.4,0,12.9-0.6,19.5-1.8L306.8,252.3z"/>
<path id="iconContact2" d="M150.7,267.7c-6-8.9-9.1-18.4-9.1-28.6c0-10.4,3.2-20.3,9.5-29.4c6.4-9.1,15.1-16.7,26-22.8
  c-1.9,6.4-2.9,12.8-2.9,19.4c0,11.4,2.8,22.2,8.6,32.4c5.7,10.2,13.9,19.2,24.5,27.1c9.8,7.2,21.1,12.6,33.7,16.5
  c12.6,3.8,25.7,5.7,39.5,5.7c2.5,0,6.3-0.1,11.3-0.5c-17.2,11.2-37.2,16.9-60.3,16.9c-7.3,0-14.8-0.7-22.5-2
  c-10.6,7.5-22.4,12.9-35.5,16.3c-3.1,0.7-6.7,1.4-11,2c-1,0.1-1.9-0.2-2.8-0.9c-0.8-0.7-1.4-1.6-1.6-2.8c0.1-0.5,0-0.8-0.1-0.8
  c-0.1-0.1-0.1-0.3,0.1-0.8c0.1-0.5,0.2-0.7,0.2-0.7l0.3-0.7c0.1-0.1,0.2-0.4,0.4-0.7s0.4-0.5,0.5-0.7c0.1-0.1,0.3-0.4,0.6-0.7
  c0.2-0.3,0.4-0.5,0.5-0.6c0.4-0.5,1.4-1.6,2.9-3.2c1.6-1.6,2.6-2.8,3.4-3.7c0.7-0.9,1.6-2.2,2.9-3.7c1.3-1.6,2.3-3.2,3.2-4.9
  s1.8-3.6,2.6-5.6C165,284.1,156.8,276.6,150.7,267.7z"/>
            <rect className="iconRectContact2" x="89.1" y="89.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 256 -106.0387)" width="300" height="300"/>
            </svg>
          </div>
          <div id="titleContactContainer">
          <span className="contactTitle">Contact</span>
          <span className="contactSub">Envoyez un mail</span>
        </div>
        <div id="button_close" onMouseEnter={this.overClose.bind(this)} onMouseLeave={this.outClose.bind(this)} onClick={this.endContact.bind(this)} >
          <svg id="closeSVG" x="0px" y="0px" viewBox="0 0 212.982 212.982" width="40%" height="40%">
	<path  d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" fill="#FFFFFF"/>
</svg>
<div className="underbar_close"></div>
        </div>
        </div>
        <div id="FormWrapper">
          <span className="input input--contact">
          					<input id="input1" spellCheck="false" autoComplete="off" name="email" value={this.state.email} onChange={this.onChange} className="input__field--contact" onFocus={this.labelMailUnderbar.bind(this)} onBlur={this.labelMailUnderbarBlur.bind(this)} maxLength="35" type="text" id="input-4" />
                    <div className="underbar_input_mail"></div>
          					<label className="input__field--contact--label">
    <svg x="0px" y="0px" width="3%" height="100%" viewBox="0 0 79.536 79.536">
    <path className="EMAILsvg" d="M39.773,1.31L0,31.004v47.222h79.536V31.004L39.773,1.31z M28.77,22.499   c1.167-2.133,2.775-3.739,4.815-4.805c2.035-1.075,4.357-1.616,6.983-1.616c2.214,0,4.191,0.435,5.921,1.292   c1.729,0.87,3.045,2.094,3.967,3.687c0.9,1.595,1.367,3.334,1.367,5.217c0,2.247-0.694,4.279-2.082,6.097   c-1.74,2.292-3.961,3.436-6.68,3.436c-0.732,0-1.279-0.122-1.654-0.38c-0.365-0.262-0.621-0.632-0.743-1.129   c-1.022,1.012-2.231,1.52-3.589,1.52c-1.465,0-2.679-0.507-3.643-1.509c-0.966-1.012-1.447-2.361-1.447-4.031   c0-2.084,0.578-3.966,1.743-5.672c1.416-2.084,3.218-3.13,5.424-3.13c1.571,0,2.731,0.601,3.475,1.805l0.331-1.468h3.5   l-1.998,9.479c-0.125,0.606-0.187,0.986-0.187,1.163c0,0.228,0.052,0.38,0.149,0.497c0.099,0.111,0.223,0.165,0.357,0.165   c0.436,0,0.979-0.248,1.646-0.769c0.901-0.663,1.627-1.574,2.181-2.695c0.554-1.129,0.839-2.299,0.839-3.508   c0-2.165-0.782-3.977-2.352-5.445c-1.573-1.45-3.77-2.185-6.578-2.185c-2.393,0-4.417,0.487-6.077,1.468   c-1.66,0.966-2.913,2.343-3.765,4.114c-0.839,1.76-1.258,3.607-1.258,5.52c0,1.856,0.479,3.552,1.411,5.074   c0.945,1.533,2.26,2.641,3.956,3.345c1.696,0.697,3.643,1.046,5.828,1.046c2.097,0,3.909-0.293,5.432-0.881   c1.522-0.587,2.739-1.457,3.666-2.641h2.807c-0.88,1.792-2.227,3.192-4.049,4.215c-2.092,1.163-4.64,1.74-7.644,1.74   c-2.918,0-5.426-0.487-7.542-1.468c-2.121-0.986-3.689-2.434-4.73-4.35c-1.028-1.918-1.535-4.008-1.535-6.268   C27.017,26.952,27.595,24.64,28.77,22.499z M2.804,31.941l29.344,19.68L2.804,74.333V31.941z M5.033,75.844l34.74-26.885   l34.729,26.885H5.033z M76.729,74.333L47.391,51.621l29.339-19.68V74.333z M41.205,24.661c0.466,0.531,0.699,1.295,0.699,2.292   c0,0.891-0.174,1.856-0.513,2.879c-0.334,1.036-0.743,1.826-1.209,2.361c-0.318,0.375-0.658,0.652-0.992,0.826   c-0.439,0.249-0.906,0.37-1.41,0.37c-0.674,0.006-1.23-0.264-1.691-0.794c-0.45-0.531-0.673-1.346-0.673-2.465   c0-0.839,0.158-1.805,0.487-2.889c0.329-1.088,0.81-1.916,1.453-2.509c0.647-0.588,1.346-0.881,2.1-0.881   C40.162,23.856,40.749,24.125,41.205,24.661z" fill="#FFFFFF"/>
</svg>
          						<span className="input__label-content input__label-content--hoshi">Prénom</span>
          					</label>
                  </span>
        </div>
        <div id="FormWrapper2">
          <input spellCheck="false" id="input2" name="subject" onChange={this.onChange} value={this.state.subject} className="input__field--contact subject"  maxLength="45" onFocus={this.labelSubjectUnderbar.bind(this)} onBlur={this.labelSubjectUnderbarBlur.bind(this)} type="text" id="input-4" />
          <div className="underbar_input_subject"></div>
          <label className="input__field--contact--label--subject">
            <svg x="0px" y="0px" width="3%" height="100%" viewBox="0 0 53.011 53.011">
              <path className="SUBJECTsvg" d="M52.963,21.297c-0.068-0.329-0.297-0.603-0.609-0.727c-2.752-1.097-5.67-1.653-8.673-1.653  c-4.681,0-8.293,1.338-9.688,1.942L19.114,8.2c0.52-4.568-1.944-7.692-2.054-7.828C16.881,0.151,16.618,0.016,16.335,0  c-0.282-0.006-0.561,0.091-0.761,0.292L0.32,15.546c-0.202,0.201-0.308,0.479-0.291,0.765c0.016,0.284,0.153,0.549,0.376,0.726  c2.181,1.73,4.843,2.094,6.691,2.094c0.412,0,0.764-0.019,1.033-0.04l12.722,14.954c-0.868,2.23-3.52,10.27-0.307,18.337  c0.124,0.313,0.397,0.541,0.727,0.609c0.067,0.014,0.135,0.021,0.202,0.021c0.263,0,0.518-0.104,0.707-0.293l14.57-14.57  l13.57,13.57c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414l-13.57-13.57  l14.527-14.528C52.929,21.969,53.031,21.627,52.963,21.297z" fill="#FFFFFF"/>
        </svg>
            <span className="input__label-content input__label-content--hoshi">Sujet</span>
          </label>
        </div>
        <div id="FormWrapper3">
          <textarea spellCheck="false" id="input3" name="message" onChange={this.onChange} value={this.state.message} className="input__field--contact write"  maxLength="500" onFocus={this.labelWriteUnderbar.bind(this)} onBlur={this.labelWriteUnderbarBlur.bind(this)} type="text" id="input-4" />
          <div className="underbar_input_write"></div>
          <label className="input__field--contact--label--write">
            <svg width="3%" height="100%" x="0px" y="0px" viewBox="0 0 437.212 437.212">
      <path className="WRITEsvg" d="M404.812,41.206h-300c-18,0-32.4,14.8-32.4,32.4v186.4c0,18,14.8,32.4,32.4,32.4h206.8l46.8,47.2c2,2,4.4,3.2,7.2,3.2     c5.6,0,10.4-4.4,10.4-10.4v-40h28.8c18,0,32.4-14.8,32.4-32.4v-186.4C437.212,55.606,422.412,41.206,404.812,41.206z      M150.812,201.606c-16.4,0-30-13.6-30-30c0-16.4,13.6-30,30-30c16.4,0,30,13.6,30,30     C180.812,188.006,167.612,201.606,150.812,201.606z M256.012,201.606c-16.4,0-30-13.6-30-30c0-16.4,13.6-30,30-30     c16.4,0,30,13.6,30,30C286.012,188.006,272.412,201.606,256.012,201.606z M360.812,201.606c-16.4,0-30-13.6-30-30     c0-16.4,13.6-30,30-30c16.4,0,30,13.6,30,30C390.812,188.006,377.212,201.606,360.812,201.606z" fill="#FFFFFF"/>
      <path className="WRITEsvg" d="M54.012,260.806v-63.6h-32.8c-11.6,0-21.2,9.6-21.2,21.2v122.4c-0.4,12.4,9.2,22,21.2,22h18.8v26.4     c0,3.6,3.2,6.8,6.8,6.8c2,0,3.6-0.8,4.8-2l30.8-30.8h136c11.6,0,21.2-9.6,21.2-21.2v-30.4h-134.8     C76.812,311.606,54.012,288.806,54.012,260.806z" fill="#FFFFFF"/>
</svg>
            <span className="input__label-content input__label-content--hoshi">Message</span>
          </label>
        </div>
        <div id="FormContactBtn" onMouseEnter={this.overBtn.bind(this)} onClick={this.onSubmit} onMouseLeave={this.outBtn.bind(this)} >
          <button className="button_submit" type="submit" >
          <h4>
<span className="submitTxt">
<span className="Txt">
  <svg x="0px" y="0px" viewBox="0 0 334.5 334.5" width="5%" >
<path d="M332.797,13.699c-1.489-1.306-3.608-1.609-5.404-0.776L2.893,163.695c-1.747,0.812-2.872,2.555-2.893,4.481  s1.067,3.693,2.797,4.542l91.833,45.068c1.684,0.827,3.692,0.64,5.196-0.484l89.287-66.734l-70.094,72.1  c-1,1.029-1.51,2.438-1.4,3.868l6.979,90.889c0.155,2.014,1.505,3.736,3.424,4.367c0.513,0.168,1.04,0.25,1.561,0.25  c1.429,0,2.819-0.613,3.786-1.733l48.742-56.482l60.255,28.79c1.308,0.625,2.822,0.651,4.151,0.073  c1.329-0.579,2.341-1.705,2.775-3.087L334.27,18.956C334.864,17.066,334.285,15.005,332.797,13.699z" fill="#FFFFFF"/>
</svg>
   Envoie</span>
</span>
</h4>
          <div className="btn-underbar-submit"></div>
          <svg version="1.1" x="0px" y="0px" id="bg_btn_submit" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 503.3 102">
    <polygon id="bg_btn_submit_svg" className="st0" strokeDasharray="0" strokeWidth="1" width="100%" height="100%" points="467.6,0.5 36.2,0.5 25.5,51 36.2,101.5 467.6,101.5 481.1,51 "/>
    </svg>
        </button>
        </div>
      </div>
      <div id="contactFormGradient"></div>
    </div>

      <div id={this.state.css} className={this.navtype + this.navshow}>
        <div className={"logo-small-container desktop"}>
          <div className="logo_little_all">
            <div className="logo-small"></div>
            <div className="logo_title_small"></div>
          </div>
        </div>
        <div className={'nav-inner-new ' + this.state.css + ' nav-show'}>
          <div className="nav-ul">
            <div id="version">Version α</div>
            <li className={'nav-li contactLi' + this.state.navtype}>
              <Link to="/project" className={this.projectStyle}>
              <span className="NavTitle">Contact</span>
              <svg id="Capa_1" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 511.62 511.619">
                  <path d="M301.923,327.602c30.93-13.038,55.34-30.785,73.228-53.248c17.891-22.458,26.837-46.915,26.837-73.372    c0-26.458-8.946-50.914-26.837-73.376c-17.888-22.459-42.298-40.208-73.228-53.249c-30.93-13.039-64.571-19.556-100.928-19.556    c-36.354,0-69.995,6.521-100.927,19.56C69.14,87.4,44.729,105.149,26.84,127.609C8.947,150.068,0,174.523,0,200.982    c0,22.648,6.764,43.975,20.276,63.957c13.512,19.985,32.071,36.833,55.671,50.535c-1.902,4.572-3.853,8.754-5.852,12.566    c-2,3.806-4.377,7.467-7.139,10.991c-2.76,3.525-4.899,6.283-6.423,8.275c-1.523,1.998-3.997,4.809-7.424,8.422    c-3.428,3.617-5.618,5.996-6.567,7.135c0-0.191-0.383,0.24-1.143,1.287c-0.763,1.047-1.191,1.52-1.287,1.431    c-0.094-0.103-0.476,0.373-1.141,1.42c-0.666,1.048-1,1.571-1,1.571l-0.715,1.423c-0.284,0.568-0.476,1.137-0.57,1.712    c-0.096,0.567-0.144,1.19-0.144,1.854s0.094,1.28,0.286,1.854c0.383,2.471,1.477,4.466,3.284,5.996    c1.809,1.52,3.757,2.279,5.854,2.279h0.857c9.515-1.332,17.701-2.854,24.552-4.569c29.312-7.614,55.771-19.797,79.372-36.545    c17.128,3.046,33.88,4.568,50.248,4.568C237.349,347.156,270.994,340.641,301.923,327.602z M142.184,303.767l-12.564,8.846    c-5.33,3.614-11.227,7.331-17.7,11.14l9.995-23.986l-27.694-15.988c-18.276-10.656-32.454-23.219-42.542-37.685    c-10.089-14.465-15.131-29.502-15.131-45.111c0-19.417,7.474-37.594,22.414-54.534c14.938-16.94,35.067-30.358,60.382-40.259    c25.313-9.895,52.532-14.847,81.653-14.847c29.121,0,56.342,4.952,81.654,14.847c25.313,9.9,45.442,23.319,60.388,40.259    c14.94,16.939,22.408,35.116,22.408,54.534c0,19.414-7.468,37.59-22.408,54.53c-14.945,16.945-35.074,30.36-60.388,40.256    c-25.312,9.897-52.53,14.846-81.654,14.846c-14.272,0-28.833-1.335-43.681-3.997L142.184,303.767z" fill="#FFFFFF"/>
                  <path d="M491.347,338.156c13.518-19.896,20.272-41.255,20.272-64.098c0-23.411-7.139-45.303-21.409-65.666    c-14.277-20.362-33.694-37.305-58.245-50.819c4.374,14.274,6.563,28.739,6.563,43.398c0,25.503-6.368,49.676-19.129,72.519    c-12.752,22.836-31.025,43.01-54.816,60.524c-22.08,15.988-47.205,28.261-75.377,36.829    c-28.164,8.562-57.573,12.848-88.218,12.848c-5.708,0-14.084-0.377-25.122-1.137c38.256,25.119,83.177,37.685,134.756,37.685    c16.371,0,33.119-1.526,50.251-4.571c23.6,16.755,50.06,28.931,79.37,36.549c6.852,1.718,15.037,3.237,24.554,4.568    c2.283,0.195,4.381-0.476,6.283-1.995c1.903-1.526,3.142-3.614,3.71-6.276c-0.089-1.143,0-1.77,0.287-1.861    c0.281-0.09,0.233-0.712-0.144-1.852c-0.376-1.144-0.568-1.715-0.568-1.715l-0.712-1.424c-0.198-0.376-0.52-0.903-0.999-1.567    c-0.476-0.66-0.855-1.14-1.143-1.427c-0.28-0.284-0.705-0.763-1.28-1.424c-0.568-0.66-0.951-1.092-1.143-1.283    c-0.951-1.143-3.139-3.521-6.564-7.139c-3.429-3.613-5.899-6.42-7.422-8.418c-1.523-1.999-3.665-4.757-6.424-8.282    c-2.758-3.518-5.14-7.183-7.139-10.991c-1.998-3.806-3.949-7.995-5.852-12.56C459.281,374.855,477.843,358.059,491.347,338.156z" fill="#FFFFFF"/>
              </svg>
            </Link>
            </li>
            <li className={'nav-li contactLi' + this.state.navtype}>
              <a className={this.projectStyle} onClick={this.clickContact.bind(this)}>
              <span className="NavTitle">Contact</span>
              <svg id="Capa_1" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 511.62 511.619">
              		<path d="M301.923,327.602c30.93-13.038,55.34-30.785,73.228-53.248c17.891-22.458,26.837-46.915,26.837-73.372    c0-26.458-8.946-50.914-26.837-73.376c-17.888-22.459-42.298-40.208-73.228-53.249c-30.93-13.039-64.571-19.556-100.928-19.556    c-36.354,0-69.995,6.521-100.927,19.56C69.14,87.4,44.729,105.149,26.84,127.609C8.947,150.068,0,174.523,0,200.982    c0,22.648,6.764,43.975,20.276,63.957c13.512,19.985,32.071,36.833,55.671,50.535c-1.902,4.572-3.853,8.754-5.852,12.566    c-2,3.806-4.377,7.467-7.139,10.991c-2.76,3.525-4.899,6.283-6.423,8.275c-1.523,1.998-3.997,4.809-7.424,8.422    c-3.428,3.617-5.618,5.996-6.567,7.135c0-0.191-0.383,0.24-1.143,1.287c-0.763,1.047-1.191,1.52-1.287,1.431    c-0.094-0.103-0.476,0.373-1.141,1.42c-0.666,1.048-1,1.571-1,1.571l-0.715,1.423c-0.284,0.568-0.476,1.137-0.57,1.712    c-0.096,0.567-0.144,1.19-0.144,1.854s0.094,1.28,0.286,1.854c0.383,2.471,1.477,4.466,3.284,5.996    c1.809,1.52,3.757,2.279,5.854,2.279h0.857c9.515-1.332,17.701-2.854,24.552-4.569c29.312-7.614,55.771-19.797,79.372-36.545    c17.128,3.046,33.88,4.568,50.248,4.568C237.349,347.156,270.994,340.641,301.923,327.602z M142.184,303.767l-12.564,8.846    c-5.33,3.614-11.227,7.331-17.7,11.14l9.995-23.986l-27.694-15.988c-18.276-10.656-32.454-23.219-42.542-37.685    c-10.089-14.465-15.131-29.502-15.131-45.111c0-19.417,7.474-37.594,22.414-54.534c14.938-16.94,35.067-30.358,60.382-40.259    c25.313-9.895,52.532-14.847,81.653-14.847c29.121,0,56.342,4.952,81.654,14.847c25.313,9.9,45.442,23.319,60.388,40.259    c14.94,16.939,22.408,35.116,22.408,54.534c0,19.414-7.468,37.59-22.408,54.53c-14.945,16.945-35.074,30.36-60.388,40.256    c-25.312,9.897-52.53,14.846-81.654,14.846c-14.272,0-28.833-1.335-43.681-3.997L142.184,303.767z" fill="#FFFFFF"/>
              		<path d="M491.347,338.156c13.518-19.896,20.272-41.255,20.272-64.098c0-23.411-7.139-45.303-21.409-65.666    c-14.277-20.362-33.694-37.305-58.245-50.819c4.374,14.274,6.563,28.739,6.563,43.398c0,25.503-6.368,49.676-19.129,72.519    c-12.752,22.836-31.025,43.01-54.816,60.524c-22.08,15.988-47.205,28.261-75.377,36.829    c-28.164,8.562-57.573,12.848-88.218,12.848c-5.708,0-14.084-0.377-25.122-1.137c38.256,25.119,83.177,37.685,134.756,37.685    c16.371,0,33.119-1.526,50.251-4.571c23.6,16.755,50.06,28.931,79.37,36.549c6.852,1.718,15.037,3.237,24.554,4.568    c2.283,0.195,4.381-0.476,6.283-1.995c1.903-1.526,3.142-3.614,3.71-6.276c-0.089-1.143,0-1.77,0.287-1.861    c0.281-0.09,0.233-0.712-0.144-1.852c-0.376-1.144-0.568-1.715-0.568-1.715l-0.712-1.424c-0.198-0.376-0.52-0.903-0.999-1.567    c-0.476-0.66-0.855-1.14-1.143-1.427c-0.28-0.284-0.705-0.763-1.28-1.424c-0.568-0.66-0.951-1.092-1.143-1.283    c-0.951-1.143-3.139-3.521-6.564-7.139c-3.429-3.613-5.899-6.42-7.422-8.418c-1.523-1.999-3.665-4.757-6.424-8.282    c-2.758-3.518-5.14-7.183-7.139-10.991c-1.998-3.806-3.949-7.995-5.852-12.56C459.281,374.855,477.843,358.059,491.347,338.156z" fill="#FFFFFF"/>
              </svg>
            </a>
            </li>
            <MuiThemeProvider>
              <div className={'configBox '}>
                <Checkbox checkedIcon={<FontIcon className = "material-icons checkActivated" > pause_circle_outline</FontIcon>} uncheckedIcon={<FontIcon className = "material-icons checkDesactivated" > play_circle_outline</FontIcon>} label="Musique" labelStyle={{
                    color: '#bfbfbf'
                  }} onCheck={this.clickedMusic} checked={store.getState().MUSIC
                    ? true
                    : false} style={{
                    margin: 'auto',
                    width: '162px',
                    fontSize: '2em',
                    textAlign: 'left',
                    fontFamily: 'Roboto',
                    float: 'left',
                    paddingLeft: 30,
                    paddingTop: 33,
                    paddingRight: 33,
                    paddingBottom: 23
                  }}/> {/* <Toggle
                           label="Musique"
                           toggled={store.getState().MUSIC ? true : false}
                           onToggle={this.clickedMusic}
                           labelPosition="right"
                           trackSwitchedStyle={styles.trackSwitched}
                           style={{margin: 'auto', width:'80%',fontSize:'1.8em',fontFamily:'Roboto',borderBottom:'1px solid rgba(255,255,255,0.1)', fontWeight: "300", paddingTop:25,paddingBottom:15}}
                         /> */
                }
                <Checkbox checkedIcon={<FontIcon className = "material-icons checkActivated" > visibility</FontIcon>} uncheckedIcon={<FontIcon className = "material-icons checkDesactivated" > visibility_off</FontIcon>} label="Animations WebGL" onCheck={this.clickedWebgl} labelStyle={{
                    color: '#bfbfbf'
                  }} checked={store.getState().WEB_GL
                    ? true
                    : false} style={{
                    margin: 'auto',
                    width: '250px',
                    textAlign: 'left',
                    fontSize: '2em',
                    float: 'left',
                    position: 'absolute',
                    paddingLeft: 23,
                    right: '0',
                    fontFamily: 'Roboto',
                    paddingTop: 33,
                    paddingBottom: 33,
                    paddingRight: 30
                  }}/> {/* <Toggle
                      label="Animations"
                      toggled={store.getState().WEB_GL ? true : false}
                      onToggle={this.clickedWebgl}
                      thumbSwitchedStyle={styles.thumbSwitched}
                      labelPosition="right"
                      style={{margin: 'auto', width:'80%',fontSize:'1.8em',fontFamily:'Book Antiqua', fontWeight: "300", fontColor:'#FFFFFF', paddingTop:15,paddingBottom:25, borderRadius:"30px"}}
                  /> */
                }
              </div>
            </MuiThemeProvider>
            <div id="navigation-Underbar"></div>
          </div>
        </div>
        <div id="navigation-desktop-gradient"></div>
      </div>
      <div className='icon-scroll'></div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
