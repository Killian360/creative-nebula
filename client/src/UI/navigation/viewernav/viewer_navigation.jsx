import React, {Component} from "react";

import './style.css';
import {store} from '../../../reducers/combinereducers.js';
import {connect} from 'react-redux';
import JSONdata from '../../../JSON/projets.json';
import {
  TweenMax,
  Power1,
  Linear
} from "gsap";
import * as animate from '../animation'
import { withRouter } from 'react-router';

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

class NavigationViewer extends Component {
  constructor(props) {
    super(props);
    this.URLSLIDER = window.location.pathname.split('/')[1];

    if (store.getState().SLIDE.slide===JSONdata.projets.length-1)
    {
      this.NextSlide = JSONdata.projets[0];
    } else {
      var SlideGet4 = store.getState().SLIDE.slide+1;
      this.NextSlide = JSONdata.projets[SlideGet4];
    }
    if (store.getState().SLIDE.slide===0)
    {
      var SlideGet5 = JSONdata.projets.length-1;
      this.PrevSlide = JSONdata.projets[SlideGet5];
    } else {
      var SlideGet6 = store.getState().SLIDE.slide-1;
      this.PrevSlide = JSONdata.projets[SlideGet6];
    }
    this.switchPropsRight = this.switchPropsRight.bind(this);
    this.switchPropsToLeft = this.switchPropsToLeft.bind(this);
    this.isAnimating=false;
    this.clickaction=false;
  }

  componentDidMount() {
    // let Circle = document.getElementsByClassName("circleBtnanimateBar");
    // TweenMax.fromTo(Circle,2, {rotation:-20, transformOrigin:"center"}, {rotation:340,repeat:-1, repeatDelay:0.5, ease:Linear.easeNone});
    // var Navright = document.getElementById('Nav-right');
    // var Navleft = document.getElementById('Nav-left');
    //  TweenMax.set('#next_losange',{drawSVG:'0%'});
    //  TweenMax.set('#previous_losange',{drawSVG:'0%'});
    //  TweenMax.set(Navright,{height:Navright.clientWidth});
    //  TweenMax.set(Navleft,{height:Navleft.clientWidth});
    TweenMax.set('#nav--svg',{x:10});
    TweenMax.set('#nav--svg--right',{x:-10});

     if (store.getState().VIEWERON === true)
     {
       animate.animation('NavViewer');
     }
     if (store.getState().VIEWERON === false)
     {
       animate.animation('NavViewerOff');
     }
     window.addEventListener("resize", this.updateNav);
}

componentWillUnmount()
{
  window.removeEventListener("resize", this.updateNav);
}

updateNav()
{
  var Navright = document.getElementById('Nav-right');
  var Navleft = document.getElementById('Nav-left');
   TweenMax.set('#next_losange',{drawSVG:'0%'});
   TweenMax.set('#previous_losange',{drawSVG:'0%'});
   TweenMax.set(Navright,{height:Navright.clientWidth});
   TweenMax.set(Navleft,{height:Navleft.clientWidth});
}

clickedWebgl() {
    if (store.getState().WEB_GL === true) {
      store.dispatch({type: 'TOOGLEWEBGLOFF'})
    } else {
      store.dispatch({type: 'TOOGLEWEBGLON'})
    }
  }

