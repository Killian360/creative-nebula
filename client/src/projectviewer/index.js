import React from "react";
import '../css/projets.css';
import './style.css';
import {
  TweenMax,
  Power1,
  Power4
} from "gsap";

import {store} from '../reducers/combinereducers.js'

import ProjectScrollbar from '../Scrollbars/projectScrollbar';
import Parallax from './parallax';
import NavigationViewer from '../UI/navigation/viewernav/viewer_navigation';
import ScrollUI from '../UI/scrollUI/ScrollUI';
import WheelReact from 'wheel-react';

import {connect} from 'react-redux';
import Swipeable from 'react-swipeable';
import * as animate from '../UI/navigation/animation'
import SlideNav from '../projectviewer/component/slide_nav'

// import { Shaders, GLSL, LinearCopy } from "gl-react";
// import { Surface } from "gl-react-dom";
// import GLTransition from "react-gl-transition";
// import GLTransitions from "gl-transitions";
// import images from "./images";

// export const Slideshow = ({slides, delay, duration, time }) => {
//   const index = Math.floor(time / (delay + duration));
//   const from = slides[index % slides.length];
//   const to = slides[(index + 1) % slides.length];
//   const transition = GLTransitions[index % GLTransitions.length];
//   const total = delay + duration;
//   const progress = (time - index * total - delay) / duration;
//   return progress > 0
//     ? <GLTransition
//         from={from}
//         to={to}
//         progress={progress}
//         transition={transition}
//       />
//     : <LinearCopy>{from}</LinearCopy>;
// };



class CustomScrollbars extends React.Component{

