import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
import SliderIndexProjects from "./SliderIndexProjects/slider";
import { TweenMax, Power1 } from "gsap";
import ReactTransitionGroup from 'react-addons-transition-group'

const mapStateToProps = state => {
  return {
    LANG: state.LANG,
    HOMESLIDE: state.HOMESLIDE,
    CONTENTHOMESLIDE: state.CONTENTHOMESLIDE,
  };
};

class SectionProject extends React.Component {

  render() {
    const isMatchLast = window.location.href.split( '/' );
    const lastmatch = isMatchLast[4];
    const {HOMESLIDE, CONTENTHOMESLIDE, LANG} = this.props;
    return (
      <section className="HomeSection" id={"content-" + this.props.IndexID}>
        <div className="InnerContentReference">
        <ReactTransitionGroup>
          {(CONTENTHOMESLIDE.contentSlide >= 1) && <Title key="TitleReferences" LANG={LANG} />}
          {(CONTENTHOMESLIDE.contentSlide >= 1) && <SliderIndexProjects key="SliderIndex" />}
          </ReactTransitionGroup>
        </div>
      </section>
    );
  }
}


class Title extends React.Component {

  componentDidMount()
  {

  }

  componentDidEnter(callback)
{
  TweenMax.set(".svgSectionHeader.Licenses",{opacity:0, scale:0.5});
  TweenMax.set("#content-References .title.White",{opacity:0, y:15});
  TweenMax.set("#content-References .ParagraphWhite",{opacity:0, y:15});
  TweenMax.to("#content-References .title.White",0.25,{opacity:1, y:0, delay:0.1, ease:Power1.easeOut});
  TweenMax.to("#content-References .ParagraphWhite",0.25,{opacity:1, y:0, delay:0.25, ease:Power1.easeOut, onComplete:callback});
  TweenMax.to(".svgSectionHeader.Licenses",0.25,{opacity:1,ease:Power1.easeOut,delay:0.25, scale:1});
}

componentWillLeave(callback)
{
  TweenMax.to(".svgSectionHeader.Licenses",0.25,{opacity:0,ease:Power1.easeOut});
  TweenMax.to("#content-References .title.White",0.25,{opacity:0, ease:Power1.easeOut});
  TweenMax.to("#content-References .ParagraphWhite",0.25,{opacity:0,ease:Power1.easeOut, onComplete:callback});
}

  shouldComponentUpdate(prevProps)
  {
    return this.props.LANG != prevProps.LANG ? true : false;
  }

  render() {
    return (
      <React.Fragment>
                <div className="IconSectionHeader">
        <svg className="svgSectionHeader Licenses" viewBox="0 0 137 138">
        <defs>
    <linearGradient id="linear-gradientLicenses" x1="68.61" y1="137.469" x2="68.61" y2="-0.094" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#0da6ff"/>
      <stop offset="1" stopColor="#00c882"/>
    </linearGradient>
  </defs>
  <path className="icoLicenses" d="M68.612-.107l68.7,68.786-68.7,68.786-68.7-68.786Z"/>
  <path className="icoLicensesWhite" d="M90.6,38.4c-3.5,0-6.4,2.9-6.4,6.4c0,1.1,0.3,2.1,0.8,3.1L74.4,58.4c-1.4-1.1-3.3-1.8-5.2-1.8
		c-2,0-3.8,0.7-5.2,1.8l-8.2-8.2c0.4-0.6,0.6-1.4,0.6-2.2c0-2.4-1.9-4.3-4.3-4.3s-4.3,1.9-4.3,4.3c0,2.4,1.9,4.3,4.3,4.3
		c0.8,0,1.5-0.2,2.2-0.6l8.2,8.2c-1.1,1.5-1.8,3.3-1.8,5.2c0,2,0.7,3.8,1.8,5.2L48.9,83.9c-1.1-1-2.6-1.7-4.3-1.7
		c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4c0-1.1-0.3-2.1-0.8-3.1l13.7-13.7c1.2,0.9,2.6,1.5,4.2,1.7v10.9
		c-3,0.5-5.3,3.1-5.3,6.3c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4c0-3.2-2.3-5.8-5.3-6.3V73.6c1.6-0.2,3-0.8,4.2-1.7l8.2,8.2
		c-0.4,0.6-0.6,1.4-0.6,2.2c0,2.4,1.9,4.3,4.3,4.3c2.4,0,4.3-1.9,4.3-4.3c0-2.4-1.9-4.3-4.3-4.3c-0.8,0-1.5,0.2-2.2,0.6l-8.2-8.2
		c1.1-1.5,1.8-3.3,1.8-5.2c0-2-0.7-3.8-1.8-5.2l10.3-10.3c1.1,1,2.6,1.7,4.3,1.7c3.5,0,6.4-2.9,6.4-6.4C97,41.3,94.1,38.4,90.6,38.4
		z M49.9,48c0-1.2,1-2.1,2.1-2.1c1.2,0,2.1,1,2.1,2.1c0,1.2-1,2.1-2.1,2.1C50.9,50.2,49.9,49.2,49.9,48z M44.6,93
		c-2.4,0-4.3-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3s4.3,1.9,4.3,4.3C48.9,91,46.9,93,44.6,93z M73.5,90.8c0,2.4-1.9,4.3-4.3,4.3
		c-2.4,0-4.3-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3C71.5,86.5,73.5,88.5,73.5,90.8z M69.2,71.6c-3.5,0-6.4-2.9-6.4-6.4
		c0-3.5,2.9-6.4,6.4-6.4c3.5,0,6.4,2.9,6.4,6.4C75.6,68.7,72.7,71.6,69.2,71.6z M88.4,82.3c0,1.2-1,2.1-2.1,2.1s-2.1-1-2.1-2.1
		c0-1.2,1-2.1,2.1-2.1S88.4,81.1,88.4,82.3z M90.6,49.1c-2.4,0-4.3-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3c2.4,0,4.3,1.9,4.3,4.3
		C94.9,47.2,92.9,49.1,90.6,49.1z"/>
          </svg>
        </div>
        <div className="title White">
          {store.getState().LANG.JsonLang.Home.SectionProject.Title}
        </div>
        <div className="ParagraphWhite">
          {store
            .getState()
            .LANG.JsonLang.Home.SectionProject.Paraph.map(paraph => (
              <span key={paraph.txt}>
                <div dangerouslySetInnerHTML={{ __html: paraph.txt }} />
              </span>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(SectionProject);
