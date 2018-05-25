import React from "react";
import { TweenMax, Power1, Power4,Power3, Power2,Bounce } from "gsap";

import "./home.css";
import { store } from "../reducers/combinereducers.js";
import WheelReact from "wheel-react";
import Swipeable from "react-swipeable";
import { connect } from "react-redux";

import SectionTitle from "./sections/SectionTitle";
import SectionGenesis from "./sections/SectionGenesis";
import SectionProject from "./sections/SectionProject";
import SectionClients from "./sections/SectionClients";
import SectionClient from "./sections/SectionClient";
import SectionReactRedux from "./sections/SectionReactRedux";

import * as animate from "./animation";
import ProjectScrollbar from "../Scrollbars/projectScrollbar";
import PropTypes from "prop-types";
import { withRouter } from "react-router";


const mapStateToProps = state => {
  return {
    HOMESLIDE: state.HOMESLIDE,
    NAVIGATIONTHEME: state.NAVIGATIONTHEME,
    LANG: state.LANG,
    CONTENTHOMESLIDE: state.CONTENTHOMESLIDE,
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.updatePosition = this.updatePosition.bind(this);
      this.state = { top: 0, device: "", ScrollValue:"" };
    this.MenuBtnStyletop = "30";
    this.sectionHeight = window.innerHeight;
    this.slideNbr = 0;
    this.projectShow = 0;
    this.Animating = false;
    this.SectionNbr = 2;
    store.dispatch({ type: "NAVIGATIONshortOFF" });
    store.dispatch({ type: "VIEWEROFF" });
    this.AnimationSwipeUp = this.AnimationSwipeUp.bind(this);
    this.AnimationSwipeDown = this.AnimationSwipeDown.bind(this);
    this.handleScrollFrame = this.handleScrollFrame.bind(this);
    this.getOffset = this.getOffset.bind(this);
    this.activated == false;
    this.isStartScrolling=false;
    this.isInit=true;
    this.gradient = 'linear-gradient(45deg, rgba(50, 3, 103,0.8), rgb(14, 0, 130))';
    this.gradient2 = 'linear-gradient(45deg, rgba(31, 3, 103,0.8), rgb(96, 5, 152))';
  }

  updatePosition() {
    this.sectionHeight = window.innerHeight;
    var contentSlider = document.getElementById("content");
    TweenMax.to(contentSlider, 0.01, {
      top: -(this.sectionHeight * store.getState().HOMESLIDE.slide),
      ease: Power1.easeOut
    });
  }

  componentDidMount() {
    this.sectionHeight = window.innerHeight;
    this.slideNbr = store.getState().HOMESLIDE.slide;
    let contentSlider = document.getElementById("content");
    TweenMax.set(".track-vertical-white",{display:"none"});
    if (this.slideNbr !== 0) {
      TweenMax.to(contentSlider, 0.1, {
        top: -(this.sectionHeight * store.getState().HOMESLIDE.slide)
      });
    }
    TweenMax.to("#top_slide", 0.25, { opacity: 1, delay: 0.1 });

    window.addEventListener("resize", this.updatePosition);
    WheelReact.config({
      up: () => {
        this.AnimationSwipeUp();
      },
      down: () => {
        this.AnimationSwipeDown();
      }
    });

    if (this.slideNbr === 0) {
      store.dispatch({ type: "NAVIGATIONhomeON" });
      store.dispatch({ type: "NAVIGATIONWhite" });
    } else if (this.slideNbr === 1) {
      animate.animation("resetSlideProject");
      store.dispatch({ type: "NAVIGATIONBlue" });
      store.dispatch({ type: "NAVIGATIONhomeOFF" });
    } else {
      store.dispatch({ type: "NAVIGATIONhomeOFF" });
      store.dispatch({ type: "NAVIGATIONWhite" });
    }

    if (this.props.match.params.contentID!=null)
    {
    this.slideNbr = 2;
    store.dispatch({ type: "NAVIGATIONhomeOFF" });
    store.dispatch({ type: "NAVIGATIONWhite" });
    store.dispatch({ type: "getHomeSlide", text: this.slideNbr });
    TweenMax.to(contentSlider, 0.1, {
      top: -(this.sectionHeight * this.slideNbr)
    });
    this.props.match.params.contentID !=null && TweenMax.to('#globalgradient',0.35,{backgroundImage:this.gradient})
    // this.props.match.params.contentID === this.NavLang.References && TweenMax.to('#globalgradient',0.35,{backgroundImage:this.gradient});
    // this.props.match.params.contentID === this.NavLang.Clients && TweenMax.to('#globalgradient',0.35,{backgroundImage:this.gradient2});
    const scrollbars = this.scrollbarsRef;
    let TargetBound = document.getElementById("content-"+this.props.match.params.contentID).offsetTop;
    this.props.match.params.contentID === "Technologies" && store.dispatch({type: 'getContentSlide', text:0});
    this.props.match.params.contentID === "References" && store.dispatch({type: 'getContentSlide', text:1});
    this.props.match.params.contentID === "Clients" && store.dispatch({type: 'getContentSlide', text:2});
    scrollbars.scrollTop(TargetBound);
    }
    setTimeout(()=>this.isInit=false, 300);
  }

  AnimationSwipeUp() {
    const contentSlider = document.getElementById("content");
    if (this.slideNbr < this.SectionNbr && this.Animating === false) {
      this.Animating = true;
      this.slideNbr++;
      TweenMax.to(contentSlider, 1.15, {
        top: -(this.sectionHeight * this.slideNbr),
        onComplete: this.animating.bind(this),
        ease: Power3.easeOut
      });
      store.dispatch({ type: "getHomeSlide", text: this.slideNbr });
    }
  }

  AnimationSwipeDown() {
    const scrollbars = this.scrollbarsRef;
    const Scrolltop = scrollbars.getScrollTop() || 0;

    const contentSlider = document.getElementById("content");
    if (this.slideNbr !== 0 && this.Animating === false && Scrolltop === 0) {
      this.Animating = true;
      this.slideNbr--;
      TweenMax.to(contentSlider, 1.15, {
        top: -(this.sectionHeight * this.slideNbr),
        onComplete: this.animating.bind(this),
        ease: Power3.easeOut
      });
      store.dispatch({type: 'getContentSlide', text:-1});
      store.dispatch({ type: "getHomeSlide", text: this.slideNbr });
    }
  }

  animating() {
    this.Animating = false;
  }

  onSwipingUp(e, deltaY) {
    this.Animating = false;
    if (this.slideNbr < this.SectionNbr) {
      const contentSlider = document.getElementById("content");
      TweenMax.to(contentSlider, 0.2, {
        top: -(this.sectionHeight * this.slideNbr) - deltaY * 0.7,
        ease: Power2.easeOut
      });
    }
  }

  onSwipingDown(e, deltaY) {
    this.Animating = false;
    const scrollbars = this.scrollbarsRef;
    const Scrolltop = scrollbars.getScrollTop();
    
    if (this.slideNbr > 0 && Scrolltop===0) {
      const contentSlider = document.getElementById("content");
      TweenMax.to(contentSlider, 0.2, {
        top: -(this.sectionHeight * this.slideNbr) + deltaY * 0.7,
        ease: Power2.easeOut
      });
    }
  }

  swipedUp(e, deltaY) {
    const contentSlider = document.getElementById("content");
    if (deltaY < window.innerHeight * 0.2 && this.slideNbr < this.SectionNbr) {
      TweenMax.to(contentSlider, 0.2, {
        top: -(this.sectionHeight * this.slideNbr),
        ease: Power2.easeOut
      });
    } else {
      this.AnimationSwipeUp();
    }
  }

  swipedDown(e, deltaY) {
    const contentSlider = document.getElementById("content");
    if (deltaY > -window.innerHeight * 0.2 && this.slideNbr > 0) {
      TweenMax.to(contentSlider, 0.2, {
        top: -(this.sectionHeight * this.slideNbr),
        ease: Power2.easeOut
      });
    } else {
      this.AnimationSwipeDown();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePosition);
    let Newurl;
    if (this.props.match.params.contentID!=null)
    {
    Newurl = "/content/" + this.props.match.params.contentID ;
    } else {
    Newurl = "/";
    }
    store.dispatch({ type: "GetHomePrevURL", text:Newurl});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.HOMESLIDE != this.props.HOMESLIDE) {
      if (this.slideNbr === 0) {
        store.dispatch({ type: "NAVIGATIONhomeON" });
        store.dispatch({ type: "NAVIGATIONWhite" });
        this.props.history.push("/");

        animate.animation("SlideProjectDisapear");
      } else if (this.slideNbr === 1) {
        this.props.history.push("/");

        animate.animation("resetSlideProject");
        animate.animation("SlideProjectAppear");

        store.dispatch({ type: "NAVIGATIONBlue" });
        store.dispatch({ type: "NAVIGATIONhomeOFF" });
      } else if (this.slideNbr === 2) {
        animate.animation("SlideProjectDisapear");
        animate.animation("callSlideProject");
        store.dispatch({ type: "NAVIGATIONWhite" });
      }
    }
    
    if (this.props.match.url==="/" && this.slideNbr!==prevProps.slideNbr && this.slideNbr>=2)
    {
      this.props.history.push("/content/Technologies");
      store.dispatch({type: 'getContentSlide', text:0});
    }

    if (this.props.CONTENTHOMESLIDE !== prevProps.CONTENTHOMESLIDE)
{
  this.props.CONTENTHOMESLIDE.contentSlide===0 && TweenMax.to('#globalgradient',0.6,{css:{backgroundImage: "linear-gradient(45deg, rgba(185, 3, 103, 0.8), rgb(14, 0, 130))"}});
  this.props.CONTENTHOMESLIDE.contentSlide===1 && TweenMax.to('#globalgradient',0.6,{css:{backgroundImage: "linear-gradient(45deg, rgba(0, 5, 160, 0.8), rgb(0, 94, 130))"}});
  this.props.CONTENTHOMESLIDE.contentSlide===2 && TweenMax.to('#globalgradient',0.6,{css:{backgroundImage: "linear-gradient(45deg, rgba(185, 3, 45, 0.8), rgb(14, 0, 130))"}});
}
    // if (this.props.match.params.contentID!= prevProps.match.params.contentID)
    // {
    //   this.props.match.params.contentID === this.NavLang.References && TweenMax.to('#globalgradient',0.35,{backgroundImage:this.gradient});
    //   this.props.match.params.contentID === this.NavLang.Clients && TweenMax.to('#globalgradient',0.35,{backgroundImage:this.gradient2});
    // }

    if (this.props.match.params.contentID!= prevProps.match.params.contentID && this.props.match.params.contentID!=null && this.isStartScrolling===false)
    {
    this.MenuContent.isScrollingActive=false;
    const scrollbars = this.scrollbarsRef;
    let TargetBound = document.getElementById("content-"+this.props.match.params.contentID).offsetTop;
    scrollbars.scrollTop(TargetBound);
    }
  }

  handleScrollFrame(values)
  {
    let { scrollTop, top } = values;
    let HueValue = (top*25);

    TweenMax.to(".menuContentHomeScrollBar",0.15,{scaleY:top});
    if (this.MenuContent!=null && this.MenuContent.isScrollingActive===true && this.isInit===false)
    {
      this.setState({...this.state, ScrollValue:scrollTop});
      const Children = this.scrollbarsRef.props.children;
      Children.map((o, index) => (this.getOffset(o.props.IndexID, this.state.ScrollValue, index)));
    }
  }

  // shouldComponentUpdate(nextProps)
  // {
  // console.log(nextProps.HOMESLIDE);
  // return  nextProps.HOMESLIDE != this.props.HOMESLIDE ? true : false;
  // }

  handleScrollStart()
  {
    this.isStartScrolling=true;
    this.MenuContent!=null && (this.MenuContent.isClickedToNav=false);
  }

  getOffset(childrenID, scrollPos, index)
  {
    let heightContent = document.getElementById("content-"+childrenID).clientHeight;
    let PosContent = document.getElementById("content-"+childrenID).offsetTop-heightContent/2;
    if (PosContent <= scrollPos && scrollPos<PosContent+heightContent*1 && this.props.match.params.contentID!==childrenID && this.isInit===false)
    {
      this.props.history.push("/content/"+childrenID);
      store.dispatch({type: 'getContentSlide', text:index});
    }
  }

  handleScrollStop()
  {
    this.isStartScrolling=false;
    this.MenuContent!=null && (this.MenuContent.isScrollingActive=true);
    this.MenuContent!=null && (this.MenuContent.isClickedToNav=true);
  }

  render() {  
    return (
      <div id="contentViewer" className="contentHomeView">
          <div className="Maincontainer" {...WheelReact.events} id="content">
                    <Swipeable
          trackMouse={false}
          onSwipingUp={this.onSwipingUp.bind(this)}
          onSwipedUp={this.swipedUp.bind(this)}
          onSwipingDown={this.onSwipingDown.bind(this)}
          onSwipedDown={this.swipedDown.bind(this)}
        >
            <SectionTitle />
            <SectionGenesis />
            <ProjectScrollbar
              ref={c => {
                this.scrollbarsRef = c;
              }}
              renderTrackVertical={props => (
                <div {...props} className="track-vertical-white" />
              )}
              renderThumbVertical={props => (
                <div {...props} className="thumb-vertical-white" />
              )}
              renderView={props => <div {...props} className="view" />}
              autoHide={true}
              autoHideTimeout={500}
              autoHideDuration={200}
              onScrollFrame={this.handleScrollFrame.bind(this)}
              onScrollStop={this.handleScrollStop.bind(this)}
              onScrollStart={this.handleScrollStart.bind(this)}
              >
              <SectionReactRedux IndexID="Technologies"/>
              <SectionProject IndexID="References"/>
              <SectionClient IndexID="Clients"/>
              <SectionClients IndexID="test3" Title="test3"/>
              {/* <SectionProject IndexID="Clients" />
              <SectionProject IndexID="chiwawa" />
              <SectionProject IndexID="KOKORIKO" /> */}
            </ProjectScrollbar>
            </Swipeable>
            {this.slideNbr >= 2 && (
              <MenuContent ref={c => {this.MenuContent = c}} History={this.props.history} param={this.props.match.params.contentID} ScrollRef={this.scrollbarsRef} NavIndex={this.scrollbarsRef.props.children} />
            )}
          </div>
      </div>
    );
  }
}

