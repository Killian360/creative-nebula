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
    this.state = {button1: "activated", button2:"activated", button3:"activated"};
    this.toogle1 = store.getState().NavCategoryButton.button1;
    this.toogle2 = store.getState().NavCategoryButton.button2;
    this.toogle3 = store.getState().NavCategoryButton.button3;
  }

componentDidMount()
{
  // store.getState().NavCategoryButton.button1 === true ? (this.setState({button1:"activated"})) : (this.setState({button1:"desactivated"}))
  // store.getState().NavCategoryButton.button2 === true ? (this.setState({button2:"activated"})) : (this.setState({button2:"desactivated"}))
  // store.getState().NavCategoryButton.button3 === true ? (this.setState({button3:"activated"})) : (this.setState({button3:"desactivated"}))
  console.log(this.state);
}

static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.NavCategoryButton !== prevState.NavCategoryButton)
  {
      if (store.getState().NavCategoryButton.button1 === false && store.getState().NavCategoryButton.button2 === false && store.getState().NavCategoryButton.button3 === false)
      {
        return {button1:"desactivated",button2:"desactivated", button3:"desactivated"}
      } else if (store.getState().NavCategoryButton.button1 === false && store.getState().NavCategoryButton.button2 === false)
      {
        return {button1:"desactivated", button2:"desactivated"}
      } else if (store.getState().NavCategoryButton.button1 === false && store.getState().NavCategoryButton.button3 === false)
      {
        return {button1:"desactivated", button3:"desactivated"}
      }  else if (store.getState().NavCategoryButton.button2 === false && store.getState().NavCategoryButton.button3 === false)
      {
        return {button2:"desactivated", button3:"desactivated"}
      }   else if (store.getState().NavCategoryButton.button2 === false)
      {
        return {button2:"desactivated"}
      }   else if (store.getState().NavCategoryButton.button1 === false)
      {
        return {button1:"desactivated"}
      }    else if (store.getState().NavCategoryButton.button3 === false)
      {
        return {button3:"desactivated"}
      } 
  }
  return null;
}

shouldComponentUpdate(prevProps)
{
  return this.props.NavCategory != prevProps.NavCategory ? true : false;
}

Toogle1(type) {
  this.toogle1 = !this.toogle1;

  let Btn = document.getElementsByClassName("NavBtn");
  let {toogle1, toogle2, toogle3} = this;


  if (toogle1=== false && toogle2 === false && toogle3 === false)
  {
    toogle1=true
  } else if (toogle1 === false)
  {
    store.dispatch({type: 'ToogleBtn1', state:toogle1})
    store.dispatch({type: 'REMOVE_CAT', cat:type })
  } else if (toogle1 === true && (toogle2 === true || toogle3 === true)) {
    store.dispatch({type: 'ToogleBtn1', state:toogle1})
    store.dispatch({type: 'ADD_CAT', cat:type })
  }      

      TweenMax.set(Btn, {pointerEvents: 'none'});
      TweenMax.set(Btn,{pointerEvents: 'auto', delay:0.4});
      store.getState().NavCategoryButton.button1 === true ? (this.setState({...this.state, button1:"activated"})) : (this.setState({...this.state, button1:"desactivated"}))
}

 Toogle2(type) {

   this.toogle2 = !this.toogle2;

   let Btn = document.getElementsByClassName("NavBtn");
   let {toogle1, toogle2, toogle3} = this;

   if (toogle1=== false && toogle2 === false && toogle3 === false)
   {
     toogle2=true
   } else if (toogle2 === false)
   {
     store.dispatch({type: 'ToogleBtn2', state:toogle2})
     store.dispatch({type: 'REMOVE_CAT', cat:type })
   } else if (toogle2 === true && (toogle1 === true || toogle3 === true)) {
     store.dispatch({type: 'ToogleBtn2', state:toogle2})
     store.dispatch({type: 'ADD_CAT', cat:type })
   }   

   TweenMax.set(Btn, {pointerEvents: 'none'});
   TweenMax.set(Btn,{pointerEvents: 'auto', delay:0.4});
   store.getState().NavCategoryButton.button2 === true ? (this.setState({...this.state, button2:"activated"})) : (this.setState({...this.state, button2:"desactivated"}))
}

