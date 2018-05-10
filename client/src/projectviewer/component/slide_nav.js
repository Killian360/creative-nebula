import React from "react";
import {store} from '../../reducers/combinereducers.js';
import {withRouter} from 'react-router';

import {TweenMax, Power1} from "gsap";

import './slide_nav.css';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {PREVIEW: state.PREVIEW}
}

class SlideNav extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.UpdateSelector = this.UpdateSelector.bind(this);
    this.clickHandleSelector = this.clickHandleSelector.bind(this);
  }

  componentDidMount() {
    TweenMax.staggerFromTo('.SelectorContainer', 0.2, {
      y: -15,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      ease: Power1.easeOut
    }, 0.06);
    this.UpdateSelector();
  }

  componentDidUpdate() {
    this.UpdateSelector();
  }

  clickHandleSelector(ID) {
    if (this.props.PREVIEW.id !== ID)
    {
      this.props.history.push(ID);
    }
  }

  UpdateSelector() {
    let selectorOff = document.getElementsByClassName("SlideSelector");
    let SelectorOn = document.getElementById("Selector_" + store.getState().PREVIEW.id);
    let outlineOff = document.getElementsByClassName("selectorOutline");
    let outlineOn = document.getElementsByClassName("selectorOutline " + store.getState().PREVIEW.id);
    let HitboxSelectorOff = document.getElementsByClassName("hitboxSelector");
    let HitboxSelectorOn = document.getElementsByClassName("hitboxSelector " + store.getState().PREVIEW.id);

    TweenMax.to(selectorOff, 0.25, {
      backgroundColor: '#FFF',
      backgroundImage: '',
      rotation:'45deg',
      cursor:'pointer',
      scale: 1
    });
    TweenMax.set(HitboxSelectorOff,{cursor:'pointer'});
    TweenMax.set(HitboxSelectorOn,{cursor:'auto'});
    TweenMax.to(SelectorOn, 0.25, {
      backgroundColor: 'rgb(32, 50, 157)',
      scale: 1.5,
      rotation:'45deg',
      ease: Power1.easeOut
    });
    TweenMax.to(outlineOff, 0.25, {
      scale: 1,
      rotation:'45deg',
      animation: ''
    });
    TweenMax.to(outlineOn, 0.25, {
      scale: 1.7,
      rotation:'45deg',
      animation: "radiant-highlight-bg-Main 4.5s infinite linear",
      ease: Power1.easeOut
    });

  }

  render() {
    return (<nav id="slide_nav">
      {
        store.getState().LANG.JsonProjects.projets.map(Project => (<div className="SelectorContainer" key={Project.id}>
          <div className={"hitboxSelector " + Project.id} onClick={() => this.clickHandleSelector(Project.id)}></div>
          <div id={"Selector_" + Project.id} className="SlideSelector"></div>
          <div className={"selectorOutline " + Project.id}></div>
        </div>))
      }
    </nav>)
  }
}

export default connect(mapStateToProps)(withRouter(SlideNav));
