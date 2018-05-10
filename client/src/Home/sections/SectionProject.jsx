import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
import SliderIndexProjects from "./SliderIndexProjects/slider";
import { TweenMax, Power1 } from "gsap";

const mapStateToProps = state => {
  return {
    LANG: state.LANG,
    HOMESLIDE: state.HOMESLIDE,
    CONTENTHOMESLIDE: state.CONTENTHOMESLIDE
  };
};

class SectionProject extends React.PureComponent {
  render() {

    const {HOMESLIDE, CONTENTHOMESLIDE, LANG} = this.props;

    return (
      <section className="HomeSection" id={"content-" + this.props.IndexID}>
        <div className="InnerContentWork">
          {(HOMESLIDE.slide === 2 && CONTENTHOMESLIDE.contentSlide>=0) && <Title LANG={LANG} />}
          {(HOMESLIDE.slide === 2 && CONTENTHOMESLIDE.contentSlide>=0) && <SliderIndexProjects />}
        </div>
      </section>
    );
  }
}


class Title extends React.Component {

  componentDidMount()
  {
    TweenMax.set(".title.White",{opacity:0, y:15});
    TweenMax.set(".ParagraphWhite",{opacity:0, y:15});
    TweenMax.to(".title.White",0.25,{opacity:1, y:0, delay:0.45, ease:Power1.easeOut});
    TweenMax.to(".ParagraphWhite",0.25,{opacity:1, y:0, delay:0.55, ease:Power1.easeOut});
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
              <span className="lolol" key={paraph.txt}>
                <div dangerouslySetInnerHTML={{ __html: paraph.txt }} />
              </span>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(SectionProject);
