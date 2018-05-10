import React from "react";
import "./style.css";
import { connect } from "react-redux";
import HelperContent from "./content/newVisitor/HelperContent";
import MailContent from "./content/mailContent/mailContent";
import * as animate from "../Form/mail/animations";

const mapStateToProps = state => {
  return { LANG: state.LANG, WEB_GL: state.WEB_GL };
};

class ContentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.LANG !== nextProps.LANG ? true : false
  }

  componentDidMount() {}

  clicked(ID) {
    ID !== "HelperPanel" && animate.animation("ClosePanel", ID);
  }

  render() {
    const { contentType, dataId, ID } = this.props;
    return (
      <div className={"PanelWrapper " + dataId}>
        <div id={dataId}>
          <div className={"Panel_border " + dataId} />
          <div className="Panel_bg" />
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
                  id="radialHelper"
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
              <circle
                cx="185.5"
                stroke="url(#radialHelper)"
                cy="132.5"
                r="131.5"
                className="circleBtnanimate opacity"
                id={"circleBtn1 " + ID}
              />
              <circle
                cx="132"
                stroke="url(#radialHelper)"
                cy="152"
                r="131"
                className="circleBtnanimate3 opacity"
                id={"circleBtn3 " + ID}
              />
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
              <circle
                cx="185.5"
                stroke="url(#radialHelper)"
                cy="132.5"
                r="131.5"
                className="circleBtnanimate opacity"
                id={"circleBtn4 " + ID}
              />
              <circle
                cx="132"
                stroke="url(#radialHelper)"
                cy="152"
                r="131"
                className="circleBtnanimate3 opacity"
                id={"circleBtn6 " + ID}
              />
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
                cx="132"
                cy="152"
                r="131"
                className="circleBtn opacity2"
              />
            </svg>
          </div>
          {contentType === "Helper" && <HelperContent />}
          {contentType === "Mail" && <MailContent />}
        </div>
        <div className="Hitbox" onClick={() => this.clicked(dataId)} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ContentPanel);
