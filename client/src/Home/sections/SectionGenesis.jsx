import React from "react";
import { store } from "../../reducers/combinereducers.js";
import Button from "../../UI/button/Button";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    LANG: state.LANG
  };
};

class SectionGenesis extends React.Component {
  render() {
    const Text = store.getState().LANG.JsonLang.Home.SectionGenesis;
    return (
      <section id={"content-presentation"} className="GenesisContainer">
      <div className="contentWrapper">
        <div className="InnerContent">
          <div className="title Blue">
          <span className="TitleTransparent">{Text.TitleGenesis}</span>
          <span className="TitleAnimate welcome">{Text.TitleGenesis}</span>
          </div>
          <div className="ParagraphBlue">
            {Text.ParaphGenesis.map(paraph => (
                <span key={paraph.txt}>
                  <div
                    className="spanCenter"
                    dangerouslySetInnerHTML={{ __html: paraph.txt }}
                  />
                </span>
              ))}
          </div>
          <div className="ParagraphBtn">
          <div className="BtnContainerWelcome">
            <Button ID="btnGenesis" LinkUrl="/projects">
              {store.getState().LANG.JsonLang.Home.SectionGenesis.BtnMore}
            </Button>
            </div>
          </div>
        </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps)(SectionGenesis);
