import React from "react";
import "./ScrollUI.css";
import * as animate from "./ScrollUIAnimation";
import { TweenMax } from "gsap";

export default class ScrollUI extends React.PureComponent {
  componentDidMount() {
    var iconScroll = document.getElementsByClassName("ArrowScroll");
    TweenMax.to(iconScroll, 0.2, { opacity: 1, y: 0, delay: 0.1 });
    animate.animation("AnimateSpinner");
  }

  render() {
    return (
      <React.Fragment>
        <div className="ArrowScroll" id={"ArrowScroll"+ this.props.ID}>
          <div className="ArrowTail" />
          <svg className="ArrowScrollSVG" x="0px" y="0px" viewBox="0 0 129 129">
            <path
              d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
              fill="#FFFFFF"
            />
          </svg>
          <svg className="circleScroll" height="100%" width="100%">
            <defs>
              <linearGradient
                id={this.props.ID}
                gradientUnits="userSpaceOnUse"
                x1="25.4061"
                y1="8.1364"
                x2="14.5939"
                y2="26.8636"
              >
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="35%"
              stroke={"url(#" + this.props.ID + ")"}
            />
          </svg>
        </div>
      </React.Fragment>
    );
  }
}
