import React from "react";
import {connect} from 'react-redux';
import {store} from '../../../reducers/combinereducers.js';
import { TweenMax, Power1 } from "gsap"
import { withCookies } from 'react-cookie';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const mapStateToProps = state => {
  return {LANG: state.LANG, WEB_GL: state.WEB_GL}
}

class SocialLinks extends React.Component {

    state = {
    checked: ['webgl'],
     };

  clickLang()
  {
    const {cookies} = this.props;
    this.props.LANG.Flag === "EN" ? store.dispatch({type: "SwitchFR"}) && cookies.set('Lang','FR', { path: '/' }) : store.dispatch({type: "SwitchEN"}) && cookies.set('Lang','EN', { path: '/' });
  }

  clickWebgl()
  {
    const {cookies} = this.props;
    this.props.WEB_GL === true ? store.dispatch({type: "TOOGLEWEBGLOFF"}) && cookies.set('Webgl','OFF', { path: '/' }) : store.dispatch({type: "TOOGLEWEBGLON"}) && cookies.set('Webgl','ON', { path: '/' });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };


  render()
  {
    return(
  <div id="RSLinks">
  <div >
    <div className="InfoPerso">
    <span>
      <li className="InfoPersoMain">I do freelance</li>
      <li className="InfoPersoSub">+33 6 25 77 75 48</li>
      <li className="InfoPersoSub">jeremy.charras@gmail.com</li>
      </span>
    </div>
    <div className="SocialLink--Link">
    <a
        href="https://www.linkedin.com/in/jeremy-charras-4373a720/"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      </div>
      </div>
      <div className="OptionsWebgl" onClick={() => this.clickWebgl()}>
      <span className="OptionsSelectorinvisible">ON</span>
      <div className="OptionsSVG">
      <svg className="helperIcon" x="0px" y="0px" viewBox="0 0 73.7 73.4">
    <g>
      <path  fill="#FFF" d="M36.7,30L36.7,30c-0.4,0-0.8-0.4-0.8-0.8L34.3,9c-0.5-5.3,0.5-8.7,2.4-8.7l0,0c1.9,0,2.9,3.5,2.4,8.7l-1.6,20.2
        C37.5,29.6,37.1,30,36.7,30z"/>
      <path  fill="#FFF" d="M36.7,44L36.7,44c0.4,0,0.8,0.4,0.8,0.8L39.2,65c0.5,5.3-0.5,8.7-2.4,8.7l0,0c-1.9,0-2.9-3.5-2.4-8.7l1.6-20.2
        C35.9,44.3,36.3,44,36.7,44z"/>
      <path  fill="#FFF" d="M43.7,37L43.7,37c0-0.4,0.4-0.8,0.8-0.8l20.2-1.6C70,34,73.4,35,73.4,37l0,0c0,1.9-3.5,2.9-8.7,2.4l-20.2-1.6
        C44.1,37.8,43.7,37.4,43.7,37z"/>
      <path  fill="#FFF" d="M29.7,37L29.7,37c0,0.4-0.4,0.8-0.8,0.8L8.7,39.4C3.5,39.9,0,38.9,0,37l0,0C0,35,3.5,34,8.7,34.5l20.2,1.6
        C29.4,36.2,29.7,36.6,29.7,37z"/>
      <path  fill="#FFF" d="M44.6,27.2L44.6,27.2c-0.3-0.3-0.4-0.7-0.2-1l9.2-11.5c2.4-3,4.9-4.1,6.2-2.8l0,0c1.4,1.4,0.3,3.9-2.8,6.2l-11.5,9.2
        C45.4,27.5,44.9,27.4,44.6,27.2z"/>
      <g>
        <path  fill="#FFF" d="M27.3,44.5L27.3,44.5c0.3,0.3,0.4,0.7,0.2,1L18.3,57c-2.4,3-4.9,4.1-6.2,2.8l0,0c-1.4-1.4-0.3-3.9,2.8-6.2l11.5-9.2
          C26.6,44.1,27,44.2,27.3,44.5z"/>
      </g>
      <g>
        <path  fill="#FFF" d="M44.6,44.5L44.6,44.5c0.3-0.3,0.7-0.4,1-0.2l11.5,9.2c3,2.4,4.1,4.9,2.8,6.2l0,0C58.5,61.1,56,60,53.7,57l-9.2-11.5
          C44.2,45.2,44.3,44.8,44.6,44.5z"/>
      </g>
      <path  fill="#FFF" d="M27.3,27.1L27.3,27.1c-0.3,0.3-0.7,0.4-1,0.2l-11.5-9.2c-3-2.4-4.1-4.9-2.8-6.2l0,0c1.4-1.4,3.9-0.3,6.2,2.8l9.2,11.5
        C27.7,26.4,27.6,26.9,27.3,27.1z"/>
    </g>
  </svg>
      </div>
      <span className={"OptionsSelectorLangue " + (this.props.WEB_GL === true ? "EN" : "FR")}>
      <li>ON</li>
      <li>OFF</li>
      </span>
      </div>
      <div className="OptionsLangue" onClick={() => this.clickLang()}>
      <span className="OptionsSelectorinvisible">EN</span>
      <div className="OptionsSVG">
      <svg className="helperIcon" x="0px" y="0px" viewBox="0 0 49.3 47.8">
  <g>
    <path fill="#FFF" d="M46.7,0H16.3c-1.6,0-2.9,1.3-2.9,2.9v20.8c0,1.6,1.3,2.9,2.9,2.9h18.9l7.6,7.6c0.2,0.2,0.5,0.3,0.7,0.3
      c0.1,0,0.3,0,0.4-0.1c0.4-0.1,0.6-0.5,0.6-0.9v-6.9h2.3c1.6,0,2.9-1.3,2.9-2.9V2.9C49.7,1.3,48.3,0,46.7,0z M22.6,16.1
      c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C25.9,14.6,24.4,16.1,22.6,16.1z M31.6,16.1
      c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C34.9,14.6,33.4,16.1,31.6,16.1z M40.6,16.1
      c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C43.9,14.6,42.5,16.1,40.6,16.1z"/>
    <g>
      <path fill="#FFF" d="M36,30.3v7.1c0,1.6-1.3,2.9-2.9,2.9H14.2L6.6,48c-0.2,0.2-0.5,0.3-0.7,0.3c-0.1,0-0.3,0-0.4-0.1c-0.4-0.2-0.6-0.5-0.6-0.9
        v-6.9H2.6c-1.6,0-2.9-1.3-2.9-2.9V16.6c0-1.6,1.3-2.9,2.9-2.9h8.8v13.1c0,1.1,0.9,1.9,1.9,1.9h21L36,30.3z"/>
    </g>
  </g>
  </svg>
      </div>
      <span className={"OptionsSelectorLangue " + (this.props.LANG.Flag === "EN" ? "EN" : "FR")}>
      <li>EN</li>
      <li>FR</li>
      </span>
      </div>
      </div>
)
}
}

export default connect(mapStateToProps)(withCookies(SocialLinks));
