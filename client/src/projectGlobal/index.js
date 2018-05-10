import React from "react";
import './style.css';
import {store} from '../reducers/combinereducers.js'
import {connect} from 'react-redux';
import ProjectScrollbar from '../Scrollbars/projectScrollbar';
import NavCategories from './NavCategories';
import Particles from 'react-particles-js';
import WebGLProject from '../UI/webgl/webgl_Project';
import { withRouter } from 'react-router';
import Tilt from 'react-tilt';

import {
  TweenMax,
  Power1,
  Power3,
} from "gsap";

import * as animate from './animation';

const mapStateToProps = state => {
  return {
    NavCategory : state.NavCategory,
    LANG: state.LANG
  }
}

const mapDispatchToProps = dispatch => {
  return {
    REMOVE_CAT: () => dispatch({type: 'REMOVE_CAT'}),
    ADD_CAT: () => dispatch({type: 'ADD_CAT'})
  }
}

class ScrollBarProject extends React.Component{
   constructor(props, context) {
       super(props, context);
       this.ProjectList=[];
       this.NewList=[];
       this.OldList = [];
       this.isFirst = true;
       this.appear = true;
       this.appearBox = this.appearBox.bind(this);
       this.changeURL = this.changeURL.bind(this);
      //  this.UpdateFlexHeight = this.UpdateFlexHeight.bind(this);
       // this.trackMouse = this.trackMouse.bind(this);
       this.updateMargin = this.updateMargin.bind(this);
       this.UpdateList = this.UpdateList.bind(this);
       this.TrackMouse = this.TrackMouse.bind(this);

       for (var i = 0; i < store.getState().LANG.JsonProjects.projets.length; i++) {
           this.ProjectList.push(store.getState().LANG.JsonProjects.projets[i]);
       }
     }

    updateMargin()
    {
    //  var getMargin = document.getElementById('middle_earth');
    //  var projectbox = document.getElementsByClassName('Tilt');

    //  var style = getMargin.currentStyle || window.getComputedStyle(getMargin);

    //  TweenMax.set(projectbox,{marginTop:style.marginLeft, marginBottom:style.marginLeft});

    //  var infogame = document.getElementsByClassName('Infogame');
    //  var infofilm =  document.getElementsByClassName('Infofilm');
    //  var infoBoxLosange = document.getElementsByClassName('infoBoxLosange');
    // var categoryName = document.getElementById('categoryName');
    //  var biglosange = document.getElementById('biglosange');

    //  TweenMax.set(infogame,{height:categoryName.clientWidth});
    //  TweenMax.set(infofilm,{height:categoryName.clientWidth});
    //  TweenMax.set(infoBoxLosange,{height:biglosange.clientWidth});
    }


  componentDidUpdate(prevProps, prevState)
  {
    const { scrollbars } = this.refs;
    if (prevProps.NavCategory !== this.props.NavCategory)
    {
      this.UpdateList(scrollbars.getScrollTop());
      if (scrollbars.getScrollTop()>0)
      {
        scrollbars.scrollTop(0);
      }
    }
    return null;
  }


UpdateList()
{
  this.newlist = [];
  for (var t = 0; t < store.getState().LANG.JsonProjects.projets.length; t++) {
  for (var j = 0; j < store.getState().NavCategory.categories.length; j++)
    {
      for (var k = 0; k < store.getState().LANG.JsonProjects.projets[t].categories.length; k++)
      if (store.getState().NavCategory.categories[j] === store.getState().LANG.JsonProjects.projets[t].categories[k])
      {
        if(typeof this.newlist[t] === 'undefined') {
          this.newlist.push(store.getState().LANG.JsonProjects.projets[t]);
        }
      }
    }
  }
    if (this.appear === true)
    {
      for (var z = 0; z < this.newlist.length; z++)
      {
        var projectbox = document.getElementById(this.newlist[z].id);
        TweenMax.set(".projectbox",{display:'none'});
        TweenMax.set(projectbox,{display:'block',opacity:0.9,delay:0.1,scale:1});
      }
      TweenMax.to(".projectbox", 0.25, {onComplete:this.appearBox});
      this.appear = false;
    } else {
      TweenMax.to(".ProjectWrapperMain", 0.25, {opacity:0,scale:0.8,display:'none', onComplete:this.appearBox});
    }
}

appearBox()
{
let array = this.newlist;
  for (var p = 0; p < array.length; p++) {
  var projectbox = document.getElementsByClassName("ProjectWrapperMain "+ array[p].id);
  TweenMax.set(projectbox,{display:'block'});
  TweenMax.to(projectbox, 0.3, {opacity:0.9,scale:1,ease: Power1.easeOut});
 }
}

// UpdateFlexHeight()
// {
//   const { scrollbars } = this.refs;
//  var ProjectFlexContainer = document.getElementById('fakezone');
// var getPos = document.getElementById(this.newlist[this.newlist.length-1].id).getBoundingClientRect();
// if (scrollbars!= null && scrollbars.getScrollTop() === 0)
// {
//   ProjectFlexContainer.style.height=getPos.bottom-window.innerHeight*0.37;
// } else {
//   ProjectFlexContainer.style.height=getPos.bottom-window.innerHeight*0.20;
// }
// }

