import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Link from 'next/link'
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    height: '80vh'
  }
});

function Hero(props) {
  const { classes } = props;

    return (
      <div className={classes.root}>
      <Grid item xs={1} sm={3}></Grid>
      <Grid item xs={10} sm={3} md={3}>
        <Typography variant='display4'>
          Think Better, Build Better
        </Typography>
        <Typography variant='display3' gutterBottom>
          with UX & Design Thinking
        </Typography>

        <Typography variant='body1' gutterBottom>
        We are Designers, Developers. Product Managers, Researchers and Consultants devoted to creating human-centered digital experiences for our clients. We offer end-to-end Research, Design, Development & Analytics as well as Trainings for teams.
        </Typography>
      </Grid>
      <Grid item xs={1} sm={6}></Grid>
      </div>
    );
  }

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);
