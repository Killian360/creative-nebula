import React from "react";
import * as PIXI from 'pixi.js';
import {TweenMax} from "gsap";
import {store} from '../../reducers/combinereducers.js';
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    WEB_GL : state.WEB_GL
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tooglewebglon : () => dispatch({
      type : 'TOOGLEWEBGLON'
    })
  }
}


class WebGLProject extends React.Component {

  constructor(props) {
    super(props);
    this.divId = this.props.divId;
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

shouldComponentUpdate(nextProps)
{
  if (nextProps.WEB_GL !== this.props.WEB_GL)
  {
    return true;
  }
  return false;
}

componentDidUpdate(prevProps)
{
  if (prevProps.WEB_GL !== this.props.WEB_GL)
  {
    if (this.props.WEB_GL === false)
  {
    this.killWebgl();
  } else if (this.props.WEB_GL === true)
  {
    this.CreateWebgl();
  }
}
}

killWebgl()
{
  if (this.state.AppID !== null)
   {
     const canvas = document.getElementById(this.divId);
     TweenMax.to(canvas, 0.5, {opacity:0, onComplete:this.Destroy});
}
}

Destroy()
{
  var appTarget = this.state.AppID;
  var appRenderer = this.state.Renderer;
  var canvasWrapper = document.getElementById(this.divId);
    canvasWrapper.removeChild(canvasWrapper.firstChild);
   appTarget.destroy();
   appRenderer.destroy();
   this.setState({Renderer:null, AppID: null});
}


CreateWebgl()
{
  var canvas = document.getElementById(this.divId);
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
  var renderer = PIXI.autoDetectRenderer(1920, 1080, rendererOptions);
  var app = new PIXI.Application(1920, 1080, rendererOptions);
  var container = document.getElementById(this.divId);
  this.setState({Renderer:renderer, AppID: app});
  container.appendChild(app.view);
  app.view.style.width = '100vw';
  app.view.style.height = '100vh';
  var sprites = new PIXI.Container();

  app.stage.addChild(sprites);

  var displacementSprite = PIXI.Sprite.fromImage("/img/webgl2/displacement2.jpg");
  var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

  displacementSprite.anchor.set(0.5,0.5);

  app.stage.addChild(displacementSprite);
  sprites.filters = [displacementFilter];

  var ratio = Math.min(window.innerWidth/800, window.innerHeight/600);
  displacementFilter.scale.x = 100*ratio;
  displacementFilter.scale.y = 100*ratio;
  displacementSprite.width=1920;
  displacementSprite.height=1080;
  displacementSprite.x = app.renderer.width/2;
  displacementSprite.y = app.renderer.height/2;

  // create an array to store all the sprites
  var maggots = [];
  var coloration = 1;

  for (var i = 0; i < 20 ; i++) {

    // create a new Sprite
    var dude = PIXI.Sprite.fromImage('/img/webgl2/image.png');
    if (coloration === 1)
    {
      dude.tint = 0x060416;
        coloration++;
    } else if (coloration === 2)
      {
        dude.tint = 0x4524d2;
        coloration++;
      } else if (coloration === 3)
        {
          dude.tint = 0x24105f;
          coloration++;
        } else if (coloration === 4)
          {
            dude.tint = 0x610bef;
            coloration++;
          } else if (coloration === 5)
            {
              dude.tint = 0x610bef;
              coloration++;
            } else if (coloration === 6)
              {
                dude.tint = 0x0b5bef;
                coloration = 1;
              }
   // change color of the sprite
    dude.alpha = Math.floor(Math.random() * 0.1) + 0.6 ;

    // set the anchor point so the texture is centerd on the sprite
    dude.anchor.set(0.5);

    // different maggots, different sizes
    dude.scale.set(2 + Math.random() * 0.2);

    // scatter them all
    dude.x = Math.random() * app.renderer.width;
    dude.y = Math.random() * app.renderer.height;

    // create a random direction in radians
    dude.direction = Math.random() * Math.PI * 0.5;

    // this number will be used to modify the direction of the sprite over time
    dude.turningSpeed = Math.random() - 0.01;

    // create a random speed between 0 - 2, and these maggots are slooww
    dude.speed = 0;

    dude.offset = Math.random() * 100;

    // finally we push the dude into the maggots array so it it can be easily accessed later
    maggots.push(dude);

    sprites.addChild(dude);
  }

  app.ticker.add(function() {
    // iterate through the sprites and update their position

    for (var p = 0; p < maggots.length; p++) {
        var dude = maggots[p];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + 0.5;

        // wrap the maggots
    }

    // increment the ticker
  });
}
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
    <div>
    <div id={this.divId}></div>
  </div>
  );
}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebGLProject)
