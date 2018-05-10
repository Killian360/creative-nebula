import React from "react";
import Slider from "react-slick";
import {connect} from 'react-redux';
import {store} from '../../../../reducers/combinereducers.js';
import {TweenMax, Power1,Power2, Power4} from "gsap";
import Button from '../../../button/Button';
import IcoContainer from "../../../IconWrapper/index";
import { withCookies } from 'react-cookie';

const mapStateToProps = state => {
  return {LANG: state.LANG, WEB_GL: state.WEB_GL}
}

class HelperContent extends React.Component {

  constructor(props) {
    super(props);
    this.ChangeIndex = this.ChangeIndex.bind(this);
    this.switchIcon =  this.switchIcon.bind(this);
    this.closeHelper =  this.closeHelper.bind(this);
  }

  shouldComponentUpdate(nextProps)
  {
    if (this.props.LANG !== nextProps.LANG)
  {
    return true;
  }
  return false;
  }

  componentDidMount()
  {
  this.switchIcon();
  let selector = document.getElementsByClassName('HelperSelection SwitchEN');
  let underbarSelector = document.getElementsByClassName('underbar SwitchEN');
  let selectorWebgl = document.getElementsByClassName('HelperSelection TOOGLEWEBGLON');
  let underbarSelectorwebgl = document.getElementsByClassName('underbar TOOGLEWEBGLON');
  var contentViewer = document.getElementById("contentViewer");
 let HelperPanel = document.getElementById("HelperPanel");
 let HelperPanel_border = document.getElementsByClassName("HelperPanel_border");
 let PanelWrapper = document.getElementsByClassName('PanelWrapper HelperPanel');
 let HighlightIco = document.getElementsByClassName('HighlightIco helper');

 TweenMax.fromTo(HighlightIco, 1.6,{
     scale:2},
     {
         scale:2.4, yoyo:true, repeat:-1}
   );

  TweenMax.to(PanelWrapper, 0.25,{opacity:1, display:'block',visibility:'visible', ease:Power1.easeIn});
  TweenMax.to(contentViewer,0.35,{filter:"blur(0px)",opacity:0.9, scale:0.75, delay:0.25, ease: Power1.easeOut});
  TweenMax.to(HelperPanel,0.65,{opacity:1,top:"50%",visibility:'visible', delay:0.5, ease: Power4.easeOut});
  TweenMax.to(HelperPanel_border, 0.35,{opacity:1, delay:0.85, ease:Power1.easeOut});

  TweenMax.to(selector, 0.25, {
    opacity: 1,
    pointerEvents: 'none'
  });
  TweenMax.to(underbarSelector, 0.25, {transform: 'scaleX(1)'});
  TweenMax.to(selectorWebgl, 0.25, {
    opacity: 1,
    pointerEvents: 'none'
  });
  TweenMax.to(underbarSelectorwebgl, 0.25, {transform: 'scaleX(1)'});
}


clickHandleSelector(event) {
  const { cookies } = this.props;

  if (event==="SwitchFR")
  {
    cookies.set('Lang','FR', { path: '/' });
  } else if (event==="SwitchEN"){
    cookies.set('Lang','EN', { path: '/' });
  }

  store.dispatch({type: event});

  const selectorWebgl = document.getElementsByClassName('HelperSelection webgl');
  const underbarWebgl = document.getElementsByClassName('underbar webgl');

  const selectorGlobal = document.getElementsByClassName('HelperSelection Lang');
  const underbarGlobal = document.getElementsByClassName('underbar Lang');

   if (event==="SwitchEN" || event==="SwitchFR")
   {
  TweenMax.to(underbarGlobal, 0.25, {transform: 'scaleX(0)'});
  TweenMax.to(selectorGlobal, 0.25, {opacity: 0.7, pointerEvents: 'auto'});
   }

   if (event==="TOOGLEWEBGLON" || event==="TOOGLEWEBGLOFF")
   {
    TweenMax.to(selectorWebgl, 0.25, {opacity: 0.7, pointerEvents: 'auto'});
    TweenMax.to(underbarWebgl, 0.25, {transform: 'scaleX(0)'});
   }

   const selector = document.getElementsByClassName('HelperSelection ' + event);
   const underbarSelector = document.getElementsByClassName('underbar ' + event);
   const HelperTitleWrapper = document.getElementsByClassName('HelperTitleWrapper');

  TweenMax.killTweensOf(HelperTitleWrapper);

  TweenMax.to(selector, 0.25, {
    opacity: 1,
    pointerEvents: 'none'
  });

  TweenMax.to(underbarSelector, 0.25, {transform: 'scaleX(1)'});
}


switchIcon()
{
let Icon1 = document.getElementsByClassName("helperIcon Panel1");
let Icon2 = document.getElementsByClassName("helperIcon Panel2");
let Icon3 = document.getElementsByClassName("helperIcon Panel3");

if (this.slider.innerSlider.state.currentSlide === 0)
{
TweenMax.to(Icon2,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon3,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon1,0.15, {opacity:1,scale:1.4,delay:0.15, ease:Power4.easeOut});
TweenMax.to(Icon1,0.35, {opacity:1,scale:1, delay:0.3, ease:Power4.easeOut});

} else if (this.slider.innerSlider.state.currentSlide === 1)
{
TweenMax.to(Icon1,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon3,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon2,0.15, {opacity:1,scale:1.4,delay:0.15, ease:Power4.easeOut});
TweenMax.to(Icon2,0.35, {opacity:1,scale:1, delay:0.3, ease:Power4.easeOut});


} else if (this.slider.innerSlider.state.currentSlide === 2)
{
TweenMax.to(Icon2,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon1,0.15, {opacity:0,scale:0, ease:Power1.easeIn})
TweenMax.to(Icon3,0.15, {opacity:1,scale:1.4,delay:0.15, ease:Power4.easeOut});
TweenMax.to(Icon3,0.35, {opacity:1,scale:1, delay:0.3, ease:Power4.easeOut});
}
}

ChangeIndex()
{
  this.switchIcon();
}

closeHelper()
{
  let HelperPanel = document.getElementById('HelperPanel');
  let PanelWrapper = document.getElementsByClassName('PanelWrapper');
  var contentViewer = document.getElementById("contentViewer");
  TweenMax.to(contentViewer,0.4,{filter:"blur(0px)",opacity:1,scale:1,delay:0.45,ease: Power1.easeOut});
  TweenMax.to(HelperPanel, 0.25,{scale:1.25, ease:Power2.easeOut});
  TweenMax.to(HelperPanel, 0.25,{scale:0.75,delay:0.25, opacity:0, ease:Power1.easeIn});
  TweenMax.to(PanelWrapper, 0.25,{opacity:0,delay:0.5, display:'none', onComplete:dispatchClose, ease:Power1.easeIn});
  TweenMax.killTweensOf('.HighlightIco');
  function dispatchClose()
  {
    store.dispatch({type: 'helperClose'});
  }
}

