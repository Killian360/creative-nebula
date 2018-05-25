import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
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
        <div className="InnerContentClients">
        <ReactTransitionGroup>
          {(CONTENTHOMESLIDE.contentSlide >= 2) && <Title key="TitleClients" LANG={LANG} />}
          {(CONTENTHOMESLIDE.contentSlide >= 2) && <Content LANG={LANG} />}
          </ReactTransitionGroup>
        </div>
      </section>
    );
  }
}

class Content extends React.Component {

  shouldComponentUpdate(prevProps)
  {
    return this.props.LANG != prevProps.LANG ? true : false;
  }

  render() {
    return (
      <React.Fragment>
        <div className="ContentClient">
          {store
            .getState()
            .LANG.JsonLang.Home.SectionClient.Clients.map((content, index) => (
              <div className="ClientContainer" key={index}>
              <div className="ClientIcon" style={{backgroundImage: "url(" + content.Icon + ")"}}></div>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}


class Title extends React.Component {

  componentDidEnter(callback)
{
  TweenMax.set(".ClientContainer",{opacity:0,scale:0.5, y:20});
  TweenMax.set(".svgSectionHeader.Clients",{opacity:0, scale:0.5});
  TweenMax.set("#content-Clients .title.White",{opacity:0, y:15});
  TweenMax.set("#content-Clients .ParagraphWhite",{opacity:0, y:15});

  TweenMax.to("#content-Clients .title.White",0.25,{opacity:1, y:0, delay:0.1, ease:Power1.easeOut});
  TweenMax.to(".svgSectionHeader.Clients",0.25,{opacity:1,ease:Power1.easeOut,delay:0.25, scale:1});
  TweenMax.to("#content-Clients .ParagraphWhite",0.25,{opacity:1, y:0, delay:0.25, ease:Power1.easeOut, onComplete:callback});
  TweenMax.staggerTo(".ClientContainer",0.25,{opacity:1, y:0, scale:1, delay:0.1, ease:Power1.easeOut},0.075);
}

componentWillLeave(callback)
{
  TweenMax.to(".svgSectionHeader.Clients",0.25,{opacity:0,ease:Power1.easeOut});
  TweenMax.to("#content-Clients .title.White",0.25,{opacity:0, ease:Power1.easeOut});
  TweenMax.to("#content-Clients .ParagraphWhite",0.25,{opacity:0,ease:Power1.easeOut, onComplete:callback});
}

  shouldComponentUpdate(prevProps)
  {
    return this.props.LANG != prevProps.LANG ? true : false;
  }

  render() {
    return (
      <React.Fragment>
                                <div className="IconSectionHeader">
        <svg className="svgSectionHeader Clients" viewBox="0 0 137 138">
        <defs>
    <linearGradient id="linear-gradientClients" x1="68.61" y1="137.469" x2="68.61" y2="-0.094" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#5b33ff"/>
      <stop offset="1" stopColor="#f53004"/>
    </linearGradient>
  </defs>
  <path className="icoClients" d="M68.612-.107l68.7,68.786-68.7,68.786-68.7-68.786Z"/>
  <path className="icoClientsWhite" d="M94,63c-2,0-3.8,1.4-4.3,3.3H73c-0.1-0.7-0.4-1.4-0.7-2.1l11.5-11.5c0.4,0.2,0.9,0.3,1.4,0.3
				c1.8,0,3.3-1.5,3.3-3.3c0-1.8-1.5-3.3-3.3-3.3s-3.3,1.5-3.3,3.3c0,0.5,0.1,1,0.3,1.4L70.9,62.6c-0.9-0.8-2.1-1.4-3.3-1.6V45.2
				c1.9-0.5,3.3-2.2,3.3-4.3c0-2.4-2-4.4-4.4-4.4c-2.4,0-4.4,2-4.4,4.4c0,2.1,1.4,3.8,3.3,4.3v15.7c-1,0.2-1.9,0.6-2.7,1.1
				L51.8,51.2c0.2-0.4,0.3-0.9,0.3-1.4c0-1.8-1.5-3.3-3.3-3.3c-1.8,0-3.3,1.5-3.3,3.3c0,1.8,1.5,3.3,3.3,3.3c0.5,0,1-0.1,1.4-0.3
				l10.8,10.8c-0.6,0.8-1,1.7-1.1,2.7H44.2C43.7,64.4,42,63,40,63c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4c2,0,3.8-1.4,4.3-3.3
				h15.7c0.2,1.3,0.8,2.4,1.6,3.3L50.2,83.2c-0.4-0.2-0.9-0.3-1.4-0.3c-1.8,0-3.3,1.5-3.3,3.3s1.5,3.3,3.3,3.3
				c1.8,0,3.3-1.5,3.3-3.3c0-0.5-0.1-1-0.3-1.4l11.5-11.5c0.6,0.3,1.3,0.6,2.1,0.7v16.8C63.4,91.3,62,93,62,95c0,2.4,2,4.4,4.4,4.4
				c2.4,0,4.4-2,4.4-4.4c0-2.1-1.4-3.8-3.3-4.3V74c1-0.2,1.9-0.6,2.7-1.1l11.9,11.9c-0.2,0.4-0.3,0.9-0.3,1.4c0,1.8,1.5,3.3,3.3,3.3
				c1.8,0,3.3-1.5,3.3-3.3s-1.5-3.3-3.3-3.3c-0.5,0-1,0.1-1.4,0.3L71.8,71.3c0.6-0.8,1-1.7,1.1-2.7h16.8c0.5,1.9,2.2,3.3,4.3,3.3
				c2.4,0,4.4-2,4.4-4.4C98.4,65,96.5,63,94,63z M85.2,48.7c0.6,0,1.1,0.5,1.1,1.1c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1
				C84.1,49.2,84.6,48.7,85.2,48.7z M48.8,50.9c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1
				C49.9,50.4,49.4,50.9,48.8,50.9z M40,69.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S41.2,69.7,40,69.7z M48.8,87.3
				c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1S49.4,87.3,48.8,87.3z M64.2,41c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2
				c0,1.2-1,2.2-2.2,2.2S64.2,42.2,64.2,41z M68.7,95c0,1.2-1,2.2-2.2,2.2s-2.2-1-2.2-2.2s1-2.2,2.2-2.2S68.7,93.8,68.7,95z
				 M66.4,71.9c-2.4,0-4.4-2-4.4-4.4c0-1,0.4-1.9,0.9-2.7l0.8-0.8c0.7-0.6,1.7-0.9,2.7-0.9c2.4,0,4.4,2,4.4,4.4
				C70.9,69.9,68.9,71.9,66.4,71.9z M85.2,85.1c0.6,0,1.1,0.5,1.1,1.1s-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1S84.6,85.1,85.2,85.1
				z M94,69.7c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S95.2,69.7,94,69.7z"/>
          </svg>
        </div>
        <div className="title White">
          {store.getState().LANG.JsonLang.Home.SectionClient.Title}
        </div>
        <div className="ParagraphWhite">
        {store
            .getState()
            .LANG.JsonLang.Home.SectionClient.Paraph.map(paraph => (
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
