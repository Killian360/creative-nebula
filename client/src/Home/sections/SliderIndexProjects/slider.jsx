import React from "react"
import Slider from "react-slick"
import { store } from "../../../reducers/combinereducers.js"
import "./style.css"
import { TweenMax, Power3, Power1} from "gsap";
import { withRouter } from "react-router";
import Tilt from 'react-tilt';


class SliderIndexProjects extends React.Component {

  constructor(props) {
    super(props);
    this.changeIndex = this.changeIndex.bind(this);
    this.changeIndexBefore = this.changeIndexBefore.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.TrackMouse = this.TrackMouse.bind(this);
      this.state = {
        showNbr:1
      }
  }

  componentDidMount()
  {
    TweenMax.set(".SliderWorkWrapper",{opacity:0, y:100});
    TweenMax.to(".SliderWorkWrapper",0.55,{opacity:1,y:0, delay:0.45, ease:Power3.easeOut});
    const wrapperWidth = document.getElementById('TransitionWrapper').getBoundingClientRect().width;
    const TransitionWrapper = document.getElementById('TransitionWrapper');

    TweenMax.set(TransitionWrapper,{height:wrapperWidth,display:'none'});
    TweenMax.set(TransitionWrapper,{scale:0, delay:0.1});
    
    TweenMax.set(".SliderLinkTagArrow",{x:-10});

    window.addEventListener("mousemove", this.TrackMouse);
  }

  TrackMouse(e)
  {
        this.MouseX = e.clientX;
        this.MouseY = e.clientY;
  }

  componentWillUnmount()
  {
    window.removeEventListener('mousemove', this.TrackMouse);
  }

  changeIndex()
  {
    TweenMax.to(".slick-slide",0.2,{opacity:0.2});
    TweenMax.to(".slick-active",0.2,{opacity:1});
  }

  changeIndexBefore()
  {
    TweenMax.set(".slick-slide",{opacity:1});
    TweenMax.to(".slick-active",0.15,{opacity:1});
  }

  shouldComponentUpdate()
  {
    return false;
  }

  handleclick(ID)
  {
    const TransitionWrapper = document.getElementById('TransitionWrapper');
    this.URL = ID;
  
    TweenMax.set(TransitionWrapper,{x:this.MouseX, y:this.MouseY,xPercent:'-50', yPercent:'-50', opacity:1,transformOrigin:'center center'})
    TweenMax.to(TransitionWrapper,0.25,{display:'block',scale:3,opacity:1, ease:Power1.easeIn});
  
    setTimeout(this.changeURL, 270);
  }

  changeURL(URL)
  {
    this.props.history.push('/projects/' + this.URL);
  }

  handleHover(ID)
  {
    let Arrow = document.getElementsByClassName('SliderLinkTagArrow ' + ID);
    TweenMax.to(Arrow,0.25,{x:0, ease:Power1.easeOut});
  }

  handleOut(ID)
  {
    let Arrow = document.getElementsByClassName('SliderLinkTagArrow ' + ID);
    TweenMax.to(Arrow,0.25,{x:-10, ease:Power1.easeOut});
  }


  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: this.state.showNbr,
      slidesToScroll: 1,
      swipeToSlide:4,
      autoplay: false,
      autoplaySpeed: 5000,
      pauseOnHover:true,
      // beforeChange:this.changeIndexBefore,
      // afterChange:this.changeIndex
    };

    const Projects = store.getState().LANG.JsonProjects.projets;
    return (
      <React.Fragment>
      <div id="TransitionWrapper"></div>
      <div className="SliderWorkWrapper">
      <Slider {...settings} ref={slider => (this.slider = slider)}>
      {Projects.map((o) => (

          <div key={o.id} className="WorkSliderTable" id={o.id}>
          <Tilt className="Tilt" options={{ max : 5, scale:1}}>
          <div className="WorkSliderThumb" style={{backgroundImage: "url(" + o.thumbSliderHome + ")"}}>
          <div className="LogoSliderHome" style={{backgroundImage: "url(" + o.logoBG + ")"}}></div>
          </div>
          </Tilt>
          <div className="WorkSliderInfo">
          <li className="sliderName">{o.name}
          <div className="tagWrapper">
          <div className="tagSVG">
          <SVGtag />
          </div>
          {o.categories.map((cat) => (
          <div key={cat+o.id} className="SliderCat">{cat}</div>))}
          </div>
          </li>
          {/* <li className="SliderClient">{o.client}</li> */}
          <li onClick={() => this.handleclick(o.id)} onMouseEnter={() => this.handleHover(o.id)} onMouseLeave={() => this.handleOut(o.id)} className="SliderLink">Go to project
          <div className={"SliderLinkTagArrow " + o.id}>
          <svg x="0px" y="0px" className="SliderLinkTagBtnSVG" viewBox="0 0 31.494 31.494">
        <path transform="scale(-1) translate(-31.494,-31.494)"  d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z" fill="#FFFFFF"/>
</svg>
</div>
          </li>
          </div>
          </div>
        ))}
      </Slider>
      </div>
      </React.Fragment>
    );
  }
}

const SVGtag = () => (
<svg x="0px" y="0px" className="centerTagSVG" width="20px" height="20px"
	 viewBox="0 0 35.2 35.4">
<path d="M22.5,34.4c-1.2,1.1-3,1.1-4.2,0L2.2,19.2c-0.9-0.8-2-2.5-2.1-3.7c-0.2-3.4-0.1-9.8,0-13.2c0-1.2,1.1-2.3,2.3-2.3
	C6.8,0,16-0.1,16.9,0.7l17.8,16.1c1.1,1.1,0.1,4-1,5.2L22.5,34.4z M8.3,5c-1-1-2.5-1-3.5,0c-1,1-1,2.5,0,3.5c1,1,2.5,1,3.5,0
	C9.3,7.5,9.3,6,8.3,5z"/>
</svg>
)


export default withRouter(SliderIndexProjects);
