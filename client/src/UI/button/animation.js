import {
  TweenMax,
  Power1,
} from "gsap";

export const animation = (animName, ID) => {

  let AnimateContainer = document.getElementById(ID);
  let gradient_lineRight = document.getElementsByClassName("GradientLineRight "+ ID);
  let gradient_lineLeft = document.getElementsByClassName("GradientLineLeft "+ ID);

  switch (animName) {
    case 'Hover':
    TweenMax.set(AnimateContainer,{boxShadow: '0px 0px 0px 0px rgba(7,204,240,0)'});
    TweenMax.to(AnimateContainer,0.35,{boxShadow: '0px 0px 45px 0px rgba(7,128,240,0.45)',filter: 'brightness(100%) hue-rotate(0deg)',scale:1.05, ease:Power1.easeOut});
    TweenMax.to(AnimateContainer,2,{filter: 'brightness(120%) hue-rotate(-25deg)',yoyo:true, repeat:-1, ease:Power1.easeOut});
    TweenMax.to(gradient_lineRight,0.35,{width:"900%", ease:Power1.easeOut});
    TweenMax.to(gradient_lineLeft,0.35,{width:"900%", ease:Power1.easeOut});

    break;
      case 'Out':
      TweenMax.to(AnimateContainer,0.35,{filter: 'brightness(100%) hue-rotate(0deg)',scale:1, ease:Power1.easeOut});
      TweenMax.to(gradient_lineRight,0.35,{width:"500%", ease:Power1.easeOut});
      TweenMax.to(gradient_lineLeft,0.35,{width:"500%", ease:Power1.easeOut});
      TweenMax.to(AnimateContainer, 0.35, {boxShadow: '0px 0px 0px 0px rgba(7,128,240,0)'});
      break;
    default:
  }
}
