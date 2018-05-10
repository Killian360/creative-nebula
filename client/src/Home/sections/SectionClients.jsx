import React from "react";
import { store } from "../../reducers/combinereducers.js";
import { connect } from "react-redux";
import SliderIndexProjects from './SliderIndexProjects/slider'

const mapStateToProps = state => {
  return {
    LANG: state.LANG
  };
};

class SectionClients extends React.PureComponent {

  render()
  {
    return(

  <section className="HomeSection" id={"content-"+this.props.IndexID}>
    <div className="InnerContentWork" >
    </div>
  </section>
)
}
}

export default connect(mapStateToProps)(SectionClients);
