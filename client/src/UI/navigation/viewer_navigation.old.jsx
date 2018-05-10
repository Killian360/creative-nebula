import React, {Component} from "react";

import './style.css';
import {store} from '../../reducers/combinereducers.js';
import {connect} from 'react-redux';
import JSONdata from '../../JSON/projets.json';
import {
  TweenMax,
  Power1,
  Linear
} from "gsap";
import * as animate from './animation'
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
      this.NextSlide = JSONdata.projets[0].id;
    } else {
      var SlideGet = store.getState().SLIDE.slide+1;
      this.NextSlide = JSONdata.projets[SlideGet].id;
    }
    if (store.getState().SLIDE.slide===0)
    {
      var SlideGet2 = JSONdata.projets.length-1;
      this.PrevSlide = JSONdata.projets[SlideGet2].id;
    } else {
      var SlideGet3 = store.getState().SLIDE.slide-1;
      this.PrevSlide = JSONdata.projets[SlideGet3].id;
    }
    this.switchPropsRight = this.switchPropsRight.bind(this);
    this.switchPropsToLeft = this.switchPropsToLeft.bind(this);
    this.isAnimating=false;
    this.clickaction=false;
  }

  componentDidMount() {
    let Circle = document.getElementsByClassName("circleBtnanimateBar");
    TweenMax.fromTo(Circle,2, {rotation:-20, transformOrigin:"center"}, {rotation:340,repeat:-1, repeatDelay:0.5, ease:Linear.easeNone});
    var Navright = document.getElementById('Nav-right');
    var Navleft = document.getElementById('Nav-left');
     TweenMax.set('#next_losange',{drawSVG:'0%'});
     TweenMax.set('#previous_losange',{drawSVG:'0%'});
     TweenMax.set(Navright,{height:Navright.clientWidth});
     TweenMax.set(Navleft,{height:Navleft.clientWidth});

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
      this.NextSlide = JSONdata.projets[0].id;
    } else {
      var SlideGet4 = store.getState().SLIDE.slide+1;
      this.NextSlide = JSONdata.projets[SlideGet4].id;
    }
    if (store.getState().SLIDE.slide===0)
    {
      var SlideGet5 = JSONdata.projets.length-1;
      this.PrevSlide = JSONdata.projets[SlideGet5].id;
    } else {
      var SlideGet6 = store.getState().SLIDE.slide-1;
      this.PrevSlide = JSONdata.projets[SlideGet6].id;
    }
    }
  }

  clicked_right(e) {
    if (this.clickaction === false)
    {
      this.clickaction = true;

      var arrowright = document.getElementById("arrowright");
      var scene = document.getElementById("scene");

      TweenMax.to(arrowright, 0.2, {x:2,y:-3, ease:Power1.easeOut});
      TweenMax.to(arrowright, 0.1, {x:0,y:0,scale:1, delay:0.2});

      TweenMax.to("#logoHeader",0.2, {opacity:0 , left:-100, ease : Power1.easeOut});
      TweenMax.to(scene,0.2, {opacity:0 ,x:-100,onComplete:this.switchPropsRight});
    }
  }

switchPropsRight()
{
    this.props.history.push(this.NextSlide);
    this.clickaction=false;
}

overRight(e) {
  if (this.isAnimating===false)
  {
    TweenMax.set('#Nav-right',{boxShadow: '0px 0px 0px 0px rgba(7,204,240,0)'});
    TweenMax.to('.losange_nav_css',0.2,{y:-3, x:-3});
    TweenMax.to('#Nav-right',0.35,{boxShadow: '0px 0px 45px 0px rgba(7,128,240,0.45)',animation: "radiant-highlight-bg-Main 4.5s infinite linear", filter: 'brightness(100%) hue-rotate(0deg)', ease:Power1.easeOut});
    TweenMax.to('#Nav-right',2,{filter: 'brightness(120%) hue-rotate(-25deg)',yoyo:true, repeat:-1, ease:Power1.easeOut});
  this.isAnimating=true;
}
    }

