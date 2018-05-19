import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
import { TweenMax, Power1 } from "gsap";

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
          <Title key="TitleTechnologies" LANG={LANG} />
          <Content LANG={LANG} />
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
  TweenMax.set(".title.White",{opacity:0, y:15});
  TweenMax.set(".ParagraphWhite",{opacity:0, y:15});
  TweenMax.to(".title.White",0.25,{opacity:1, y:0, delay:0.1, ease:Power1.easeOut});
  TweenMax.to(".ParagraphWhite",0.25,{opacity:1, y:0, delay:0.1, ease:Power1.easeOut, onComplete:callback});
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
