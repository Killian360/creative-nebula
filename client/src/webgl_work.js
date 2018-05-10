import React from "react";
import * as PIXI from 'pixi.js';
import {TweenMax} from "gsap";
import { connect } from 'react-redux'
import {store} from './reducers/combinereducers.js';

class WebGL_Work extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      webglkill: false
    };
  }

componentWillUnmount ()
{
if (this.props.WEB_GL === true)
 {
    var appTarget = this.state.AppID;
    var appRenderer = this.state.Renderer;
    setTimeout(function(){ appTarget.destroy(); appRenderer.destroy(); }, 500);
  }
}

componentDidUpdate(prevProps)
{
  var appTarget = this.state.AppID;
  if (prevProps.WEB_GL !== this.props.WEB_GL)
  {
    if (this.props.WEB_GL === false)
    {
     appTarget.stop();
  } else if (this.props.WEB_GL === true)
  {
    if (appTarget !== undefined)
{
  appTarget.start();
} else {
    this.CreateWebgl();
    }
  }
}
}


CreateWebgl()
{
  var canvas = document.getElementById("panel-maincanvas");
  TweenMax.set(canvas, {opacity:0});
  if (store.getState().WEB_GL === false) {
  } else {
  var rendererOptions = {
  antialiasing: false,
  transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
  }
  TweenMax.to(canvas, 0.5, {opacity:0.5});
  var renderer = PIXI.autoDetectRenderer(1920, 1080, rendererOptions);
  var app = new PIXI.Application(1920, 1080, rendererOptions);
  var container = document.getElementById("panel-maincanvas");
  this.setState({Renderer:renderer, AppID: app});
  container.appendChild(app.view);
  app.view.style.width = '100vw';
  app.view.style.height = '100vh';
  var sprites = new PIXI.Container();

  app.stage.addChild(sprites);

  var displacementSprite = PIXI.Sprite.fromImage("/img/webgl2/displacement-work.jpg");
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
  var particles = [];
  var coloration = 1;

  for (var i = 0; i <30 ; i++) {

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
              dude.tint = 0x0bd7ef;
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
    dude.scale.set(2 + Math.random() * 0.15);

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


  var tick;

  app.ticker.add(function() {
    // iterate through the sprites and update their position
    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        particle.direction += particle.turningSpeed * 0.01;
        particle.x += Math.sin(particle.direction) * (particle.speed * particle.scale.y);
        particle.y += Math.cos(particle.direction) * (particle.speed * particle.scale.y);

        // wrap the maggots
    }

    for (var p = 0; p < maggots.length; p++) {

        var dude = maggots[p];
        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
        dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
        dude.rotation = -dude.direction + 0.5;

        // wrap the maggots
    }

    // increment the ticker
    tick += 0.1;
  });
}
}

componentDidMount()
{
  this.CreateWebgl();
}


shouldComponentUpdate()
{
  return false;
}

render()
{
  return(
    <div>
      <div id="panel-maincanvas"></div>
  </div>
  );
}
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebGL_Work)