outRight() {
  TweenMax.to('#Nav-right',0.35,{filter: 'brightness(100%) hue-rotate(0deg)',scale:1,animation: "", ease:Power1.easeOut});
  TweenMax.to('#Nav-right', 0.35, {boxShadow: '0px 0px 0px 0px rgba(7,128,240,0)'});
  TweenMax.to('.losange_nav_css',0.2,{y:0, x:0});
  this.isAnimating=false;
}

toggle = () => {
   this.setState({ LinkActive: true });
 }

clicked_left(e) {
  if (this.clickaction === false)
  {
    this.clickaction = true;
  var scene = document.getElementById("scene");
  var arrowleft = document.getElementById("arrowleft");
  this.clickaction = true;
      TweenMax.to(arrowleft, 0.2, {x:-2 ,y:-2, ease:Power1.easeOut});
      TweenMax.to(arrowleft, 0.1, {x:0, y:0, scale:1,delay:0.2});

    TweenMax.to("#logoHeader",0.2, {opacity:0 , left:100, ease : Power1.easeOut});
    TweenMax.to(scene,0.2, {opacity:0 , x:100, onComplete:this.switchPropsToLeft});
  }
}

switchPropsToLeft()
{
  this.props.history.push(this.PrevSlide);
  this.clickaction=false;
}

overLeft() {
  if (this.isAnimating===false)
  {
    TweenMax.set('#Nav-left',{boxShadow: '0px 0px 0px 0px rgba(7,204,240,0)'});
    TweenMax.to('.losange_nav_css_left',0.2,{y:-3, x:3});
    TweenMax.to('#Nav-left',0.35,{boxShadow: '0px 0px 45px 0px rgba(7,128,240,0.45)',animation: "radiant-highlight-bg-Main 4.5s infinite linear",filter: 'brightness(100%) hue-rotate(0deg)', ease:Power1.easeOut});
    TweenMax.to('#Nav-left',2,{filter: 'brightness(120%) hue-rotate(-25deg)',yoyo:true, repeat:-1, ease:Power1.easeOut});
  this.isAnimating=true;
  }
}

