import {
  TweenMax,
  Power1,
} from "gsap";

export const animation = (animName) => {

  let ArrowTail = document.getElementsByClassName("ArrowTail");
  let ArrowScrollSVG = document.getElementsByClassName("ArrowScrollSVG");

  switch (animName) {
    case 'AnimateSpinner':
    TweenMax.to(ArrowTail,1.5,{ top:"-50%", transform:"scaleY(0)", opacity:1,repeat:-1,delay:0.5, ease:Power1.easeOut});
    TweenMax.to(ArrowScrollSVG,1.5,{top:"50%",transform: "scale(0.8)", transformOrigin:"center", opacity:0, delay:0.5, repeat:-1, ease:Power1.easeOut});
    break;
    default:
  }
}