     componentDidMount()
     {
      TweenMax.to('#globalgradient',0.15,{css:{filter: ""}});
       this.appear = true;
       store.dispatch({type: 'NAVIGATIONON'});
       store.dispatch({type: 'NAVIGATIONWhite'});
       store.dispatch({type: 'VIEWEROFF'});
       store.dispatch({type: 'NAVIGATIONhomeOFF'});
       var projectTitle = document.getElementsByClassName('TitleGradient');
       var iconRectProject = document.getElementsByClassName('iconRectProject');
       var iconRectProject2 = document.getElementsByClassName('iconRectProject2');
       var iconBrushProject = document.getElementById('iconBrushProject');
       var subTitle = document.getElementsByClassName('SubTitle');
       var gradientOver = document.getElementById('gradientOver');
       var infogame = document.getElementsByClassName('Infogame');
       var infofilm =  document.getElementsByClassName('Infofilm');
       var infoBoxLosange = document.getElementsByClassName('infoBoxLosange');
      var categoryName = document.getElementById('categoryName');
       var biglosange = document.getElementById('biglosange');

      //  TweenMax.set(infogame,{height:categoryName.clientWidth});
      //  TweenMax.set(infofilm,{height:categoryName.clientWidth});
      //  TweenMax.set(infoBoxLosange,{height:biglosange.clientWidth});

      //  TweenMax.fromTo(iconBrushProject, 0.30, {opacity:0,filter:'blur(3px)',scale:1.6, transformOrigin:'center'},{opacity:1,scale:1,filter:'blur(0px)', ease:Power3.easeIn, delay:0.75});
       TweenMax.fromTo(projectTitle, 0.3, {opacity:0,x:-100,y:'0%'},{opacity:1,x:30,y:'0',delay:0.7,ease: Power1.easeOut});
       TweenMax.to(projectTitle, 0.5, {x:0,y:'0%', delay:1});
       TweenMax.fromTo(subTitle, 0.3, {opacity:0,x:-100,y:'0%'},{opacity:1,x:30,y:'0',delay:0.8,ease: Power1.easeOut});
       TweenMax.to(subTitle, 0.5, {x:0,y:'0%', delay:1.1});
       TweenMax.staggerTo('.NavBtn',0.2,{opacity:1,y:0, delay:0.8},0.1);
       TweenMax.to(gradientOver,0.2,{opacity:0,y:-100, ease: Power1.easeOut});

       window.addEventListener("resize", this.updateMargin);
       window.addEventListener("resize", this.UpdateList);
       window.addEventListener("mousemove", this.TrackMouse);
      // projectFrame.style.height = "";
      // projectFrame.style.height = window.innerHeight*0.89;
      // console.log(projectheight);
      // TweenMax.fromTo(iconRectProject,0.5, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease:Power1.easeOut, delay:0.7});
      // TweenMax.fromTo(iconRectProject2,0.4, {opacity:0, y:-60}, {opacity:1, y:-42, ease:Power1.easeOut,delay:0.8});
      // TweenMax.to(iconBrushProject,5,{y:15, yoyo:true, repeat:-1, ease:Power1.easeInOut, delay:0.55});

      const wrapperWidth = document.getElementById('TransitionWrapper').getBoundingClientRect().width;
      const TransitionWrapper = document.getElementById('TransitionWrapper');

      TweenMax.set(TransitionWrapper,{height:wrapperWidth,display:'none'});
      TweenMax.set(TransitionWrapper,{scale:0, delay:0.1});
      this.updateMargin();
      setTimeout(this.UpdateList, 200);
         }