outLeft() {
  TweenMax.to('#Nav-left',0.35,{animation: "", filter: 'brightness(100%) hue-rotate(0deg)',scale:1, ease:Power1.easeOut});
  TweenMax.to('#Nav-left', 0.35, {boxShadow: '0px 0px 0px 0px rgba(7,128,240,0)'});
  TweenMax.to('.losange_nav_css_left',0.2,{y:0, x:0});
  this.isAnimating=false;
}

  render() {
    return (
    <React.Fragment>
      <div id="navigationViewer">
        <div id="Nav-left">
          <div id="clickLeft" onClick={this.clicked_left.bind(this)} onMouseOver={this.overLeft.bind(this)}  onMouseLeave={this.outLeft.bind(this)}>
            <div className="container_nav_arrow_left">
<div className="losange_nav_css_left">
  <div className="patternCircleBar">
<svg x="0px" y="0px" width="100%" height="391" className="svgCircleContainerBlur"  viewBox="0 0 349 396">
<defs>
<linearGradient id="radialBar" gradientUnits="userSpaceOnUse" x1="25.4061" y1="8.1364" x2="14.5939" y2="26.8636">
<stop  offset="0" stopColor="#FFFFFF"/>
<stop  offset="1" stopColor="#FFFFFF" stopOpacity="0.5"/>
</linearGradient>
</defs>
<circle cx="185.5" stroke="url(#radialBar)" cy="132.5" r="131.5" className="circleBtnanimateBar opacity" id={"circleBtn1 "}/>
<circle cx="215" stroke="url(#radialBar)" cy="260" r="130"  className="circleBtnanimateBar opacity" id={"circleBtn2 "}/>
<circle cx="132" stroke="url(#radialBar)" cy="152" r="131"  className="circleBtnanimateBar opacity" id={"circleBtn3 " }/>
</svg>
<svg x="0px" y="0px" width="100%" height="391"  className="svgCircleContainer" viewBox="0 0 349 396">
<circle cx="185.5" cy="132.5" r="131.5"  className="circleBtn opacity1" />
<circle cx="215" cy="260" r="130" className="circleBtn opacity1"  />
<circle cx="132" cy="152" r="131"  className="circleBtn opacity2" />
</svg>
  </div>
  <svg  x="0px" y="0px" viewBox="0 0 24 24">
    <defs>
<linearGradient id="logo-gradient3" x1="100%" y1="0%" x2="0%" y2="50%" >
<stop offset="0%" stopColor="rgba(255,255,255,0.2)"/>
<stop offset="60%" stopColor="rgba(180,219,255,0.5)"/>
<stop offset="100%" stopColor="rgba(184,239,255,1)"/>
</linearGradient>
</defs>
<rect x="4.2" y="4.2" id="previous_losange" fill="none" stroke="url('#logo-gradient3')" strokeDasharray="0" strokeWidth="0.2" width="15.7" height="15.7"/>
{/* <rect x="4.9" y="5"fill="url('#logo-gradient')" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.0265 12.0232)" class="st0" width="14.2" height="14.2"/> */}
<polygon fill="#FFF" id="arrowleft" stroke="none" points="9.8,15.8 10.4,15.8 10.4,10.5 15.6,10.4 15.6,9.8 9.7,9.9 "/>
</svg>
</div>
            </div>
          </div>
        </div>
        <div id="Nav-right">
          <div id="clickRight" onClick={this.clicked_right.bind(this)} onMouseOver={this.overRight.bind(this)}  onMouseLeave={this.outRight.bind(this)}>
            <div className="container_nav_arrow_right">
    <div className="losange_nav_css">
      <div className="patternCircleBarRight">
        <svg x="0px" y="0px" width="100%" height="391"  className="svgCircleContainerBlurRight" viewBox="0 0 349 396">
        <circle cx="185.5" stroke="url(#radialBar)" cy="132.5" r="131.5" className="circleBtnanimateBar opacity" id={"circleBtn1 "}/>
        <circle cx="215" stroke="url(#radialBar)" cy="260" r="130"  className="circleBtnanimateBar opacity" id={"circleBtn2 "}/>
        <circle cx="132" stroke="url(#radialBar)" cy="152" r="131"  className="circleBtnanimateBar opacity" id={"circleBtn3 "}/>
  </svg>
        <svg width="100%" x="0px" y="0px" height="391"  className="svgCircleContainerRight" viewBox="0 0 349 396">
          <circle cx="185.5" cy="132.5" r="131.5"  className="circleBtn opacity1" />
          <circle cx="215" cy="260" r="130" className="circleBtn opacity1"  />
          <circle cx="132" cy="152" r="131"  className="circleBtn opacity2" />
  </svg>
      </div>
      <svg  x="0px" y="0px" viewBox="0 0 24 24">
        <defs>
<linearGradient id="logo-gradient2" x1="0%" y1="0%" x2="50%" y2="100%" >
<stop offset="0%" stopColor="rgba(255,255,255,0.2)"/>
<stop offset="60%" stopColor="rgba(180,219,255,0.5)"/>
<stop offset="100%" stopColor="rgba(184,239,255,1)"/>
</linearGradient>
</defs>
<rect x="4.2" y="4.2" id="next_losange" fill="none" stroke="url('#logo-gradient2')" strokeDasharray="0" strokeWidth="0.2" width="15.7" height="15.7"/>
{/* <rect x="4.9" y="5"fill="url('#logo-gradient')" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.0265 12.0232)" class="st0" width="14.2" height="14.2"/> */}
<polygon fill="#FFF" id="arrowright" stroke="none" points="8,9.9 8,10.5 13.3,10.5 13.3,15.8 13.9,15.8 13.9,9.9 "/>
</svg>
    </div>
        </div>
      </div>
      </div>
    </div>
  </React.Fragment>
    );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(NavigationViewer))