class MenuContent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickToScroll = this.onClickToScroll.bind(this);
    // this.scrollToChapter = this.scrollToChapter.bind(this);
    this.isScrollingActive=true;
    this.isClickedToNav=true;
  }

  onClickToScroll(URL, index)
  {
    if (this.isClickedToNav===true)
    {
    this.isClickedToNav=false;
    this.isScrollingActive=false;
    this.props.History.push("/content/"+ URL);
    store.dispatch({type: 'getContentSlide', text:index});
    }
  }

  componentDidMount()
  {
    TweenMax.set(".liWrapper",{x:-50, opacity:0});
    TweenMax.staggerTo(".liWrapper",0.25,{opacity:1,delay:0.25, x:0, ease:Power4.easeOut},0.1);
  }

  render() {
    let {NavIndex, param} = this.props;
    return (
      <div id="menuContentHome">
      <ul>
        <div className="menuContentHomeScrollBarBefore"></div>
        <div className="menuContentHomeScrollBar"></div>
        {NavIndex.map((o, index) => (
          <div className="liWrapper" key={o.props.IndexID}>
          <li
            className={"LinkContentNav" + (param===o.props.IndexID ? ' ActiveLink' : '')}
            id={o.props.IndexID}
            onClick={()=> this.onClickToScroll(o.props.IndexID, index)}
          >
          {store.getState().LANG.JsonLang.Home.MenuContentHome[index]}
          </li>
          </div>
        ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Home));