         componentWillUnmount()
         {
           window.removeEventListener('resize', this.updateMargin);
           window.removeEventListener('resize', this.UpdateList);
           window.removeEventListener('mousemove', this.TrackMouse);
         }

      Hover(ID) {
       animate.animation('Hover', ID);
       // const { scrollbars } = this.refs;
       // var calcMiddle = document.getElementById(ID).clientHeight/2;
       //
       // var FramePosition = document.getElementById(ID).getBoundingClientRect();
       // console.log(calcMiddle);
       // if (this.refs.scrollbars.getScrollTop() == 0)
       // {
       //   var Bound = FramePosition.top - 130 - calcMiddle;
       //   var calcPos = Bound;
       //   scrollbars.scrollTop(calcPos);
       // } else {
       //   var Bound = FramePosition.top  + this.refs.scrollbars.getScrollTop() - calcMiddle;
       //   var calcPos = Bound;
       //   scrollbars.scrollTop(calcPos);
       // }
     }

      Out(ID) {
       animate.animation('Out', ID);
     }

TrackMouse(e)
{
        this.MouseX = e.clientX;
        this.MouseY = e.clientY;
}


handleclick(ID)
{
  const TransitionWrapper = document.getElementById('TransitionWrapper');
  this.URL = ID;

  TweenMax.set(TransitionWrapper,{x:this.MouseX, y:this.MouseY,xPercent:'-50', yPercent:'-50', opacity:1,transformOrigin:'center center'})
  TweenMax.to(TransitionWrapper,0.25,{display:'block',scale:3,opacity:1, ease:Power1.easeIn});

  setTimeout(this.changeURL, 270);
}

shouldComponentUpdate(prevProps)
{
  return this.props != prevProps ? true : false
}

changeURL(ID)
{
  this.props.history.push('/projects/' + this.URL);
}

//      handleScrollFrame(values)
//      {
//        let { scrollTop } = values;

//        var threshold;
//        if ((scrollTop>0 && threshold===false) || (scrollTop>0 && threshold===undefined))
//        {
//          animate.animation('Shrink');
//          threshold = true;
//        } else if (scrollTop===0) {
//          animate.animation('Deploy');

// }
//      }