  constructor(props, context) {
          super(props, context)
          this.state = { top: 0 };
          this.ScrollTop ='';
          this.threshold = 0;
          this.isScrolled=false;
          this.scrollingIsUp = false;
          this.state = {mouseInput:""};
        }

componentDidMount()
{
  const scrollbars = this.ScrollbarRef;
  scrollbars.scrollTop(0);

  TweenMax.set("#ProjectContainer",{opacity:1, transform:"translateY(100vh) skewY(10deg)"});
  TweenMax.to("#ProjectContainer",0.65,{opacity:1, transform:"translateY(0vh) skewY(0deg)", ease:Power4.easeOut});
  TweenMax.to("#contentViewer",0.25,{scale:1,opacity:1,delay:0.2});
  TweenMax.to('#globalgradient',0.15,{css:{filter: ""}});
}

unmountComponent()
{
  TweenMax.to("#ProjectContainer",0.2,{opacity:0});
  TweenMax.to(".gradient_top",0.15,{opacity:1});
  TweenMax.to(".galleryWrapperProject", 0.25, {scale:1, transformOrigin:"center right", right:"0", left:"0", opacity:1, filter:"blur(0px)", onComplete:changeMode});

  function changeMode()
  {
    var iconScroll = document.getElementsByClassName('ArrowScroll');
    TweenMax.to(iconScroll,0.2,{opacity:1, y:0, delay:0.1});
    TweenMax.to("#navigationViewer",0.15,{opacity:1, display:"block"});
    store.dispatch({ type: 'NAVIGATIONhomeOFF' });
    TweenMax.killTweensOf(".ButtonNavViewerHome");
    TweenMax.staggerTo('.SelectorContainer',0.1,{y:0,opacity:1, ease:Power1.easeOut},0.05);
    store.dispatch({type: 'ReadingOff'});
  }
}


handleScrollFrame(values)
{
  let { top } = values;
  let { scrollTop } = values;

  var projectHeaderOpacity = 1-scrollTop/window.innerHeight*2;
  var projectBackgroundOpacity = 0.85-scrollTop/window.innerHeight*1.25;
  var projectHeaderScale = 1-top*3;

  var projectHeaderTranslate = scrollTop*1;
  var gradient_top = document.getElementsByClassName('gradient_top');
  var limitOffset = window.innerHeight/100;
  var projectHeader = document.getElementById('projectHeader');
  var projectContainerHeader = document.getElementById('projectHeader');
  var ProjectContainer = document.getElementById('ProjectContainer').getBoundingClientRect();
  var ProjectContentContainer = document.getElementById('iframeContainer').getBoundingClientRect();
  // var navbarviewer = document.getElementById('navbarviewer');
  // var navbarviewerBound = document.getElementById('navbarviewer').getBoundingClientRect();
  var ProjectContainerX = ProjectContainer.top;
  var ProjectContentContainerTop = ProjectContentContainer.top;
  var iFrameID = document.getElementById('iframeContainer');
  var offset;
  var elementboundCalc;
if (iFrameID.contentWindow.document.getElementById('ProjectContent')!==null)
{
  var ChildContent = iFrameID.contentWindow.document.getElementById('ProjectContent').getElementsByTagName("DIV");
  for (var i = 0; i < ChildContent.length; i++)
  {
    var ChildToAnimate = ChildContent[i].id;
    var AnimateClass = iFrameID.contentWindow.document.getElementById(ChildToAnimate);
    var getPos = AnimateClass.getBoundingClientRect();
   offset = window.innerHeight*0.15;
    elementboundCalc = getPos.top+offset;
    if (elementboundCalc < scrollTop )
    {
      TweenMax.to(AnimateClass,0.3,{opacity:1, scale:1, ease:Power1.easeOut });
    }
}
// for (var u = 0; u < store.getState().PREVIEW.chapter.length; u++)
// {
//   var elementbound = iFrameID.contentWindow.document.getElementById(store.getState().PREVIEW.chapter[u].ID).getBoundingClientRect();
//  offset = window.innerHeight*0.80;
//   elementboundCalc = elementbound.top+offset;
//   var menuselect = document.getElementById(store.getState().PREVIEW.chapter[u].ID);
//   if (elementboundCalc < scrollTop)
//   {
//     TweenMax.to(menuselect,0.2,{opacity:1,transformOrigin:'center',scale:1.1});
//   } else {
//     TweenMax.to(menuselect,0.1,{opacity:0.5, scale:1});
//   }
// }
}
if (ProjectContainerX < window.innerHeight/1.3)
  {
    TweenMax.set(".galleryWrapperProject",{top:-projectHeaderTranslate});
  }


// if (ProjectContainerX - window.innerHeight/100*1.2 <= 0)
// {
//   if (this.scrollingIsUp === true)
//   {
//     TweenMax.killTweensOf(navbarviewer);
//     TweenMax.to(navbarviewer,0.25,{position:"fixed",marginTop:0, top:"-15vh", ease:Power1.easeOut});
//   } else {
//     TweenMax.killTweensOf(navbarviewer);
//     TweenMax.to(navbarviewer,0.2,{position:"fixed",marginTop:0, top:0, ease:Power1.easeOut});
//     TweenMax.set(menuNavViewer,{top:"calc(50% + 15px)", y:'-50%'});
//   }
// } else {
//   TweenMax.set(navbarviewer,{position:"absolute",top:''});
//   TweenMax.set(menuNavViewer,{top:"50%", y:'-50%'});
// }

  if (ProjectContentContainerTop <= window.innerHeight/100*7)
  {
  store.dispatch({type: 'NAVIGATIONBlue'});
  } else {
  store.dispatch({type: 'NAVIGATIONWhite'});
  }
}

componentDidUpdate()
{
  // const scrollbars = this.ScrollbarRef;
  // scrollbars.scrollTop(0);
  // var navbarviewer = document.getElementById('navbarviewer');
//   var upcontentTexture = document.getElementById('upcontentTexture');
//   TweenMax.set(upcontentTexture,{css:{position:'absolute',top:'0%'}});

//   var iFrameID = document.getElementById('iframeContainer');

//   if (iFrameID.contentWindow.document.getElementById('ProjectContent')!==null)
//   {
//   var ChildContent = iFrameID.contentWindow.document.getElementById('ProjectContent').getElementsByTagName("DIV");
//   TweenMax.set(ChildContent,{opacity:0, scale:0.9});
// }
}

handleHoverTop() {
  TweenMax.to('#SVGtoTop',0.7,{left:-10, ease:Power4.easeOut});
}

handleOutTop() {
  TweenMax.to('#SVGtoTop',0.2,{left:0, ease:Power1.easeOut});
}

handleClickTop() {
  TweenMax.to(".ButtonNavViewerHome",0.25,{opacity:0,x:-30, display:"none", ease:Power1.easeOut});
  const scrollbars = this.ScrollbarRef;
  scrollbars.scrollTop(0);
  this.unmountComponent();
}