Toogle3(type) {

  this.toogle3 = !this.toogle3;

  let Btn = document.getElementsByClassName("NavBtn");
  let {toogle1, toogle2, toogle3} = this;

  if (toogle1=== false && toogle2 === false && toogle3 === false)
  {
    toogle3=true
  } else if (toogle3 === false)
  {
    store.dispatch({type: 'ToogleBtn3', state:toogle3})
    store.dispatch({type: 'REMOVE_CAT', cat:type })
  } else if (toogle3 === true && (toogle1 === true || toogle2 === true)) {
    store.dispatch({type: 'ToogleBtn3', state:toogle3})
    store.dispatch({type: 'ADD_CAT', cat:type })
  }     

  TweenMax.set(Btn, {pointerEvents: 'none'});
  TweenMax.set(Btn,{pointerEvents: 'auto', delay:0.4});
  store.getState().NavCategoryButton.button3 === true ? (this.setState({...this.state, button3:"activated"})) : (this.setState({...this.state, button3:"desactivated"}))
}

  render() {

    return (
      <nav className="NavUL">
       <div className="filterCat">
        <li className={this.state.button1} ><div className="NavBtn" onClick={() => this.Toogle1("display")}>{svgCode()}<span className="CatTxt">{store.getState().LANG.JsonLang.menu.cat1}</span></div><div className="bgCat"></div></li>
        <li className={this.state.button2}><div className="NavBtn"  onClick={() => this.Toogle2("webdesign")}>{svgWeb()}<span className="CatTxt">{store.getState().LANG.JsonLang.menu.cat2}</span></div><div className="bgCat"></div></li>
        <li className={this.state.button3}><div className="NavBtn"  onClick={() => this.Toogle3("newsletter")}>{svgNews()}<span className="CatTxt">{store.getState().LANG.JsonLang.menu.cat3}</span></div><div className="bgCat"></div></li>
      </div>
      </nav>
  )
  }
}

const svgCode = () => (
  <svg className="svgCat" x="0px" y="0px" width="10%" viewBox="0 0 522.468 522.469">
		<path d="M325.762,70.513l-17.706-4.854c-2.279-0.76-4.524-0.521-6.707,0.715c-2.19,1.237-3.669,3.094-4.429,5.568L190.426,440.53    c-0.76,2.475-0.522,4.809,0.715,6.995c1.237,2.19,3.09,3.665,5.568,4.425l17.701,4.856c2.284,0.766,4.521,0.526,6.71-0.712    c2.19-1.243,3.666-3.094,4.425-5.564L332.042,81.936c0.759-2.474,0.523-4.808-0.716-6.999    C330.088,72.747,328.237,71.272,325.762,70.513z" fill="#FFFFFF"/>
		<path d="M166.167,142.465c0-2.474-0.953-4.665-2.856-6.567l-14.277-14.276c-1.903-1.903-4.093-2.857-6.567-2.857    s-4.665,0.955-6.567,2.857L2.856,254.666C0.95,256.569,0,258.759,0,261.233c0,2.474,0.953,4.664,2.856,6.566l133.043,133.044    c1.902,1.906,4.089,2.854,6.567,2.854s4.665-0.951,6.567-2.854l14.277-14.268c1.903-1.902,2.856-4.093,2.856-6.57    c0-2.471-0.953-4.661-2.856-6.563L51.107,261.233l112.204-112.201C165.217,147.13,166.167,144.939,166.167,142.465z" fill="#FFFFFF"/>
		<path d="M519.614,254.663L386.567,121.619c-1.902-1.902-4.093-2.857-6.563-2.857c-2.478,0-4.661,0.955-6.57,2.857l-14.271,14.275    c-1.902,1.903-2.851,4.09-2.851,6.567s0.948,4.665,2.851,6.567l112.206,112.204L359.163,373.442    c-1.902,1.902-2.851,4.093-2.851,6.563c0,2.478,0.948,4.668,2.851,6.57l14.271,14.268c1.909,1.906,4.093,2.854,6.57,2.854    c2.471,0,4.661-0.951,6.563-2.854L519.614,267.8c1.903-1.902,2.854-4.096,2.854-6.57    C522.468,258.755,521.517,256.565,519.614,254.663z" fill="#FFFFFF"/>
</svg> 
)

const svgWeb = () => (
<svg className="svgCat" x="0px" y="0px" viewBox="0 0 56 56" width="10%">
	<path d="M0,14.5v39h56v-39H0z M54,51.5H2v-35h52V51.5z" fill="#FFFFFF"/>
	<path d="M3,12.5h50c0.552,0,1-0.448,1-1s-0.448-1-1-1H3c-0.552,0-1,0.448-1,1S2.448,12.5,3,12.5z" fill="#FFFFFF"/>
	<path d="M6,8.5h44c0.552,0,1-0.448,1-1s-0.448-1-1-1H6c-0.552,0-1,0.448-1,1S5.448,8.5,6,8.5z" fill="#FFFFFF"/>
	<path d="M9,4.5h38c0.552,0,1-0.448,1-1s-0.448-1-1-1H9c-0.552,0-1,0.448-1,1S8.448,4.5,9,4.5z" fill="#FFFFFF"/>
</svg>
)

const svgNews = () => (
  <svg className="svgCat" x="0px" y="0px" viewBox="0 0 485.213 485.212" width="10%">
	<path d="M242.607,252.969l242.604,232.243H0.001L242.607,252.969z M242.607,0L0.001,181.955v261.263l165.931-158.854   L42.884,187.701L242.607,37.906l199.728,149.795l-123.057,96.692l165.934,158.854V181.955L242.607,0z" fill="#FFFFFF"/>
  </svg>
  )


export default connect(mapStateToProps,mapDispatchToProps)(NavCategories)