  render()
  {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      dotsClass: 'helper-dots',
      afterChange:this.ChangeIndex
    };
  return(
    <React.Fragment>
  <IcoContainer ID="helper" type="helperIcon" />

  <Slider {...settings} ref={slider => (this.slider = slider)}>
    <div>
      <div className="helperTable">
        <div className="helpertableInner">
        <div className="HelperTitleWrapper">
          <li className="HelperTitle">{store.getState().LANG.JsonLang.HelperPanel.Panel1.title}</li>
          <li className="HelperSubtitle">{store.getState().LANG.JsonLang.HelperPanel.Panel1.subtitle}</li>
        </div>
        <div className="HelperselectionWrapper">
          <span className="HelperSelection Lang SwitchFR" onClick={() => this.clickHandleSelector("SwitchFR")}>
            {store.getState().LANG.JsonLang.HelperPanel.Panel1.choice1}
            <div className="HelperSelectionBG SwitchFR"></div>
            <div className="underbar Lang SwitchFR"></div>
          </span>
          <span className="HelperSelection Lang SwitchEN" onClick={() => this.clickHandleSelector("SwitchEN")}>
            {store.getState().LANG.JsonLang.HelperPanel.Panel1.choice2}
            <div className="HelperSelectionBG SwitchEN"></div>
            <div className="underbar Lang SwitchEN"></div>
          </span>
        </div>
      </div>
      </div>
    </div>
    <div>
      <div className="helperTable">
        <div className="helpertableInner">
      <div className="HelperTitleWrapper">
        <li className="HelperTitle">{store.getState().LANG.JsonLang.HelperPanel.Panel2.title}</li>
        <li className="HelperSubtitle">{store.getState().LANG.JsonLang.HelperPanel.Panel2.subtitle}</li>
      </div>
      <div className="HelperselectionWrapper">
        <span className="HelperSelection webgl TOOGLEWEBGLON" onClick={() => this.clickHandleSelector("TOOGLEWEBGLON")}>
          {store.getState().LANG.JsonLang.HelperPanel.Panel2.choice1}
          <div className="HelperSelectionBG TOOGLEWEBGLON"></div>
          <div className="underbar webgl TOOGLEWEBGLON"></div>
        </span>
        <span className="HelperSelection webgl TOOGLEWEBGLOFF" onClick={() => this.clickHandleSelector("TOOGLEWEBGLOFF")}>
          {store.getState().LANG.JsonLang.HelperPanel.Panel2.choice2}
          <div className="HelperSelectionBG TOOGLEWEBGLOFF"></div>
          <div className="underbar webgl TOOGLEWEBGLOFF"></div>
        </span>
      </div>
    </div>
    <div className="HelperDesc">{store.getState().LANG.JsonLang.HelperPanel.Panel2.desc}</div>
    </div>
  </div>
    <div>
      <div className="helperTable">
        <div className="helpertableInner">
      <div className="HelperTitleWrapper">
        <li className="HelperTitle">{store.getState().LANG.JsonLang.HelperPanel.Panel3.title}</li>
        <li className="HelperSubtitle">{store.getState().LANG.JsonLang.HelperPanel.Panel3.subtitle}</li>
      </div>
      <Button ID="btnPanel3" ClickEvent={() => this.closeHelper()}> {store.getState().LANG.JsonLang.HelperPanel.closeBTN}</Button>
    </div>
    <div className="HelperDesc">{store.getState().LANG.JsonLang.HelperPanel.Panel3.desc}</div>
    </div></div>
  </Slider>
</React.Fragment>
)
}
}

export default connect(mapStateToProps)(withCookies(HelperContent))
