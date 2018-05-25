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
  
class SectionReactRedux extends React.Component {
    render() {    
      const isMatchLast = window.location.href.split( '/' );
      const lastmatch = isMatchLast[4];
      const {HOMESLIDE, CONTENTHOMESLIDE, LANG} = this.props;

        return (
            <section className="HomeSection" id={"content-" + this.props.IndexID}>
                  <div className="contentWrapper">
                    <div className="InnerContentWork">
                    <ReactTransitionGroup>
                    {(CONTENTHOMESLIDE.contentSlide >= 0) && <Title key="TitleTechnologies" LANG={LANG} />}
                    {(CONTENTHOMESLIDE.contentSlide >= 0) && <Content LANG={LANG} />}
                      </ReactTransitionGroup> 
            </div>
            </div>
          </section>
        )
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
        <div className="ContentTechno">
          {store
            .getState()
            .LANG.JsonLang.Home.SectionTechno.Content.map(content => (
              <div className="TechnoContainer" key={content.Title}>
              <div className="TechnoIcon" style={{backgroundImage: "url(" + content.Icon + ")"}}></div>
              <div className="TechnoContent">
              <h1>
               {content.Title}
              </h1>
              <h2>
               {content.Desc}
              </h2>
              <h2>
              <span className="TechnoLink" dangerouslySetInnerHTML={{ __html: content.Link }} />
              </h2>
              </div>
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
  TweenMax.set(".TechnoContainer",{opacity:0, y:20});
  TweenMax.set(".svgSectionHeader",{opacity:0, scale:0.5});
  TweenMax.staggerTo(".TechnoContainer",0.25,{opacity:1, y:0, delay:0.25, ease:Power1.easeOut, onComplete:callback},0.1);
  TweenMax.to(".svgSectionHeader",0.25,{opacity:1,ease:Power1.easeOut,delay:0.25, scale:1});
}

componentWillLeave(callback)
{
  TweenMax.to(".title.White",0.25,{opacity:0, ease:Power1.easeOut});
  TweenMax.to(".ParagraphWhite",0.25,{opacity:0,ease:Power1.easeOut, onComplete:callback});
}

  shouldComponentUpdate(prevProps)
  {
    return this.props.LANG != prevProps.LANG ? true : false;
  }

  render() {
    return (
      <React.Fragment>
        <div className="IconSectionHeader">
        <svg className="svgSectionHeader" viewBox="0 0 137 138">
        <defs>
    <linearGradient id="linear-gradientTechno" x1="68.61" y1="137.469" x2="68.61" y2="-0.094" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#7c49eb"/>
      <stop offset="1" stopColor="#c11096"/>
    </linearGradient>
  </defs>
  <path className="icoTechno" d="M68.612-.107l68.7,68.786-68.7,68.786-68.7-68.786Z"/>
			<g className="icoTechnoWhite">
      <path  d="M91,70.4c-3.4,0-6.2,2.5-6.7,5.8h-4.7c-3.8,0-6.8,3.1-6.8,7V96H75V83.2c0-2.6,2-4.7,4.6-4.7h4.7
					c0.5,3.3,3.4,5.8,6.7,5.8c3.8,0,6.8-3.1,6.8-7S94.8,70.4,91,70.4z M91,82c-2.5,0-4.6-2.1-4.6-4.7s2-4.7,4.6-4.7s4.6,2.1,4.6,4.7
					S93.5,82,91,82z"/>
				<path  d="M60.2,52.9h-4.6c0-3.9-3.1-7-6.8-7S42,49,42,52.9s3.1,7,6.8,7c3,0,5.5-2,6.4-4.7h5c2.5,0,4.6,2.1,4.6,4.7
					V96h2.3V59.9C67.1,56,64,52.9,60.2,52.9z M48.8,57.5c-2.5,0-4.6-2.1-4.6-4.7s2-4.7,4.6-4.7c2.5,0,4.6,2.1,4.6,4.7
					S51.3,57.5,48.8,57.5z"/>
				<path  d="M52.2,70.4h-4.7c-0.5-3.3-3.4-5.8-6.7-5.8c-3.8,0-6.8,3.1-6.8,7s3.1,7,6.8,7c3.4,0,6.2-2.5,6.7-5.8h4.7
					c2.5,0,4.6,2.1,4.6,4.7V96h2.3V77.4C59.1,73.5,56,70.4,52.2,70.4z M40.8,76.2c-2.5,0-4.6-2.1-4.6-4.7s2-4.7,4.6-4.7
					c2.5,0,4.6,2.1,4.6,4.7S43.4,76.2,40.8,76.2z"/>
				<path d="M80.6,62.2h3.7c0.5,3.3,3.4,5.8,6.7,5.8c3.8,0,6.8-3.1,6.8-7s-3.1-7-6.8-7c-3.4,0-6.2,2.5-6.7,5.8h-3.7
					c-1.8,0-3.3-1.5-3.3-3.3V38.9h-2.3v17.6C75.1,59.7,77.5,62.2,80.6,62.2z M91,56.4c2.5,0,4.6,2.1,4.6,4.7c0,2.6-2,4.7-4.6,4.7
					s-4.6-2.1-4.6-4.7C86.4,58.5,88.5,56.4,91,56.4z"/>
    </g>
          </svg>
        </div>
        <div className="title White">
          {store.getState().LANG.JsonLang.Home.SectionTechno.Title}
        </div>
        <div className="ParagraphWhite">
          {store
            .getState()
            .LANG.JsonLang.Home.SectionTechno.Paraph.map(paraph => (
              <span key={paraph.txt}>
                <div dangerouslySetInnerHTML={{ __html: paraph.txt }} />
              </span>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(SectionReactRedux);
