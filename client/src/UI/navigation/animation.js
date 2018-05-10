import { TweenMax, Power1, Power4, Power2, Elastic } from "gsap";
import { withRouter } from "react-router";
import { store } from "../../reducers/combinereducers.js";

export const animation = (animName, topdata, delaydata, direction, history) => {
  var mainNAV = document.getElementById("navigation-desktop");
  var Color = document.getElementsByClassName("nav-li");
  var logo = document.getElementsByClassName("logo-container");
  var menu_long = document.getElementsByClassName("nav-inner");
  var navli = document.getElementsByClassName("nav-li");
  var navLeft = document.getElementById("Nav-left");
  var navRight = document.getElementById("Nav-right");
  var NavPanel = document.getElementById("NavPanel");
  var navigationpanellogo = document.getElementsByClassName(
    "navigation-panel-logo"
  );
  var MenuBtn = document.getElementById("MenuBtn");
  var menuTag = document.getElementsByClassName("menuTag");
  var contentViewer = document.getElementById("contentViewer");
  var scene = document.getElementById("scene");

  switch (animName) {
    case "NavHome":
      TweenMax.to(mainNAV, 0.6, {
        height: "110px",
        ease: Elastic.easeOut.config(0.6, 0.3)
      });
      TweenMax.to(Color, 0.2, { color: "#0c324a" });
      TweenMax.to(logo, 0.2, { opacity: 0 });
      TweenMax.set(logo, { display: "none", delay: 0.4 });
      TweenMax.to(menu_long, 0.2, {
        opacity: 1,
        x: 0,
        transformOrigin: "right center"
      });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      break;
    case "NavNotHome":
      TweenMax.to(mainNAV, 0.6, {
        height: "80px",
        delay: 0.2,
        ease: Elastic.easeOut.config(0.6, 0.3)
      });
      TweenMax.to(Color, 0.2, { color: "#FFF" });
      TweenMax.to(logo, 0.2, { opacity: 1 });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      TweenMax.to(menu_long, 0.3, {
        opacity: 1,
        x: 0,
        transformOrigin: "right center",
        ease: Power4.easeOut
      });
      break;
    case "NavShort":
      TweenMax.to(logo, 0.2, { opacity: 1, delay: 0.2 });
      TweenMax.to(menu_long, 0.3, {
        opacity: 0,
        x: 50,
        display: "none",
        transformOrigin: "right center",
        ease: Power4.easeIn
      });
      break;
    case "NavHomeMobile":
      TweenMax.to(logo, 0.2, { opacity: 0, delay: 0.2 });
      TweenMax.to(menu_long, 0.3, {
        opacity: 0,
        x: 50,
        display: "none",
        transformOrigin: "right center",
        ease: Power4.easeIn
      });
      break;
    case "NavLong":
      TweenMax.to(menu_long, 0.3, {
        opacity: 1,
        x: 0,
        display: "block",
        transformOrigin: "right center",
        ease: Power4.easeOut
      });
      TweenMax.to(logo, 0.2, { opacity: 1, delay: 0.2 });
      break;
    case "NavHide":
      TweenMax.to(navli, 0.25, { left: 20, opacity: 0, ease: Power1.easeOut });
      TweenMax.to(navli, 0, { display: "none", delay: 0.25 });
      TweenMax.to(logo, 0.25, { left: -30, opacity: 0, ease: Power1.easeOut });
      TweenMax.to(MenuBtn, 0.25, {
        right: 0,
        opacity: 0,
        ease: Power1.easeOut
      });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });

      break;
    case "NavShow":
      TweenMax.to(navli, 0, { display: "block" });
      TweenMax.to(navli, 0.25, { left: 0, opacity: 1, ease: Power1.easeOut });
      TweenMax.to(logo, 0.25, { left: "5%", ease: Power1.easeOut });
      TweenMax.to(MenuBtn, 0.25, {
        right: "5%",
        opacity: 1,
        ease: Power1.easeOut
      });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      break;
    case "NavViewer":
      if (navLeft != null) {
        TweenMax.to(navLeft, 0.3, {
          display: "block",
          opacity: 1,
          ease: Power1.easeOut
        });
        TweenMax.to(navRight, 0.3, {
          display: "block",
          opacity: 1,
          ease: Power1.easeOut
        });
      }
      TweenMax.set(".icon-scroll", { display: "block", ease: Power1.easeOut });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      break;
    case "NavViewerOff":
      if (navLeft != null) {
        TweenMax.to(navLeft, 0, {
          display: "none",
          opacity: 0,
          ease: Power1.easeOut
        });
        TweenMax.to(navRight, 0, {
          display: "none",
          opacity: 0,
          ease: Power1.easeOut
        });
      }
      TweenMax.to(".icon-scroll", 0, {
        display: "none",
        opacity: 0,
        ease: Power1.easeOut
      });
      break;
    case "NavLogoHide":
      if (direction === undefined || direction === null) {
        direction = 0;
      }
      TweenMax.to(logo, 0.25, {
        opacity: 0,
        x: direction,
        ease: Power1.easeOut
      });
      break;
    case "NavLogoShow":
      TweenMax.to(logo, 0.25, { opacity: 1, x: 0, ease: Power1.easeOut });
      break;
    case "PanelOpen":
      TweenMax.set(MenuBtn, { pointerEvents: "none" });
      TweenMax.set(MenuBtn, { pointerEvents: "auto", delay: 0.5 });
      TweenMax.set(".NavTitle", { y:100, opacity:0 });
      TweenMax.set("#RSLinks", { y:20, opacity:0 });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw", ease: Power1.easeOut });
      TweenMax.to(menuTag, 0.2, { opacity: 0, x: -20, ease: Power1.easeOut });
      TweenMax.staggerTo(".NavTitle",0.35, { y:0 , opacity:1, delay:0.2, ease:Power4.easeOut}, 0.1);
      TweenMax.to("#RSLinks",0.45, { y:0, opacity:1 ,delay:0.3, ease:Power4.easeOut});

      // TweenMax.set(NavPanel,{left:"155%",transform:"skewX(30deg)", ease: Power1.easeOut});
      TweenMax.set(NavPanel, {
        display: "block",
        opacity: 0,
        ease: Power1.easeOut
      });
      TweenMax.to(NavPanel, 0.35, {
        scale: 1,
        opacity: 1,
        ease: Power1.easeOut
      });
      TweenMax.to(contentViewer, 0.6, {
        opacity: 0.9,
        scale: 0.75,
        ease: Power4.easeOut
      });
      break;
    case "PanelClose":
    TweenMax.staggerTo(".PanelTitle", 0.05, {y:-100},0.07);
    TweenMax.to("#RSLinks", 0.2,{opacity:0});
      TweenMax.fromTo(
        contentViewer,
        delaydata,
        { x: 0 },
        { x: direction, ease: Power1.easeIn }
      );
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      TweenMax.set(MenuBtn, { pointerEvents: "none" });
      TweenMax.set(MenuBtn, { pointerEvents: "auto", delay: 0.5 });
      // TweenMax.to(NavPanel,0.5,{left:"-155%",transform:"skewX(30deg)",delay:delaydata, ease: Power1.easeOut});
      TweenMax.to(NavPanel, 0.5, {
        scale: 1.5,
        delay: delaydata + delaydata + delaydata + delaydata,
        ease: Power1.easeOut
      });
      TweenMax.to(NavPanel, 0.25, {
        opacity: 0,
        display: "none",
        delay: delaydata + delaydata + delaydata + 0.2
      });
      // TweenMax.to(contentViewer,0.4,{filter:"blur(0px) hue-rotate(0deg)",delay:delaydata, ease: Power1.easeOut});
      TweenMax.to(menuTag, 0.2, {
        opacity: 1,
        x: 0,
        delay: delaydata + delaydata + delaydata,
        ease: Power1.easeOut
      });
      break;
    case "PanelAppear":
      TweenMax.set(contentViewer, {
        opacity: 0.9,
        scale: 0.75,
        x: -direction,
        ease: Power1.easeOut
      });
      TweenMax.to(contentViewer, 0.35, {
        x: 0,
        delay: delaydata,
        ease: Power2.easeOut
      });
      TweenMax.to(contentViewer, 0.4, {
        scale: 1,
        opacity: 1,
        delay: delaydata + delaydata + 0.2,
        onComplete: switchOFF,
        ease: Power1.easeOut
      });
      break;
    case "PanelCloseNochange":
      TweenMax.set(contentViewer, { x: 0 });
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      TweenMax.set(MenuBtn, { pointerEvents: "none" });
      TweenMax.set(MenuBtn, { pointerEvents: "auto", delay: 0.5 });
      // TweenMax.to(NavPanel,0.5,{left:"-155%",transform:"skewX(30deg)",delay:delaydata, ease: Power1.easeOut});
      TweenMax.to(NavPanel, 0.5, {
        scale: 1.5,
        delay: delaydata + delaydata,
        ease: Power1.easeOut
      });
      TweenMax.to(NavPanel, 0.25, {
        opacity: 0,
        display: "none",
        delay: delaydata + delaydata
      });
      TweenMax.to(contentViewer, 0.4, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        delay: delaydata,
        ease: Power1.easeOut
      });
      TweenMax.to(menuTag, 0.2, {
        opacity: 1,
        x: 0,
        delay: delaydata + delaydata + delaydata,
        onComplete : switchOFF,
        ease: Power1.easeOut
      });
      break;
    case "PanelCloseToLink":
      TweenMax.to(MenuBtn, 0.2, { top: "1.5vw" });
      TweenMax.set(MenuBtn, { pointerEvents: "none" });
      TweenMax.set(MenuBtn, { pointerEvents: "auto", delay: 0.5 });
      TweenMax.to(NavPanel, 0.5, {
        left: "-125%",
        transform: "skewX(30deg)",
        ease: Power1.easeOut
      });
      TweenMax.to(navigationpanellogo, 0.2, { opacity: 0 });
      break;
    case "parallaxShow":
      break;
    case "parallaxHide":
      TweenMax.to(scene, 0.2, { opacity: 0 });
      break;
    default:
  }

  function switchOFF() {
    store.dispatch({ type: "SwitchOFF" });
  }

  // function followAnim(history)
  // {
  //   TweenMax.fromTo(contentViewer,delaydata,{x:-direction},{x:0, ease: Power1.easeOut});
  //   TweenMax.to(MenuBtn,0.2, {top:topdata});
  //   TweenMax.set(MenuBtn, {pointerEvents: 'none'});
  //   TweenMax.set(MenuBtn,{pointerEvents: 'auto', delay:0.5});
  //   // TweenMax.to(NavPanel,0.5,{left:"-155%",transform:"skewX(30deg)",delay:delaydata, ease: Power1.easeOut});
  //   TweenMax.to(NavPanel,0.5,{scale:1.5,delay:delaydata, ease: Power1.easeOut});
  //   TweenMax.to(NavPanel,0.25,{opacity:0,display:"none",delay:delaydata});
  //   // TweenMax.to(contentViewer,0.4,{filter:"blur(0px) hue-rotate(0deg)",delay:delaydata, ease: Power1.easeOut});
  //   TweenMax.to(contentViewer,0.4,{filter:"blur(0px)",opacity:1,scale:1,delay:delaydata, ease: Power1.easeOut});
  //   TweenMax.to(menuTag,0.2,{opacity:1, x:0,delay:delaydata, ease: Power1.easeOut});
  // }
};

export default withRouter(animation);
