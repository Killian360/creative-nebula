import {
  TweenMax,
  Power1,
Power4
} from "gsap";

export const animation = (animName) => {

  var projectTXT = document.getElementsByClassName('spanCenter ');

    switch (animName) {
    case 'SlideProjectAppear':
      TweenMax.set(projectTXT,{opacity:0, y:15});
      TweenMax.set(".TitleAnimate.welcome",{y:30, opacity:0});
      TweenMax.staggerTo(projectTXT,0.25,{opacity:1, y:0, delay:0.35},0.07);
      TweenMax.to(".TitleAnimate.welcome",0.55,{y:0, opacity:1,delay:0.35, ease:Power4.easeOut});
    break;
    case 'SlideProjectDisapear':
      TweenMax.to(projectTXT,0.3,{opacity:0});
    break;
    case 'resetSlideProject':
      TweenMax.to('.Maincontainer',0.5,{backgroundColor:'#FFF'});
    break;
    case 'callSlideProject':
    TweenMax.fromTo('.Maincontainer',0.5,{backgroundColor:'#FFF'},{backgroundColor:'transparent', delay:0.2, ease:Power1.easeOut});
    break;
      default:
    }
}
