import React from "react";
import "./style.css";
import { TweenMax } from "gsap";
import HelperIcons from "./icons/helperIcons";
import MailIcon from "./icons/mailIcon";
import IcoBg from "./iconContainer";
import { store } from "../../reducers/combinereducers.js";
import WebglIco from "./webgl/webgl_ico_helper";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    WEB_GL_Icon: state.WEB_GL_Icon,
    WEB_GL: state.WEB_GL
  };
};

class IcoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize() {
    let HighlightWrapper = document.getElementsByClassName(
      "HighlightWrapper " + this.props.ID
    );
    let Size = window.innerWidth * 0.4 * 0.24;
    TweenMax.set(HighlightWrapper, { width: Size, height: Size });
  }

  render() {
    const { ID, type } = this.props;
    const isWebGlOn = store.getState().WEB_GL;
    return (
      <div className="Ico_helper">
        <div className="SVG_ico_project" ref={this.resize} id={ID}>
          <IcoBg dataId={ID} />
          {type === "helperIcon" && <HelperIcons />}
          {type === "mailIcon" && <MailIcon />}
          {isWebGlOn === true && type === "mailIcon" && <WebglIco ID="Webgl_ico_mail" />}
          {isWebGlOn === true && type === "helperIcon" && <WebglIco ID="Webgl_ico" />}
          <div className={"HighlightWrapper " + ID}>
            <div className={"HighlightIco " + ID} />
            <div className="BorderIco" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(IcoContainer);
