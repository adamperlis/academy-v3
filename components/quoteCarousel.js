import Slider from "react-slick";
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const root = {
  display:'flex',
  flexGrow:1,
  height:'auto',
  alignItems:'center',
  justifyContent:'center',
  textAlign:'center',
  paddingTop: '100px',
  paddingBottom: '100px',
}

class QuoteCarousel extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: false,
      autoplay: false,
      speed: 750,
      autoplaySpeed: 4000,
      cssEase: "cubic-bezier(0.19, 1, 0.22, 1)",
      lazyLoad: 'ondemand',
      autoplay:false
    };
    return (
      <Grid item xs={12} sm={12} md={12} style={root}>
        <Grid item xs={1} sm={1} md={2}></Grid>
        <Grid item xs={10} sm={10} md={8}>
          <Slider {...settings} className={"noFocus carousel"} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <div className={"noFocus carousel"}>
              <Typography variant='display4' gutterBottom paragraph={true}>
                <strong>{'"'}</strong>
              </Typography>
              <Typography variant='headline' gutterBottom paragraph={true} style={{maxWidth:'600px', width:'80vw', margin: '0 auto', paddingBottom:'20px'}}>
              Adam has a knack to boil down complex UX and product design concepts into simple, digestible ideas. He stands as an expert at the intersection of UX, Design Thinking, and Commerce. As a master facilitator, Adam spearheads a compelling workshop that will surely change the way your company builds products.
              </Typography>
              <img style={{display:'inline'}}src="#" />
              <Typography variant='title' gutterBottom paragraph={true} style={{paddingTop:'20px'}}>
                Adam Fry-Pierce
              </Typography>
              <Typography variant='caption' gutterBottom paragraph={true} style={{paddingBottom:'20px'}}>
                Director, Design Community @ INVISION
              </Typography>

            </div>
            <div className={"noFocus carousel"}>
              <h3>2</h3>
            </div>
            <div className={"noFocus carousel"}>
              <h3>3</h3>
            </div>
            <div className={"noFocus carousel"}>
              <h3>4</h3>
            </div>
            <div className={"noFocus carousel"}>
              <h3>5</h3>
            </div>
            <div className={"noFocus carousel"}>
              <h3>6</h3>
            </div>
          </Slider>
        </Grid>
        <Grid item xs={1} sm={1} md={2}></Grid>
      </Grid>
    );
  }
}

QuoteCarousel.propTypes = {

};

export default QuoteCarousel;
