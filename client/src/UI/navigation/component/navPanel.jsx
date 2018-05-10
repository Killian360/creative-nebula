import React from "react";
import * as animate from "../animation";
import { withRouter } from "react-router";
import { TweenMax, Power1 } from "gsap";
import { store } from "../../../reducers/combinereducers.js";
import Logo from "./logo";
import { connect } from "react-redux";
import Panel from "./Panel";

const mapStateToProps = state => {
  return {
    NAVIGATION: state.NAVIGATION,
    SLIDE: state.SLIDE,
    VIEWERON: state.VIEWERON,
    NAVIGATIONhome: state.NAVIGATIONhome,
    DESKTOP: state.DESKTOP,
    Navpanel: state.Navpanel,
    NAVIGATIONshort: state.NAVIGATIONshort,
    NAVIGATIONTHEME: state.NAVIGATIONTHEME,
    LANG: state.LANG
  };
};

class NavPanel extends React.Component {
  constructor(props) {
    super(props);
    this.Toogle = false;
    this.MenuBtnStyletop = "15";
    this.delaydata = 0;
    this.classActive = "";
    this.Direction = "";
    this.redirect = null;
    this.clickaction = false;
    this.state = {
      navtype: " desktop",
      css: "navigation-desktop",
      email: "",
      message: "",
      subject: "",
      theme: store.getState().NAVIGATIONTHEME
    };
  }

  componentDidMount() {
    this.animationsHandler();
  }

  clickedWebgl() {
    store.getState().WEB_GL === true
      ? store.dispatch({ type: "TOOGLEWEBGLOFF" })
      : store.dispatch({ type: "TOOGLEWEBGLON" });
  }

  animationsHandler() {
    store.getState().NAVIGATIONhome === false
      ? animate.animation("NavLogoShow")
      : animate.animation("NavLogoHide");
    store.getState().NAVIGATION === false
      ? animate.animation("NavHide")
      : animate.animation("NavShow");
    store.getState().VIEWERON === true
      ? animate.animation("NavViewer")
      : animate.animation("NavViewerOff");
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.NAVIGATIONTHEME !== prevProps.NAVIGATIONTHEME &&
      this.setState({ theme: store.getState().NAVIGATIONTHEME });
    if (store.getState().Navpanel === false && this.classActive === "is-active ") {
      this.classActive = "";
      this.setState({ theme: store.getState().NAVIGATIONTHEME });
    }
    this.animationsHandler();
  }

  ToogleMenu() {
    this.Toogle = !this.Toogle;
    if (store.getState().Navpanel === false) {
      store.dispatch({ type: "SwitchON" });
      this.classActive = "is-active ";
      this.setState({ theme: "whiteNav" });
      this.clickaction = false;
      var MenuBtn = document.getElementById("MenuBtn");
      var MenuBtnstyle =
        MenuBtn.currentStyle || window.getComputedStyle(MenuBtn);
      this.MenuBtnStyletop = MenuBtnstyle.top;
    } else {
      this.delaydata = 0;
      this.Direction = 0;
      this.Toogle = false;

      animate.animation(
        "PanelCloseNochange",
        this.MenuBtnStyletop,
        this.delaydata,
        this.Direction
      );
    }
  }

  shouldComponentUpdate(nextState, prevProps) {
    return this.props !== prevProps ? true : false;
  }

  render() {
    const isNavPanelOn = store.getState().Navpanel;

    return (
      <React.Fragment>
        <div id="MenuBtn" onClick={() => this.ToogleMenu()}>
          <span className={"menuTag " + this.state.theme}>
            {store.getState().LANG.JsonLang.menu.MenuTag}
          </span>
          <div className="hamburgerContainer">
            <div className={"hamburger " + this.classActive} id="hamburger-11">
              <span className={"line " + this.state.theme} />
              <span className={"line " + this.state.theme} />
              <span className={"line " + this.state.theme} />
            </div>
          </div>
        </div>
        <Logo stateName={this.state.theme} activeClass={this.classActive} />
        {isNavPanelOn === true && <Panel />}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(withRouter(NavPanel));
