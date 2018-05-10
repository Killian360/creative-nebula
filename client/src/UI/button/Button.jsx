import React from "react";
import "./button.css";
import * as animate from "./animation";
import { TweenMax, Linear } from "gsap";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    LANG: state.LANG
  };
};

class Button extends React.Component {
  componentDidMount() {
    this.pulseReapeat();
  }

  pulseReapeat() {
    let Circle = document.getElementsByClassName("circleBtnanimate");
    let Circle2 = document.getElementsByClassName("circleBtnanimate2");
    let Circle3 = document.getElementsByClassName("circleBtnanimate3");

    TweenMax.fromTo(
      Circle,
      2,
      { rotation: -20, svgOrigin: "185.5 132.5"},
      { rotation: 340, repeat: -1, repeatDelay: 0.5, ease: Linear.easeNone }
    );
    TweenMax.fromTo(
      Circle2,
      2,
      { rotation: -20, svgOrigin: "215 260"},
      { rotation: 340, repeat: -1, repeatDelay: 0.5, ease: Linear.easeNone }
    );
    TweenMax.fromTo(
      Circle3,
      2,
      { rotation: -20, svgOrigin: "132 152"},
      { rotation: 340, repeat: -1, repeatDelay: 0.5, ease: Linear.easeNone }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.LANG !== this.props.LANG) {
      return true;
    }
    return false;
  }

  hover() {
    animate.animation("Hover", this.props.ID);
  }

  out() {
    animate.animation("Out", this.props.ID);
  }

  handleRoute(URL) {
    URL !== undefined ? this.props.history.push(URL) : this.props.ClickEvent();
  }

  render() {
    return (
        <div
          className="BtnMain"
          id={this.props.ID}
          onClick={() => this.handleRoute(this.props.LinkUrl)}
          onMouseEnter={this.hover.bind(this)}
          onMouseLeave={this.out.bind(this)}
          key={this.props.ID}
        >
          <div className={"SVG_triangle_left " + this.props.ID}>
            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 22 22">
              <path
                className="BtnRect"
                x="0"
                y="0"
                width="100%"
                height="100%"
                d="M11.3,0l11,11-11,11L0.3,11Z"
              />
            </svg>
            <div className={"GradientLineLeft " + this.props.ID} />
          </div>
          <div className={"SVG_triangle_right " + this.props.ID}>
            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 22 22">
              <path
                className="BtnRect"
                x="0"
                y="0"
                width="100%"
                height="100%"
                d="M11.3,0l11,11-11,11L0.3,11Z"
              />
            </svg>
            <div className={"GradientLineRight " + this.props.ID} />
          </div>
          <div className="BtnBackground">
            <span className="BtnTxt">{this.props.children}</span>
            <div className="patternCircle">
              <svg
                x="0px"
                y="0px"
                width="100%"
                className="svgCircleContainerBlur"
                viewBox="0 0 349 396"
              >
                <defs>
                  <linearGradient
                    id={"radial" + this.props.ID}
                    gradientUnits="userSpaceOnUse"
                    x1="25.4061"
                    y1="8.1364"
                    x2="14.5939"
                    y2="26.8636"
                  >
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <g className="circleBtnanimate" >
                <circle
                  cx="185.5"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="132.5"
                  r="131.5"
                  className="opacity"
                  id={"circleBtn1 " + this.props.ID}
                />
                </g>
                <g className="circleBtnanimate2" >
                <circle
                  cx="215"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="260"
                  r="130"
                  className="opacity"
                  id={"circleBtn2 " + this.props.ID}
                />
                </g>
                <g className="circleBtnanimate3" >
                <circle
                  cx="132"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="152"
                  r="131"
                  className="opacity"
                  id={"circleBtn3 " + this.props.ID}
                />
                </g>
              </svg>
              <svg
                x="0px"
                y="0px"
                width="100%"
                className="svgCircleContainer"
                viewBox="0 0 349 396"
              >
                <circle
                  cx="185.5"
                  cy="132.5"
                  r="131.5"
                  className="circleBtn opacity1"
                />
                <circle
                  cx="215"
                  cy="260"
                  r="130"
                  className="circleBtn opacity1"
                />
                <circle
                  cx="132"
                  cy="152"
                  r="131"
                  className="circleBtn opacity2"
                />
              </svg>
            </div>
            <div className="patternCircleRight">
              <svg
                x="0px"
                y="0px"
                width="100%"
                className="svgCircleContainerBlurRight"
                viewBox="0 0 349 396"
              >
                 <g className="circleBtnanimate" >
                <circle
                  cx="185.5"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="132.5"
                  r="131.5"
                  className="opacity"
                  id={"circleBtn4 " + this.props.ID}
                />
                </g>
                <g className="circleBtnanimate2" >
                <circle
                  cx="215"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="260"
                  r="130"
                  className=" opacity"
                  id={"circleBtn5 " + this.props.ID}
                />
                </g>
                 <g className="circleBtnanimate3" >
                <circle
                  cx="132"
                  stroke={"url(#radial" + this.props.ID + ")"}
                  cy="152"
                  r="131"
                  className=" opacity"
                  id={"circleBtn6 " + this.props.ID}
                />
                </g>
              </svg>
              <svg
                width="100%"
                x="0px"
                y="0px"
                className="svgCircleContainerRight"
                viewBox="0 0 349 396"
              >
                <circle
                  cx="185.5"
                  cy="132.5"
                  r="131.5"
                  className="circleBtn opacity1"
                />
                <circle
                  cx="215"
                  cy="260"
                  r="130"
                  className="circleBtn opacity1"
                />
                <circle
                  cx="132"
                  cy="152"
                  r="131"
                  className="circleBtn opacity2"
                />
              </svg>
            </div>
            <div className="overflowHidden">
              <div className={"Hover_Highlight " + this.props.ID} />
            </div>
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Button));
