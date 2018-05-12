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
    console.log(CONTENTHOMESLIDE);
    return (
      <section className="HomeSection" id={"content-" + this.props.IndexID}>
        <div className="InnerContentWork">
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
  TweenMax.set(".title.White",{opacity:0, y:15});
  TweenMax.set(".ParagraphWhite",{opacity:0, y:15});
  TweenMax.to(".title.White",0.25,{opacity:1, y:0, delay:0.15, ease:Power1.easeOut});
  TweenMax.to(".ParagraphWhite",0.25,{opacity:1, y:0, delay:0.25, ease:Power1.easeOut, onComplete:callback});
  console.log('mounting')
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
