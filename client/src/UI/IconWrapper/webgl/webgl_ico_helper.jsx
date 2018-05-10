import React from "react";
import * as PIXI from 'pixi.js';
import {TweenMax} from "gsap";
import { connect } from 'react-redux';
import particles from 'pixi-particles';

const mapStateToProps = state => {
  return {
    WEB_GL : state.WEB_GL,
    WEB_GL_Icon: state.WEB_GL_Icon
  }
}

class WebglIco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Renderer:null, AppID: null};
    this.CreateWebgl = this.CreateWebgl.bind(this);
  }

  componentDidMount()
{
    this.CreateWebgl();
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

  CreateWebgl()
{
    var canvas = document.getElementById(this.props.ID);
    TweenMax.set(canvas, {opacity:0});

    var rendererOptions = {
    antialiasing: false,
    transparent: true,
    resolution: window.devicePixelRatio,
    autoResize: true,
}
    let Size = ((window.innerWidth*0.4)*0.24)*2;
    TweenMax.to(canvas, 0.5, {opacity:0.85});

    var renderer = PIXI.autoDetectRenderer(Size, Size, rendererOptions);
    var app = new PIXI.Application(Size, Size, rendererOptions);

    var container = document.getElementById(this.props.ID);
    var containerwrapper = new PIXI.Container();

    this.setState({Renderer:renderer, AppID: app});

    app.view.style.position = 'absolute';
    app.view.style.left = '50%';
    app.view.style.top = '50%';
    app.view.style.transform = 'translate3d( -50%, -50%, 0 )';

    container.appendChild(app.view);
    app.stage.addChild(containerwrapper);
    // Create a new emitter
    containerwrapper.position.x = Size/2;
    containerwrapper.position.y = Size/2;

    var emitter = new PIXI.particles.Emitter(

    	containerwrapper,

    	[PIXI.Texture.fromImage('/img/webgl/ico/particle.png')],

      {
      	"alpha": {
      		"start": 1,
      		"end": 0
      	},
      	"scale": {
      		"start": .45,
      		"end": 0.01,
      		"minimumScaleMultiplier": 1
      	},
      	"color": {
      		"start": "#e4f9ff",
      		"end": "#3fcbff"
      	},
      	"speed": {
      		"start": 300,
      		"end": 5,
      		"minimumSpeedMultiplier": 0.5
      	},
      	"acceleration": {
      		"x": 0,
      		"y": 0
      	},
      	"maxSpeed": 0,
      	"startRotation": {
      		"min": 0,
      		"max": 360
      	},
      	"noRotation": false,
      	"rotationSpeed": {
      		"min": 0,
      		"max": 0
      	},
      	"lifetime": {
      		"min": 0.2,
      		"max": 1.5
      	},
      	"blendMode": "screen",
      	"frequency": 0.001,
      	"emitterLifetime": -1,
      	"maxParticles": 500,
      	"pos": {
      		"x": 0,
      		"y": 0
      	},
      	"addAtBack": false,
      	"spawnType": "point",
      	"spawnCircle": {
      		"x": 0,
      		"y": 0,
      		"r": 80
      	}
      }
    );
    var elapsed = Date.now();

    var update = function(){

    	requestAnimationFrame(update);

    	var now = Date.now();

    	emitter.update((now - elapsed) * 0.001);
    	elapsed = now;
    };

    emitter.emit = true;

    update();
  }

render() {
return(
  <div id={this.props.ID} className="Webgl_ico"></div>
)
}
}

export default connect(mapStateToProps)(WebglIco);
