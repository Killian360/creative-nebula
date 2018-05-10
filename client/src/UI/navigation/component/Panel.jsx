import React from "react"
import SocialLinks from "./socialLinks"
import * as animate from "../animation"
import { withRouter } from "react-router"
import { store } from "../../../reducers/combinereducers.js"
import { TweenMax, Power1, Linear } from "gsap"
import IcoBgPanel from "./iconContainer"
import IcoBgPanelInner from "./iconContainer2"
import WebglIco from "./webgl/webgl_ico";
import HelperIcons from "./webgl/helperIcons";
import Tilt from 'react-tilt';

class Panel extends React.Component { 

    constructor(props) {
        super(props);
        this.clickaction = false;
        this.desactivationclick = this.desactivationclick.bind(this);
        this.homeOn = false;
        this.state = {
          homeHover:false
        }
    }

    componentDidMount()
    {
    animate.animation("PanelOpen");
  }

    pulseReapeat() {
      let Circle = document.getElementsByClassName("circlePanelanimate");
      let Circle3 = document.getElementsByClassName("circlePanelanimate3");
  
      TweenMax.fromTo(
        Circle,
        2,
        { rotation: -20, svgOrigin: "185.5 132.5"},
        { rotation: 340, repeat: -1, repeatDelay: 0.5, ease: Linear.easeNone }
      );
      TweenMax.fromTo(
        Circle3,
        2,
        { rotation: -20, svgOrigin: "132 152"},
        { rotation: 340, repeat: -1, repeatDelay: 0.5, ease: Linear.easeNone }
      );
    }
    
  switchRoute(URL, direction) {
    if (this.clickaction === false) {
      this.clickaction = true;
      store.dispatch({ type: "NAVIGATIONWhite" });
      this.setState({ theme: store.getState().NAVIGATIONTHEME });
      this.delaydata = 0.22;
      this.Direction = direction;
      this.desactivationclick();
      this.MenuBtnStyletop = 15;
      animate.animation(
        "PanelClose",
        this.MenuBtnStyletop,
        this.delaydata,
        this.Direction
      );
      setTimeout(() => this.changeToUrl(URL), 200);
    }
  }

  changeToUrl(URL) {
    this.classActive = "";
    this.props.history.push(URL);
    this.Toogle = false;
    animate.animation(
      "PanelAppear",
      this.MenuBtnStyletop,
      this.delaydata,
      this.Direction
    );
  }

desactivationclick() {
    var btn = document.getElementsByClassName("PanelBtn");
    TweenMax.set(btn, { pointerEvents: "none" });
    TweenMax.set(btn, { pointerEvents: "auto", delay: 0.4 });
  }

  HoverHome()
  {
    this.setState({...this.state, homeHover:true});
    TweenMax.to(".HomePanelIcon",0.25, { scale:1.1  });
    TweenMax.to(".PanelWrapperNav",0.25, { filter:"hue-rotate(-75)"  });
    TweenMax.to(".PanelIcoRect",0.25, { opacity:1, scale:1  });

  }

  OutHome()
  {
    this.setState({...this.state, homeHover:false});
    TweenMax.to(".HomePanelIcon",0.25, { scale:1  });
    TweenMax.to(".PanelWrapperNav",0.25, { filter:"hue-rotate(0)"  });
    TweenMax.to(".PanelIcoRect",0.25, { opacity:0, scale:0  });
  }

  render() {
    const isWebGlOn = store.getState().WEB_GL;
    const isMatch = this.props.match;
    const isMatchLast = window.location.href.split( '/' );
    return (
<div id="NavPanel">
          <nav id="PanelNav">
          {/* <div className="PanelWrapperNav" onMouseEnter={()=> this.HoverHome()} onMouseLeave={() => this.OutHome()} > */}
          {/* <Tilt className="SvgPanelWrapper" options={{ max : 25, scale:1.1 }}>
         <IcoBgPanel dataId="HomeSvgBg" />
         <Tilt className="SvgPanelWrapper2" options={{ max : 15, scale:1 }}>
         <IcoBgPanelInner dataId="HomeSvgBg" />
         </Tilt>
         </Tilt>
         <HelperIcons /> */}
          <div className={"PanelWrapperText" + (isMatch.url==="/" || isMatchLast[3] ==="content" ? " inactive" : "")} onClick={() => this.switchRoute(store.getState().HOMEPREV_URL.url, window.innerWidth)}>
          {isWebGlOn === true && this.state.homeHover === true && <WebglIco ID="Webgl_ico_home" />}
                <li className={"PanelTitle"} >
                <span className="NavTitleTransparent">{store.getState().LANG.JsonLang.menu.titleHome}</span>
                <span className="NavTitle">
                {store.getState().LANG.JsonLang.menu.titleHome}</span>
                </li>
                </div>
                <div className={"PanelWrapperText"  + (isMatch.url==="/projects" ? " inactive" : "")}>
                <li className="PanelTitle" onClick={() => this.switchRoute("/projects", -window.innerWidth)}>
                <span className="NavTitleTransparent">{store.getState().LANG.JsonLang.menu.Titleprojects}</span>
                <span className="NavTitle">{store.getState().LANG.JsonLang.menu.Titleprojects}</span>
                </li>
                </div>
                <div className="PanelWrapperText">
                <li className="PanelTitle" onClick={() => this.switchRoute("/projects", -window.innerWidth)}>
                <span className="NavTitleTransparent">{store.getState().LANG.JsonLang.menu.titleAbout}</span>
                <span className="NavTitle">{store.getState().LANG.JsonLang.menu.titleAbout}</span>
                </li>
                </div>
          </nav>
          <SocialLinks />
        </div>
    )
}
}

export default withRouter(Panel)