  render() {
    return (
      <div className="ProjectContent">
      <ProjectScrollbar
        ref={c => {this.ScrollbarRef = c}}
        renderTrackVertical={props => <div {...props} className="track-vertical-white"/>}
        renderTrackHorizontal={props => <div {...props} style={{display:"none"}}/>}
        renderThumbVertical={props => <div {...props} className="thumb-vertical-white"/>}
        renderView={props => <div {...props} className="view"/>}
        onScrollFrame={this.handleScrollFrame.bind(this)}
        autoHide={true}
        autoHideTimeout={500}
        autoHideDuration={200}
        >
        {this.props.children}
        <div onClick={() => this.handleClickTop()} onMouseEnter={() => this.handleHoverTop()} onMouseLeave={() => this.handleOutTop()} className="ButtonNavViewerHome">
<div id="SVGtoTop" className={this.props.theme}>
      <svg x="0px" className="SVGmenuViewer" y="0px" viewBox="0 0 31.494 31.494">
        <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z"/>
</svg>
</div>
<span className={"BackTagBtn "+this.props.theme}></span>
</div>
      <Content datapreview={this.props.preview} scrollbar={this.ProjectScrollbar}/>
      </ProjectScrollbar>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
PREVIEW: state.PREVIEW,
LANG: state.LANG,
NAVIGATIONTHEME: state.NAVIGATIONTHEME,
SLIDE: state.SLIDE,
PROJECTISREADING : state.PROJECTISREADING
  }
}


class ProjectViewer extends React.Component {

  constructor(props) {
    super(props);
    this.ProjectData = [];
    store.dispatch({type: 'NAVIGATIONON'});
    store.dispatch({type: 'VIEWERON'});
    store.dispatch({type: 'NAVIGATIONhomeOFF'});
    if (this.props.match.params.slide === null || this.props.match.params.slide === undefined ) {
      this.props.match.params.slide  = "middle_earth";
    }
    store.dispatch({type: 'ReadingOff'});
    var ProjectNbr = this.props.match.params.slide ;
    for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
      if (store.getState().LANG.JsonProjects.projets[i].id === ProjectNbr) {
        this.ProjectData.push(store.getState().LANG.JsonProjects.projets[i]);
        var DatasProject = this.ProjectData[0];
        store.dispatch({type: 'getSlide', text: i});
        store.dispatch({type: 'getID', id: DatasProject.id,role:DatasProject.role, desc:DatasProject.desc, name: DatasProject.name,index:DatasProject.index, chapter: DatasProject.chapter, client: DatasProject.client, galleryBG:DatasProject.galleryBG, galleryBGViewer:DatasProject.galleryBGViewer,logoBG: DatasProject.logoBG, galleryLayer:DatasProject.galleryLayer, galleryLayer2:DatasProject.galleryLayer2});
      }
    }
}


componentDidUpdate(prevProps,prevState)
{
  if (this.props.match.params.slide != prevProps.match.params.slide)
  {
    this.ProjectData = [];
      for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
      if (store.getState().LANG.JsonProjects.projets[i].id === this.props.match.params.slide) {
        this.ProjectData.push(store.getState().LANG.JsonProjects.projets[i]);
        var DatasProject = this.ProjectData[0];
        store.dispatch({type: 'getSlide', text: i});
        store.dispatch({type: 'getID', id: DatasProject.id,role:DatasProject.role, desc:DatasProject.desc, name: DatasProject.name,index:DatasProject.index, chapter: DatasProject.chapter, client: DatasProject.client, galleryBG:DatasProject.galleryBG, galleryBGViewer:DatasProject.galleryBGViewer,logoBG: DatasProject.logoBG, galleryLayer:DatasProject.galleryLayer, galleryLayer2:DatasProject.galleryLayer2});
      }
    }
  }
}

  componentDidMount(Props) {
    var projectHeader = document.getElementById('projectHeader');
    var projectBG = document.getElementById('projectBG');
    TweenMax.fromTo(projectBG, 0.25,{opacity:0},{opacity:1, ease:Power1.easeIn,delay:0.1});
    TweenMax.fromTo(projectHeader, 0.25,{opacity:0},{opacity:1, ease:Power1.easeOut,delay:0.1});
  }

  render() {
    return (
      <div key="ViewerContent"id="contentViewer" className="Maincontainer projectContentTransition">
      <Header history={this.props.history}/>
      {store.getState().PROJECTISREADING === true && <CustomScrollbars theme={this.props.NAVIGATIONTHEME} preview={this.props.PREVIEW} />}
      </div>
  );
  }
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
    }
    this.isReadingMode=false;
    this.switchPropsRIght = this.switchPropsRIght.bind(this);
    this.switchPropsLeft = this.switchPropsLeft.bind(this);
  }

  componentDidMount()
  {
  WheelReact.config({
    up: () => {
      this.isReadingMode === false && this.animationShrink();
    },
    down: () => {
  }
  });
  }

