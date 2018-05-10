import React from "react";
import * as PIXI from 'pixi.js';
import {TweenMax} from "gsap";
import {store} from '../../../reducers/combinereducers.js';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    WEB_GL : state.WEB_GL,
    HOMESLIDE: state.HOMESLIDE,
    Navpanel: state.Navpanel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tooglewebglon : () => dispatch({
      type : 'TOOGLEWEBGLON'
    })
  }
}


class WebGLHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webglkill: false
    };
    this.killWebgl = this.killWebgl.bind(this);
    this.CreateWebgl = this.CreateWebgl.bind(this);
    this.Destroy = this.Destroy.bind(this);
    this.state = {Renderer:null, AppID: null};
  }

componentWillUnmount()
{
  if (this.state.AppID !== null)
   {
  var appTarget = this.state.AppID;
  var appRenderer = this.state.Renderer;
  appTarget.destroy();
  appRenderer.destroy();
  this.setState({Renderer:null, AppID: null});
}
}

killWebgl()
{
  if (this.state.AppID !== null)
   {
     const canvas = document.getElementById("home-maincanvas");
     TweenMax.to(canvas, 0.5, {opacity:0, onComplete:this.Destroy});
}
}

Destroy()
{
  var appTarget = this.state.AppID;
  var appRenderer = this.state.Renderer;
  var canvasWrapper = document.getElementById("home-maincanvas");
   if (canvasWrapper)
   {
     canvasWrapper.removeChild(canvasWrapper.firstChild);
   }
   appTarget.destroy();
   appRenderer.destroy();
   this.setState({Renderer:null, AppID: null});
}

componentDidUpdate(prevProps)
{
  const appTarget = this.state.AppID;
  (this.props.HOMESLIDE.slide !==0 && this.props.WEB_GL === true) || (prevProps.Navpanel !== this.props.Navpanel) && (this.props.Navpanel === true && this.props.WEB_GL === true && this.props.HOMESLIDE.slide === 0) ? appTarget.stop() :  appTarget.start(); 
}


CreateWebgl()
{
  const canvas = document.getElementById("home-maincanvas");
  TweenMax.set(canvas, {opacity:0});
  if (store.getState().WEB_GL === false) {
  } else {
  var rendererOptions = {
  antialiasing: false,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
  }
  TweenMax.to(canvas, 0.5, {opacity:0.85});
}


  const renderer = PIXI.autoDetectRenderer(1920, 1080, rendererOptions);
  const app = new PIXI.Application(1920, 1080, rendererOptions);
  const displacementSprite = new PIXI.Sprite.fromImage("/img/webgl2/displacement22.jpg");
  const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  const Divcontainer = document.getElementById("home-maincanvas");
  const container = new PIXI.Container();
  const ratio = Math.min(window.innerWidth/800, window.innerHeight/600);

  let cloud = [];
  let p = 0;
  let Color = ["0x0f347d", "0x24c4d2", "0x21a0db","0x610bef","0x610bef","0x0b5bef"]

  this.setState({Renderer:renderer, AppID: app});

  Divcontainer.appendChild(app.view);

  app.view.style.width = '100vw';
  app.view.style.height = '100vh';

  app.stage.addChild(container);

  displacementSprite.anchor.set(0.5,0.5);

  app.stage.addChild(displacementSprite);
  container.filters = [displacementFilter];

  displacementFilter.scale.x = 100*ratio;
  displacementFilter.scale.y = 100*ratio;

  displacementSprite.width=1920;
  displacementSprite.height=1080;

  displacementSprite.x = app.renderer.width/2;
  displacementSprite.y = app.renderer.height/2;

  // create an array to store all the sprites

for (var i = 0; i < 15 ; i++) {

  cloud[i] = PIXI.Sprite.fromImage('/img/webgl2/image.png');
  cloud[i].tint = Color[p];
  p++;

 if (p > Color.length)
 {
   p = 0;
 }

      cloud[i].alpha = Math.floor(Math.random() * 0.1) + 0.6 ;
      cloud[i].anchor.set(0.5);
      cloud[i].scale.set(2 + Math.random() * 0.2);

      // scatter them all
      cloud[i].x = Math.random() * app.renderer.width;
      cloud[i].y = Math.random() * app.renderer.height;

      // create a random direction in radians
      cloud[i].direction = Math.random() * Math.PI * 0.5;

      // this number will be used to modify the direction of the sprite over time
      cloud[i].turningSpeed = Math.random() - 0.01;

      // create a random speed between 0 - 2, and these maggots are slooww
      cloud[i].speed = 0;

      cloud[i].offset = Math.random() * 100;

      container.addChild(cloud[i]);
}

      app.ticker.add(() => {
        for (var p = 0; p < cloud.length; p++) {
            var cloudToAnimate = cloud[p];
            cloudToAnimate.direction += cloudToAnimate.turningSpeed * 0.01;
            cloudToAnimate.x += Math.sin(cloudToAnimate.direction) * (cloudToAnimate.speed * cloudToAnimate.scale.y);
            cloudToAnimate.y += Math.cos(cloudToAnimate.direction) * (cloudToAnimate.speed * cloudToAnimate.scale.y);
            cloudToAnimate.rotation = -cloudToAnimate.direction + 0.5;
      }
});
}

componentDidMount()
{
  if (this.props.WEB_GL === true)
  {
    this.CreateWebgl();
  }
}

render()
{
  return(
    <React.Fragment>
    <div id="home-maincanvas"></div>
  </React.Fragment>
  );
}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebGLHome)
