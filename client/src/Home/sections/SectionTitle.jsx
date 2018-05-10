import React from "react";
import WebGLHome from "./webgl/webgl_Home";
import Button from "../../UI/button/Button";
import ScrollUI from "../../UI/scrollUI/ScrollUI";
import Parallax from "./parallax/parallax";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    LANG: state.LANG,
    WEB_GL: state.WEB_GL,
    HOMESLIDE: state.HOMESLIDE
  };
};

class SectionTitle extends React.Component {

  shouldComponentUpdate()
  {
    return true;
  }

  render() {
    const isWebGlOn = this.props.WEB_GL;
    return (
      <section id="top_slide" key="contentFade">
      {(this.props.HOMESLIDE.slide<2) &&
            <React.Fragment>
        <div id="home--canvas">
        {(isWebGlOn) && <WebGLHome />}
        </div>
        <div id="top_container">
          <div id="logo" />
          <div id="TagLine">{store.getState().LANG.JsonLang.Home.Tagline}</div>
          <div id="title_content">
          <div className="BtnContainer">
            <Button ID="btnTitle" ClickEvent={() => store.dispatch({ type: "MailerOpen" })}>
              {store.getState().LANG.JsonLang.Home.SectionGenesis.BtnDownload}
            </Button>
            </div>
          </div>
        </div>
        {(this.props.HOMESLIDE.slide===0) && <ScrollUI ID="scrollHome" />}
        {(this.props.HOMESLIDE.slide===0) && <Parallax />}
        </React.Fragment>
      }
      </section>
    );
  }
}

export default connect(mapStateToProps)(SectionTitle);