     render(){
     return (
       <div id="contentViewer">
         <div id="TransitionWrapper"></div>
         <div id="particles-js">
           <Particles
           params={{
             "particles": {
   "number": {
     "value": 70,
     "density": {
       "enable": true,
       "value_area": 900
     }
   },
   "color": {
     "value": "#ffffff"
   },
   "shape": {
     "type": "circle",
     "stroke": {
       "width": 0,
       "color": "#000000"
     },
     "polygon": {
       "nb_sides": 5
     }
   },
   "opacity": {
     "value": 1,
     "random": true,
     "anim": {
       "enable": true,
       "speed": 1,
       "opacity_min": 0,
       "sync": false
     }
   },
   "size": {
     "value": 1,
     "random": true,
     "anim": {
       "enable": true,
       "speed": 0,
       "size_min": 0.3,
       "sync": false
     }
   },
   "line_linked": {
     "enable": false,
     "distance": 150,
     "color": "#ffffff",
     "opacity": 0.4,
     "width": 1
   },
   "move": {
     "enable": true,
     "speed": 0.3,
     "direction": "none",
     "random": true,
     "straight": false,
     "out_mode": "out",
     "bounce": false,
     "attract": {
       "enable": false,
       "rotateX": 600,
       "rotateY": 600
     }
   }
 },
 "interactivity": {
   "detect_on": "canvas",
   "events": {
     "onhover": {
       "enable": false,
       "mode": "repulse"
     },
     "onclick": {
       "enable": false,
       "mode": "repulse"
     },
     "resize": false
   },
   "modes": {
     "grab": {
       "distance": 400,
       "line_linked": {
         "opacity": 1
       }
     },
     "bubble": {
       "distance": 250,
       "size": 10,
       "duration": 2,
       "opacity": 0,
       "speed": 3
     },
     "repulse": {
       "distance": 400,
       "duration": 0.4
     },
     "push": {
       "particles_nb": 4
     },
     "remove": {
       "particles_nb": 2
     }
   }
 }
           }}
           />
           <WebGLProject divId="work-maincanvas"/>
         </div>
         <div id="ProjectOptions">
           {/* <div id="Ico_project">
             <div id="SVG_ico_project">
               <svg id="Capa_1" x="0px" y="0px"  width="100%" height="100%" viewBox="0 0 512 512">
                 <defs>
<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
 <stop offset="60%" style={{stopColor:'rgb(255,255,255)', stopOpacity:'1'}} />
 <stop offset="100%" style={{stopColor:'rgb(236,246,246)', stopOpacity:'1'}} />
</linearGradient>
<linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
 <stop offset="70%" style={{stopColor:'rgb(255,255,255)', stopOpacity:'1'}} />
 <stop offset="100%" style={{stopColor:'rgb(164,180,216)', stopOpacity:'1'}} />
</linearGradient>
</defs>
               <rect className="iconRectProject" x="89.1" y="89.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 256 -106.0387)" width="300" height="300"/>
               <path id="iconBrushProject" fill="url(#grad1)" d="M325.67,144.108c-6.712,5.289-13.89,11.138-21.544,17.623l30.145,30.142c6.491-7.649,12.339-14.827,17.63-21.538Zm67.972-41.719a4.608,4.608,0,0,0-5.323-.868c-1.667.831-21.466,10.926-55.3,36.876l24.6,24.6c25.962-33.831,36.063-53.619,36.893-55.285A4.606,4.606,0,0,0,393.642,102.389Zm0,267.722-8.941-8.941c1.588-24.136-23.23-49.339-24.328-50.433L290.1,240.469c14.463-14.937,27.122-28.831,38.145-41.561l-31.16-31.157c-12.732,11.018-26.632,23.674-41.57,38.136l-77.938-77.931c-0.868-.867-21.559-21.371-42.595-26.532A13.807,13.807,0,0,0,118.405,118c4.386,17.9,19.846,35.492,24.91,40.9l-2.945,20.623c-0.014.111,0.027,0.213,0.018,0.323a4.322,4.322,0,0,0,.055.942,4.766,4.766,0,0,0,.166.835,4.6,4.6,0,0,0,.374.762,4.513,4.513,0,0,0,.522.789,2.985,2.985,0,0,0,.18.268l55.493,55.488a4.615,4.615,0,1,0,6.527-6.527l-53.863-53.854,1.634-11.425,71.518,71.51c-15.336,16-31.516,33.682-48.473,53.254a4.5,4.5,0,0,0-.826,1.431c-9.2,4.131-18.742,11.743-28.4,22.692-26.766,30.317-27.3,55.03-27.292,57.265v0.2a4.511,4.511,0,0,0,.328,1.528,0.045,0.045,0,0,0,0,.023A4.584,4.584,0,0,0,122.509,378h0.231c2.8,0,27.412-.784,57.345-27.2,10.784-9.519,18.322-19.069,22.481-28.448a4.522,4.522,0,0,0,1.552-.868c19.569-16.959,37.249-33.138,53.259-48.472l70.381,70.374c1.061,1.062,24.766,24.479,48.2,24.479,0.748,0,1.491-.107,2.235-0.157l8.941,8.941A4.614,4.614,0,1,0,393.646,370.111ZM154.731,157.332l19.583-19.585,74.6,74.584q-9.486,9.326-19.518,19.654ZM173.954,343.87c-14.9,13.146-28.28,19.336-37.642,22.262l17.242-17.18a4.617,4.617,0,0,0-6.519-6.54l-17.052,17c2.986-9.329,9.21-22.563,22.214-37.292,9.016-10.215,17.694-17.144,25.837-20.638l16.393,16.391C190.919,326.232,184.045,334.961,173.954,343.87Zm35-50.318a4.615,4.615,0,0,1-6.527-6.527l96.943-96.934a4.616,4.616,0,0,1,6.528,6.527ZM331,333.585L264,266.59q10.3-10,19.657-19.511L350.585,314ZM232.06,208.527l-50.8-50.752a4.617,4.617,0,1,0-6.528,6.532l50.8,50.756A4.62,4.62,0,0,0,232.06,208.527ZM329,305.47l-41.547-41.543a4.616,4.616,0,0,0-6.528,6.527L322.471,312A4.616,4.616,0,0,0,329,305.47Z"/>
               <rect className="iconRectProject2" stroke="url(#grad2)" x="89.1" y="89.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 256 -106.0387)" width="300" height="300"/>
               </svg>
             </div>
           </div> */}
           <div className="projectTitle">
             <span className="TitleGradient">
               {store.getState().LANG.JsonLang.menu.Titleprojects}
             </span>
             <span className="SubTitle">{store.getState().LANG.JsonLang.menu.SubtitleProjects}</span>
           </div>
           <NavCategories ref={ProjectScrollbar.ref}></NavCategories>
         </div>
         <ProjectScrollbar
           ref="scrollbars"
           renderTrackVertical={props => <div {...props} className="track-vertical-white"/>}
           renderThumbVertical={props => <div {...props} className="thumb-vertical-white"/>}
           renderView={props => <div {...props} className="viewProject"/>}
           onScrollFrame={this.handleScrollFrame}
           onScrollStop={this.handleScrollStop}
           autoHide={true}
           autoHideTimeout={500}
           autoHideDuration={200}
           >
             <div id="gradientOver"></div>
             <div id="fakezone"></div>
           <div id="projectFrame">
           <section id="projectsContainer">
             {this.ProjectList.map((o, i) =>
             <div key={o.id}  className={"ProjectWrapperMain "+ o.id}>
             <div className="ProjectWrapperInfo">
             <li className="TitleProjectWrapper" >{o.name}</li>
             <li className="ClientProjectWrapper" >{o.client}</li>
             </div>
             <Tilt className="Tilt" options={{ max : 5, scale:1.05 }}>
               <div className={"projectBox " + o.id} id={o.id} onMouseEnter={() => this.Hover(o.id)} onMouseLeave={() => this.Out(o.id)} >
               <div className="gradientAnimTop"></div>
               <div className="gradientAnimRight"></div>
               <div onClick={() => this.handleclick(o.id)}>
               <Tilt className="TiltFront" options={{ max : 8 , scale:1, axis:null}}>
               <div className={"ThumbLOGO "+ o.id} style={{backgroundImage: "url("+ o.logoBG+ ")"}}></div>
               <div className={"FrontImg "+ o.id}><img src={o.thumbFront} alt={o.id}></img></div>
               </Tilt>
               <div className="OverflowMask">
                 <div className={"BGImg "+ o.id} style={{backgroundImage: "url(" + o.thumbBG + ")"}}></div>
                 <div className={"InfoBox "+ o.id}>
                <span className={"InfoContent " + o.id}>go to project</span>
              </div>
                 <div className={"thumb-highlight " + o.id}></div>
               </div>
             </div>
           </div>
           </Tilt>
           </div>
         )}
         </section>
       </div>
          </ProjectScrollbar>
   </div>
   )
     }
}


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ScrollBarProject))
