import Slider from "react-slick";
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import { Parallax } from 'react-scroll-parallax';
import "../styles.scss"

import { CircularProgress } from "material-ui/Progress";

const expand = {
  display: 'flex',
  justifyContent: 'flex-end',
  top: '-74px;',
}

const expandBtn = {
  background: '#fafafa',
  position: 'relative',
  zIndex: 500,
  padding: '25px',
  display: 'flex',
  alignItems: 'center'
}

const verticalText = {
  transform: 'rotate(-90deg)',
  position: 'relative',
  top: '4vh'
}

const verticalLine = {
  transform: 'rotate(-90deg)',
  position: 'relative',
  top: '22vh'
}

const iconMargin = {
  marginRight: '10px',
}

const centerAlign = {
  width: '50%',
  margin: '0 auto',

}

const nextArrow = <IconButton><Icon>chevron_right</Icon></IconButton>
const prevArrow = <IconButton><Icon>chevron_left</Icon></IconButton>

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      loadingImage: true,
      firstProject: this.props.projects[0],
      activeSlide: 0,
    activeSlide2: 0
    };
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  onLoad (id)  {
    //console.log(id)
    if (this.state.loadingImage && id == this.state.firstProject.id){
    this.setState({
      loadingImage: false,
    })
  }
  }



  render() {

    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: false,
      autoplay: true,
      speed: 750,
      autoplaySpeed: 5000,
      cssEase: "cubic-bezier(0.19, 1, 0.22, 1)",
      dots: true,
      touchThreshold: 5,
      vertical: false,
      verticalSwiping: false,
      nextArrow,
      prevArrow,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      afterChange: current => this.setState({ activeSlide2: current })
    };

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs sm={1}>
            <Hidden smDown>
              <Typography style={verticalText} variant="caption" color="secondary">
                Client – {(this.state.nav1 != null && "props" in this.state.nav1) ? this.state.nav1.props.children[this.state.activeSlide].props.clientname : null}
          </Typography>
              <Divider style={verticalLine} />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Slider className={"noFocus carousel"}
              {...settings}
              asNavFor={this.state.nav2}
              ref={slider => (this.slider1 = slider)}

            >

              {this.props.projects.map((project) => {
                return (
                  <div key={project.id} clientname={project.acf.client_name} className={"noFocus carousel"}>
                    <div className={"noFocus carousel carousel-inner"} style={{ background: project.acf.project_theme_color, height: '80vh', display: 'flex' }}>

                      <div style={{ opacity: this.state.loadingImage ? '0' : '1', width:'100%', height:'100%', overflow:'hidden'}}>

                          <div style={{backgroundImage: "url("+ project.acf.carousel_image_1 +")", backgroundSize:'cover', width:'110%', backgroundPosition:'center', height: '100%'}} hidden={this.state.loadingImage}></div>

                      </div>
                      { this.state.loadingImage ? <CircularProgress style={centerAlign} style={{ opacity: 1 }}  /> : null }
                    </div>

                  </div>
                )
              })}




            </Slider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Slider
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              swipeToSlide={true}
              arrows={false}
              focusOnSelect={false}
              speed={950}
              cssEase={"cubic-bezier(0.19, 1, 0.22, 1)"}
              className={'slider-two'}
              touchThreshold={5}
              vertical={false}
              verticalSwiping={false}
            >
              {this.props.projects.map((project) => {
                return (
                  <div key={project.id} className={"noFocus carousel-two"}>
                    <div className={"noFocus carousel-two carousel-inner"} style={{ background: project.acf.project_theme_color, height: '80vh' }}>

                    { this.state.loadingImage ? <CircularProgress style={centerAlign}  /> : null }

                      <div style={{ width:'100%', height:'100%', overflow:'hidden'}}>

                      <div onLoad={this.onLoad(project.id)} height={this.state.loadingImage ? 0: '100%'} style={{backgroundImage: "url("+ project.acf.carousel_image_2 +")", backgroundSize:'cover', width:'110%', height: '100%', backgroundPosition:'center'}}></div>

                    </div>
                    </div>
                  </div>
                )
              })
              }

            </Slider>

          </Grid>


        </Grid>
      </div>
    );
  }
}

Carousel.propTypes = {

};

export default Carousel;