  clickedMusic() {
    var music_player = document.getElementById('audioSource');
    var audio = document.getElementById('audio');
    if (store.getState().MUSIC === true) {
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

  componentDidUpdate(prevProps, prevState)
  {
    if (prevProps.SLIDE.slide !== this.props.SLIDE.slide)
    {
    if (store.getState().SLIDE.slide===JSONdata.projets.length-1)
    {
      this.NextSlide = JSONdata.projets[0];
    } else {
      var SlideGet4 = store.getState().SLIDE.slide+1;
      this.NextSlide = JSONdata.projets[SlideGet4];
    }
    if (store.getState().SLIDE.slide===0)
    {
      var SlideGet5 = JSONdata.projets.length-1;
      this.PrevSlide = JSONdata.projets[SlideGet5];
    } else {
      var SlideGet6 = store.getState().SLIDE.slide-1;
      this.PrevSlide = JSONdata.projets[SlideGet6];
    }
    }
  }

  clicked_right(e) {
    if (this.clickaction === false)
    {
      this.clickaction = true;

      var scene = document.getElementById("scene");

      TweenMax.to('#nav--svg--right',0.15,{x:20, yoyo:true, repeat:1, ease:Power1.easeOut});

      TweenMax.to("#logoHeader",0.2, {opacity:0 , left:-100, ease : Power1.easeOut});
      TweenMax.to(scene,0.2, {opacity:0 ,x:-100,onComplete:this.switchPropsRight});
    }
  }

switchPropsRight()
{
    this.props.history.push(this.NextSlide.id);
    this.clickaction=false;
    for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
      if (store.getState().LANG.JsonProjects.projets[i].id === this.props.match.params.slide) {
        store.dispatch({type: 'getSlide', text: i});
  }
    }
}

overRight(e) {
    TweenMax.to('#nav--svg--right',0.35,{x:0, ease:Power1.easeOut});
    TweenMax.to('#nav-right',0.35,{backgroundImage:'linear-gradient(-20deg, rgba(32,3,101,1) 0%,rgba(125,185,232,0) 50%)', ease:Power1.easeOut});
    TweenMax.to('.nav--Next--project',0.35,{opacity:1, ease:Power1.easeOut});
    }

outRight() {
  TweenMax.to('.nav--Next--project',0.35,{opacity:0.5, ease:Power1.easeOut});
  TweenMax.to('#nav--svg--right',0.35,{x:-10, ease:Power1.easeOut});
  TweenMax.to('#nav-right',0.35,{backgroundImage:'linear-gradient(-20deg, rgba(32,3,101,0.5) 0%,rgba(125,185,232,0) 50%)', ease:Power1.easeOut});
}

toggle = () => {
   this.setState({ LinkActive: true });
 }

clicked_left(e) {
  if (this.clickaction === false)
  {
    this.clickaction = true;
    var scene = document.getElementById("scene");
    TweenMax.to("#logoHeader",0.2, {opacity:0 , left:100, ease : Power1.easeOut});
    TweenMax.to(scene,0.2, {opacity:0 , x:100, onComplete:this.switchPropsToLeft});

    TweenMax.to('#nav--svg',0.15,{x:-20, yoyo:true, repeat:1, ease:Power1.easeOut});
  }
}

switchPropsToLeft()
{
  this.props.history.push(this.PrevSlide.id);
  this.clickaction=false;
  for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
    if (store.getState().LANG.JsonProjects.projets[i].id === this.props.match.params.slide) {
      store.dispatch({type: 'getSlide', text: i});
}
  }
}

overLeft() {
  TweenMax.to('#nav--svg',0.35,{x:0, ease:Power1.easeOut});
  TweenMax.to('.nav--Previous--project',0.35,{opacity:1, ease:Power1.easeOut});
  TweenMax.to('#nav-left',0.35,{backgroundImage:'linear-gradient(20deg, rgba(32,3,101,1) 0%,rgba(125,185,232,0) 50%)', ease:Power1.easeOut});
}

outLeft() {
  TweenMax.to('#nav--svg',0.35,{x:10, ease:Power1.easeOut});
  TweenMax.to('.nav--Previous--project',0.35,{opacity:0.5, ease:Power1.easeOut});
  TweenMax.to('#nav-left',0.35,{backgroundImage:'linear-gradient(20deg, rgba(32,3,101,0.5) 0%,rgba(125,185,232,0) 50%)', ease:Power1.easeOut});
}

  render() {
    return (
    <React.Fragment>
      <div id="navigationViewer">
        <div id="Nav-left">
        <div className="nav--Previous--project" onClick={this.clicked_left.bind(this)} onMouseEnter={this.overLeft.bind(this)}  onMouseLeave={this.outLeft.bind(this)} >
        {leftNav(this.PrevSlide.name)}
        </div>
        </div>
        <div id="Nav-right">
        <div className="nav--Next--project" onClick={this.clicked_right.bind(this)} onMouseEnter={this.overRight.bind(this)}  onMouseLeave={this.outRight.bind(this)} >
        {rightNav(this.NextSlide.name)}
        </div>
      </div>
    </div>
  </React.Fragment>
    );
    }
}

const rightNav = (text) => (
  <React.Fragment>
      <div id="nav--svg--right">
        <svg x="0px" className="SVGmenuViewer" y="0px" viewBox="0 0 31.494 31.494">
        <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
  </svg>
  </div>
  <div className="nav--btnTxt--right">{text}</div>
  </React.Fragment>
  )

const leftNav = (text) => (
<React.Fragment>
<div id="nav--svg">
      <svg x="0px" className="SVGmenuViewer" y="0px" viewBox="0 0 31.494 31.494">
        <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
</svg>
</div>
<div className="nav--btnTxt">{text}</div>
</React.Fragment>
)


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(NavigationViewer))
