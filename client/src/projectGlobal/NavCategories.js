import React from "react";

import './style.css';
import {store} from '../reducers/combinereducers.js'
import {connect} from 'react-redux';
import './navcategories.css';
import {
  TweenMax,
} from "gsap";

const mapStateToProps = state => {
return {NAVIGATION: state.NAVIGATION,NavCategoryButton:state.NavCategoryButton,LANG:state.LANG, NavCategory : state.NavCategory, NAVIGATIONhome: state.NAVIGATIONhome, DESKTOP: state.DESKTOP, NAVIGATIONshort: state.NAVIGATIONshort, HOMESLIDE: state.HOMESLIDE}
}

const mapDispatchToProps = dispatch => {
  return {
    REMOVE_CAT: () => dispatch({type: 'REMOVE_CAT'}),
    ADD_CAT: () => dispatch({type: 'ADD_CAT'})
  }
}

class NavCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {button1: "activated", button2:"activated"};
    this.toogle1 = store.getState().NavCategoryButton.button1;
    this.toogle2 = store.getState().NavCategoryButton.button2;
  }

componentDidMount()
{
  if (store.getState().NavCategoryButton.button1 === true)
  {
    this.setState({button1:"activated"});
  } else {
    this.setState({button1:"desactivated"});
  }
  if (store.getState().NavCategoryButton.button2 === true)
  {
    this.setState({button2:"activated"});
  } else {
    this.setState({button2:"desactivated"});
  }
}

static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.NavCategoryButton !== prevState.NavCategoryButton)
  {
      if (store.getState().NavCategoryButton.button1 === true && store.getState().NavCategoryButton.button2 === true)
      {
        return {button1:"activated",button2:"activated"}
      } else if (store.getState().NavCategoryButton.button1 === true && store.getState().NavCategoryButton.button2 === false)
      {
        return {button1:"activated", button2:"desactivated"}
      } else if (store.getState().NavCategoryButton.button1 === false && store.getState().NavCategoryButton.button2 === true)
      {
        return {button1:"desactivated", button2:"activated"}
      }
  }
  return null;
}

shouldComponentUpdate(nextState)
{
  return this.props.NavCategory !== nextState.NavCategory ? true : false;
}

Toogle1(type) {
  this.toogle1 = !this.toogle1;

  let Btn = document.getElementsByClassName("NavBtn");
  let {toogle1, toogle2} = this;

      (toogle1=== false && toogle2 === false) ? toogle1=true && (this.toogle1=!this.toogle1) : store.dispatch({type: 'ToogleBtn1', state:toogle1});
      toogle1 === false ? store.dispatch({type: 'REMOVE_CAT', cat:type }) : store.dispatch({type: 'ADD_CAT', cat:type });

      TweenMax.set(Btn, {pointerEvents: 'none'});
      TweenMax.set(Btn,{pointerEvents: 'auto', delay:0.4});
}

 Toogle2(type) {

   this.toogle2 = !this.toogle2;

   let Btn = document.getElementsByClassName("NavBtn");
   let {toogle1, toogle2} = this;

   (toogle1=== false && toogle2 === false) ? toogle2=true && (this.toogle2=!this.toogle2) : store.dispatch({type: 'ToogleBtn2', state:toogle2});
   (toogle2 === false) ? store.dispatch({type: 'REMOVE_CAT', cat:type }) : store.dispatch({type: 'ADD_CAT', cat:type });

   TweenMax.set(Btn, {pointerEvents: 'none'});
   TweenMax.set(Btn,{pointerEvents: 'auto', delay:0.4});
}

  render() {
    return (
      <nav className="NavUL">
       <div className="filterCat">
        <li className={this.state.button1} ><div className="NavBtn" onClick={() => this.Toogle1("display")}>{store.getState().LANG.JsonLang.menu.cat1}</div></li>
        <li className={this.state.button2}><div className="NavBtn"  onClick={() => this.Toogle2("webdesign")}>{store.getState().LANG.JsonLang.menu.cat2}</div></li>
      </div>
      </nav>
  )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavCategories)