animationShrink()
{
var iconScroll = document.getElementsByClassName('ArrowScroll');
animate.animation("NavLogoHide",null,null,150);
store.dispatch({ type: 'NAVIGATIONhomeON' });
TweenMax.to(iconScroll,0.15,{opacity:0, y:25});
TweenMax.to("#navigationViewer",0.45,{opacity:0, display:"none"});
TweenMax.to('#navbarviewer--bg',0.25,{opacity:1, onComplete:complete, transform:'translateY(0%)'});
// TweenMax.to(".galleryWrapperProject", 0.25, {filter:"blur(5px)",delay:0.2, transformOrigin:"center right", right:"0vw", left:"auto", ease:Power1.easeOut});
function complete()
{
  store.dispatch({type: 'ReadingOn'});
  TweenMax.staggerTo('.SelectorContainer',0.06,{y:-15,opacity:0,ease:Power1.easeOut},0.04);
  TweenMax.to(".ButtonNavViewerHome",0.25,{opacity:1,x:0, display:"block", ease:Power1.easeOut});
}
}


  shouldComponentUpdate(nextProps)
  {
    if (nextProps.history !== this.props.history)
    {
      return true;
    } else {
      return false;
    }
  }


  swipingLeft(e, deltaX, deltaY, absX, absY, velocity) {
    if (deltaX > window.innerWidth*0.45)
    {
      var scene = document.getElementById('scene');
      TweenMax.to("#logoHeader",0.2, {opacity:0 , left:-100, ease : Power1.easeOut});
      TweenMax.to(scene,0.2, {opacity:0 ,x:-100,onComplete:this.switchPropsLeft});
    }
  }

  switchPropsLeft()
  {
        var DatasProject;
        if (store.getState().SLIDE.slide===store.getState().LANG.JsonProjects.projets.length-1)
        {
          DatasProject = store.getState().LANG.JsonProjects.projets[0];
          this.props.history.push(DatasProject.id);
        } else {
          DatasProject = store.getState().LANG.JsonProjects.projets[store.getState().SLIDE.slide+1];
          this.props.history.push(DatasProject.id);
        }
        for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
          if (store.getState().LANG.JsonProjects.projets[i].id === DatasProject.id) {
            store.dispatch({type: 'getSlide', text: i});
      }
      }
    }

  swipingRight(e, deltaX, deltaY, absX, absY, velocity)
  {
    if (deltaX < -window.innerWidth*0.45)
    {
      var scene = document.getElementById('scene');
      TweenMax.to("#logoHeader",0.2, {opacity:0 , left:100, ease : Power1.easeOut});
      TweenMax.to(scene,0.2, {opacity:0 , x:100, onComplete:this.switchPropsRIght});
  }
  }

switchPropsRIght()
  {
    var DatasProject;
      if (store.getState().SLIDE.slide===0)
      {
        DatasProject= store.getState().LANG.JsonProjects.projets[store.getState().LANG.JsonProjects.projets.length-1];
        this.props.history.push(DatasProject.id);
      } else {
        DatasProject = store.getState().LANG.JsonProjects.projets[store.getState().SLIDE.slide-1];
          this.props.history.push(DatasProject.id);
      }
      for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
        if (store.getState().LANG.JsonProjects.projets[i].id === DatasProject.id) {
          store.dispatch({type: 'getSlide', text: i});
    }
  }
    }

