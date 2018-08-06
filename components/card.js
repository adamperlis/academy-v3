import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexWrap:'wrap',
  },
});

class Card extends React.Component {

  render() {
    const { classes, backgroundColor } = this.props;

    return (
      <div className={classes.root}>
      <div style={{
        padding:20,
        minHeight:'590px',
        justifyContent: 'space-evenly',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor
      }}>

        <Typography variant="title" align="left" gutterBottom style={{paddingBottom:'10px'}}>
          {this.props.title}
        </Typography>

        <Typography variant="headline" align="left" gutterBottom>
          {this.props.headline1}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {this.props.description1}
        </Typography>

        <Typography variant="headline" align="left" gutterBottom>
          {this.props.headline2}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {this.props.description2}
        </Typography>

        <Typography variant="headline" align="left" gutterBottom>
          {this.props.headline3}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {this.props.description3}
        </Typography>

        <Typography variant="headline" align="left" gutterBottom>
          {this.props.headline4}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {this.props.description4}
        </Typography>

        <Typography variant="headline" align="left" gutterBottom>
          {this.props.headline5}
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
          {this.props.description5}
        </Typography>
      </div>
      </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);
