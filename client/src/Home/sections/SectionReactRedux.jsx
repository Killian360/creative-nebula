import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
import { TweenMax, Power1 } from "gsap";

const duration = 300;

const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
  };

const mapStateToProps = state => {
    return {
      LANG: state.LANG
    };
  };
  
class SectionReactRedux extends React.Component {
    render() {    
        return (
            <section className="HomeSection" id={"content-" + this.props.IndexID}>
                    <div className="InnerContentWork">
            <span>LOLOLOLOLOL</span>
            </div>
          </section>
        )
    }
}

export default connect(mapStateToProps)(SectionReactRedux);