swiping(e, deltaX, deltaY, absX, absY, velocity)
{
  TweenMax.to("#scene",0.2, {x:-deltaX*0.05});
}

   swiped(e, deltaX, deltaY, isFlick, velocity) {
     if (deltaX > -window.innerWidth*0.45 && deltaX < window.innerWidth*0.45 )
     {
       TweenMax.to("#scene",0.2, {x:0});
     }
  }

render(){
  return (
    <div>
      <Swipeable
        onSwiped={this.swiped.bind(this)}
        onSwiping={this.swiping.bind(this)}
        onSwipedLeft={this.swipingLeft.bind(this)}
        onSwipedRight={this.swipingRight.bind(this)}
        trackMouse={true}
        >
        <div id="ViewerNav">
          <NavigationViewer history={this.props.history}/>
        </div>
  <section id="projectHeader" {...WheelReact.events}>
      <ScrollUI ID="scrollProject"/>
      <Parallax/>
  </section>
</Swipeable>
  <div id="projectBG">
    <li className="layer gallery--bg--viewer" data-depth="0">
    </li>
  </div>
</div>
);
}
}

class Content extends React.Component {

  constructor(props) {
    super(props);
  }

  handleHover(ID)
  {
    this.iFrameID = document.getElementById('iframeContainer');
    var menuselect = document.getElementById(ID);
    if (menuselect.style.opacity<1)
    {
      TweenMax.to(menuselect,0.2,{opacity:0.8});
    }
  }

handleOut(ID)
  {
    this.iFrameID = document.getElementById('iframeContainer');
    var menuselect = document.getElementById(ID);
    if (menuselect.style.opacity<=0.8)
    {
      TweenMax.to(menuselect,0.2,{opacity:0.5});
    }
  }

  handleClick(ID) {
    const scrollbars = this.props.scrollbar;
    this.iFrameID = document.getElementById('iframeContainer');
    this.logoHeaderBound = this.iFrameID.contentWindow.document.getElementById(ID).getBoundingClientRect();
    var offset = window.innerHeight;
    this.PositionChapter = this.logoHeaderBound.top+offset;
    scrollbars.scrollTop(this.PositionChapter);
  }

  // shouldComponentUpdate(nextProps)
  // {
  //   return (this.props.datapreview != nextProps.datapreview) ? true : false;
  // }

  render(){
    var indexIframe = store.getState().PREVIEW.index;
    function iframeLoaded() {


        var iFrameID = document.getElementById('iframeContainer');
        if(iFrameID) {
              // here you can make the height, I delete it first, then I make it again
              iFrameID.height = "";
              iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
        }
    }
  return (
  <React.Fragment>
  <section id="ProjectContainer">
      {/* <div id="navbarviewer">
  <ul id="menuNavViewer">
    {store.getState().PREVIEW.chapter.map((o, i) =>
      <div key={o.ID} className="staggerTransition" onMouseLeave={() => this.handleOut(o.ID)} onMouseEnter={() => this.handleHover(o.ID)}><li id={o.ID} className="ButtonNavViewer" onClick={() => this.handleClick(o.ID)}>
<span className="ButtonNavViewerTXT">
      {o.name}
    </span>
    </li>
</div>
  )}
  </ul>
      </div> */}
    <div id="upcontentTexture">
    </div>
    <div className="ProjectHeadInfo text">
      <div className="ProjectDescription">
        <h1>{store.getState().PREVIEW.name}</h1>
        <p>{store.getState().PREVIEW.desc}</p>
        <h2>Role</h2>
        <h3>{store.getState().PREVIEW.role}</h3>
        <h2>Goal</h2>
        <h3>{store.getState().PREVIEW.client}</h3>
      </div>
    </div>
    <iframe title="project content" src={indexIframe} onLoad={iframeLoaded} id="iframeContainer" scrolling="no"></iframe>
  </section>
</React.Fragment>
);
}
}

export default connect(mapStateToProps)(ProjectViewer)
