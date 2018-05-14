import React from "react";
import Navigation from "../UI/navigation/navigation";
import ContentPanel from "../UI/Contentpanel/";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { store } from "../reducers/combinereducers.js";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    WEB_GL_Icon: state.WEB_GL_Icon
  };
};

class GlobalComponent extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    const { cookies } = this.props;

    // cookies.remove('NewVisiter');

    cookies.get("NewVisiter") === undefined
      ? cookies.set("NewVisiter", "true", { path: "/" })
      : cookies.set("NewVisiter", "false", { path: "/" });

    // cookies.remove('Lang');

    cookies.get("Lang") === "FR" && store.dispatch({ type: "SwitchFR" });
    cookies.get("Webgl") === "OFF" && store.dispatch({ type: "TOOGLEWEBGLOFF" });
  }
  
  render() {
    const NewVisiter = this.props.cookies.get("NewVisiter");
    const isPanelOpen = store.getState().WEB_GL_Icon.mailerWebgl;
    return (
      <React.Fragment>
        {NewVisiter === "true" && (
          <ContentPanel dataId="HelperPanel" contentType="Helper" />
        )}
        {isPanelOpen === true && (
          <ContentPanel dataId="MailPanel" contentType="Mail" />
        )}
        <Navigation />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(withCookies(GlobalComponent));
