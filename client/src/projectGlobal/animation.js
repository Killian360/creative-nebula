import {
  TweenMax,
  Power1,
  Power2,
} from "gsap";

import {store} from '../reducers/combinereducers.js'

export const animation = (animName, ID, direction, callback) => {

  var Container = document.getElementById(ID);
  var ProjectBox = document.getElementsByClassName("projectBox "+ID);
  var FrontIMG = document.getElementsByClassName("FrontImg "+ID);
  var imgThumb_highlight = document.getElementsByClassName("thumb-highlight " + ID);
  var BGIMG = document.getElementsByClassName("BGImg "+ID);
  var gradient = document.getElementById("globalGradient");
  var InfoBox = document.getElementsByClassName("InfoBox " + ID);
  var logo =  document.getElementsByClassName("ThumbLOGO " + ID);

  var ProjectOptions = document.getElementById('ProjectOptions');
  var projectTitle = document.getElementsByClassName('TitleGradient');
  var subTitle = document.getElementsByClassName('SubTitle');
  var projectFrame = document.getElementById('projectFrame');
  var ico = document.getElementById('Ico_project');
  var gradientOver = document.getElementById('gradientOver');
  var MenuBtn = document.getElementById('MenuBtn');
  var infoBoxLosange = document.getElementsByClassName('infoBoxLosange');
  var infofilm = document.getElementsByClassName('infofilm ' + ID);
  var infogame = document.getElementsByClassName('infogame ' + ID);
  var infocontent = document.getElementsByClassName('InfoContent ' + ID);
  var InfoClient = document.getElementsByClassName('InfoClient ' + ID);

  switch (animName) {
    case 'GradientGreen':
    TweenMax.to(gradient, 0.35, {css:{animation:"radiant-highlight-bg-project-blue 4.5s infinite"}});
    break;
    case 'Hover':
    TweenMax.fromTo(imgThumb_highlight,0.5,{
      x:-200, y:-200, opacity:0.8},
      {
        x:0, y:0, opacity:0
      }
    );
      TweenMax.set(Container, {
        css: {
          zIndex: 10000,
          overflow:'visible',
        }
      })

      TweenMax.set(infofilm, {transform:'scale(0)'});
      TweenMax.set(infogame, {transform:'scale(0)'});
      TweenMax.set(infoBoxLosange,{transform:'rotate(45deg) scale(0)'});
      TweenMax.to(InfoBox, 0.35, {top:'86%',transform:"skewY(1.3deg)", ease: Power2.easeOut});
      TweenMax.to(InfoBox, 0.35, {transform:"skewY(0deg)",y:0, delay:0.3, ease: Power2.easeOut});
      TweenMax.fromTo(infocontent, 0.2,{y:"0%"},{y:"-50%", delay:0.2,ease: Power1.easeOut});
      TweenMax.fromTo(InfoClient, 0.2,{y:"0%"},{y:"-50%", delay:0.25,ease: Power1.easeOut});

      TweenMax.to(logo, 0.25, {bottom:'17%', ease: Power1.easeOut});
      TweenMax.to(FrontIMG, 0.35, {scale:1.1,transformOrigin:'bottom center',ease: Power1.easeOut});
      // TweenMax.set(FrontIMG, {webkitClipPath:'polygon(0 0, 100% 0, 100% 72%, 83% 72%, 83% 100%, 15% 100%, 15% 72%, 0 72%)'});
      TweenMax.to(infoBoxLosange, 0.2, {transform:'rotate(45deg) scale(1)', delay:0.2});
      TweenMax.to(infofilm, 0.2, {transform:'scale(1)', delay:0.2});
      TweenMax.to(infogame, 0.2, {transform:'scale(1)', delay:0.2});

      TweenMax.to(BGIMG, 0.2, {opacity:0.6});
      TweenMax.to(Container, 0.2, {
        y: 0,
        x: 0,
        opacity: 1,
        ease: Power1.easeOut
      });
      TweenMax.fromTo(ProjectBox, 1.6,{
          boxShadow: '0px 0px 0px 0px rgba(7,204,240,0)'},
          {
              boxShadow: '0px 0px 70px 0px rgba(7,204,240,0.65)', yoyo:true, repeat:-1}
        );
      break;
      case 'Out':
        TweenMax.set(Container, {
          css: {
            zIndex: 1
          }
        })
        TweenMax.to(logo, 0.25, {bottom:'5%'});
        TweenMax.to(FrontIMG, 0.2, {scale:1});
        TweenMax.to(BGIMG, 0.2, {opacity:1});
        TweenMax.to(Container, 0.2, {
          scale: 1,
          force3D: false,
          y: 0,
          x: 0,
          opacity: 0.9,
          ease: Power1.easeOut
        });
        TweenMax.to(Container, 0.1, {
          css: {
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
          }
        });
        TweenMax.to(InfoBox, 0.25, {top:'114%', ease: Power1.easeOut});
        break;
        case 'Shrink':
        TweenMax.to(ProjectOptions,0.3,{height:'10%',top:0, position:'fixed'});
        TweenMax.to(projectTitle,0.3,{fontSize:'2.3em', ease: Power1.easeOut});
        TweenMax.to(subTitle,0.3,{fontSize:'1.7em', ease: Power1.easeOut});
        TweenMax.to(projectFrame,0.3,{top:'23%', ease: Power1.easeOut});
        TweenMax.to(gradientOver,0.2,{opacity:1,y:0, ease: Power1.easeOut});
        // TweenMax.to(ico,0.3,{width:'4%',height:"65%", ease: Power1.easeOut});
        store.dispatch({type: 'NAVIGATIONhomeON'});
        TweenMax.set('#navigation-desktop-gradient',{opacity:1});
        TweenMax.to(MenuBtn,0.2,{top:0,ease: Power1.easeOut});
        break;
        case 'Deploy':
        TweenMax.to(gradientOver,0.2,{opacity:0,y:-100, ease: Power1.easeOut});
        TweenMax.to(projectTitle,0.2,{fontSize:'6.7em', ease: Power1.easeOut});
        TweenMax.to(subTitle,0.3,{fontSize:'2.5em', ease: Power1.easeOut});
        TweenMax.to(ProjectOptions,0.2,{height:'25%',position:'absolute',top:'10%', delay:0.01, ease: Power1.easeOut});
        TweenMax.to(projectFrame,0.2,{top:'37%', ease: Power1.easeOut});
        // TweenMax.to(ico,0.2,{width:'12%',height:"70%"});
        store.dispatch({type: 'NAVIGATIONhomeOFF'});
        TweenMax.to(MenuBtn,0.2,{top:15,ease: Power1.easeOut});
        break;
        default:
  }
}
