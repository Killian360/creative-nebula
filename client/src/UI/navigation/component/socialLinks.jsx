import React from "react";
import {connect} from 'react-redux';
import {store} from '../../../reducers/combinereducers.js';
import { TweenMax, Power1 } from "gsap"
import { withCookies } from 'react-cookie';
import Switch from 'material-ui/Switch';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: { // Name of the component ⚛️ / style shee
      root: { // Name of the rule
        height: '100%', // Some CSS
      },
    },
    MuiTouchRipple: { // Name of the component ⚛️ / style shee
      root: { // Name of the rule
        overflow: 'visible', // Some CSS
      },
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#FFFFFF',
      dark: "#000000"
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

const mapStateToProps = state => {
  return {LANG: state.LANG, WEB_GL: state.WEB_GL}
}

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  label: {
    textTransform: 'capitalize',
  },
};

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
      <MuiThemeProvider theme={theme}>
      <Switch aria-label="LoginSwitch" color="primary" className="SwitchNav" checked={this.props.WEB_GL === true ? true : false}/>
      </MuiThemeProvider>
      <span className={"OptionsSelectorWebgl"}>
      <li>WebGl</li>
      </span>
      </div>
      <div className="OptionsLangue" onClick={() => this.clickLang()}>
      <span className="OptionsSelectorinvisible">EN</span>
      <div className="OptionsSVG">
      <svg className="ConfigIcon" x="0px" y="0px" viewBox="0 0 49.3 47.8">
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

export default connect(mapStateToProps)(withCookies(SocialLinks)) 
