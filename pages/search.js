import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/withRoot';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import 'isomorphic-fetch'
import Link from 'next/link';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import "../styles.scss"

import Head from 'next/head';


const fetchUrl = process.env.fetchUrl;
let currPage = 1;
let limit = '';
const url = 'https://' + fetchUrl + '/wp-json/wp/v2/blogs?page=' + currPage;

const styles = {
  root:{
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    paddingLeft: '2.5vw',
    paddingRight: '2.5vw',
    paddingTop: '60px',
  },
  featuredImage: {
    maxWidth: '100%',
    maxHeight: '150px'
  },
  container:{
    background:'linear-gradient(119deg, #ebf5f4, #efebf5)',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    paddingBottom:'200px'
  },
  center:{
    textAlign:'center',
    justifyContent: 'center',
    paddingTop:'10vh',
    paddingBottom:'10vh',
  },
  centerImg:{
    textAlign:'center',
    justifyContent: 'center',
  },
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* initial state */
      open: false,
      isLoading: false,
      loaded: false,
    };
    this.handleScroll = this.handleScroll.bind(this);

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  async handleScroll() {
    //console.log(window.scrollY, window.outerHeight)
    if ( !this.state.isLoading && limit != "reached" && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 64)){
      currPage += 1;
      await this.setState({
        isLoading: true,
        fetching: true
      })
      const url = 'https://' + fetchUrl + '/wp-json/wp/v2/blogs?page=' + currPage;

      const res = await fetch(url)
      const blogs = await res.json()
      //console.log(this.state)
      if ("code" in blogs){
        limit = "reached"
        return ;
      }
      else if (Object.keys(blogs).length < 10){
        limit = "reached"
        currPage = 1
      }
      let prevBlogs = this.state.blogs
      await this.setState({
        blogs:  ("code" in blogs ? prevBlogs : prevBlogs.concat(blogs)),
        isLoading: false,
        open: false,
        fetching: false
      })
    }
  }


  //fetch list of blogs here
  static async getInitialProps({ req }) {
    //Fetching featured blog below, if more than one are featured, the latest one will be displayed
    const url_feat = "https://" + fetchUrl + "/wp-json/wp/v2/blogs/?featured=true";
    const res_feat = await fetch(url_feat);
    const featuredBlog = await res_feat.json()

    //fetching rest of the blogs
    const res = await fetch(url)
    const blogs = await res.json()

    return{
      featuredBlog: featuredBlog,
      blogs: blogs,
    }
  }

  onChange = inputPassword => event => {
    //console.log(event.target.value)
    this.setState({
      inputPassword: event.target.value,
    });
  };

  searchBlogs = blogSearch => event => {

     this.fetchSearch(event.target.value);
  }

  fetchSearch = async () =>{
    await this.setState({
      fetching: true
    })
    const url = 'https://' + fetchUrl + '/wp-json/wp/v2/blogs?search=' + event.target.value;
    const res = await fetch(url)
    const blogs = await res.json()
    //console.log(blogs)
    await this.setState({
      blogs: blogs,
      fetching: false
    })
  }



  formatDate = (date) =>{
    let format = new Date(date);
    format = format.toDateString();
    format = format.slice(4, 10) + ', ' + format.slice(10,);
    return format;
  }

  getAuthors = (authors) => {
    let res = []
    authors.map((author) => {
      res.push(author.display_name)
    })
    return res.join(", ")
  }

  render() {
    const { classes } = this.props;

     return (
      <div className={classes.root}>
        <Head>
          <title>Academy – Design Tinkering</title>
          <meta name="description" content="Short Description here" />
        </Head>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Private post!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Provide passsword to view blog post.
              <div style={{color: 'red'}}>

                </div>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              onChange={this.onChange('password')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
            <Button onClick={this.verifyPassword} color="primary">
              View Post!
            </Button>
          </DialogActions>
        </Dialog>


        <Grid container spacing={8} className={classes.container}>

            <Grid container spacing={8}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Grid container spacing={8} className="designTinkering">
                  <Typography variant="display2" gutterBottom>
                    You searched for &nbsp;
                  </Typography>
                  <Typography variant="display1" gutterBottom>
                    "UX"
                  </Typography>
                </Grid>
              <Grid item xs={3}></Grid>
              </Grid>
            </Grid>

            <Grid container spacing={8} style={{paddingTop:'100px'}}>

              <Grid item xs={1} md={2}></Grid>

              <Grid item xs={10} md={8}>
                <Typography variant="title" style={{textAlign:'center', paddingBottom:'20px'}}>
                  Search Results
                </Typography>

                <Grid container spacing={24}>
                {
                this.props.blogs.map((blog) => {
                  if (blog.acf.featured != true){
                  return (

                    <Link key={blog.id} href={{ pathname: 'post', query: { name: blog.slug }}} as={`/post?${blog.slug}`}>
                    <Grid item xs={12} sm={8} md={4} className="heroHover" style={{paddingTop:'100px'}}  value={blog}>
                      <Paper elevation={0} style={{width:'100%', height:'100%'}} className="headlineHover">

                          <div style={{width:'100%', overflow:'hidden'}}>

                            <div style={{backgroundImage: "url("+blog.acf.featured_image+")", backgroundSize: 'cover', width:'110%', height: '300px', backgroundPosition: 'center'}}></div>

                        </div>
                        <div style={{padding:'30px', textAlign:'center',}}>
                            <Typography variant="headline" paragraph>
                            {blog.acf.title}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              {this.formatDate(blog.date)}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              By {this.getAuthors(blog.acf.author)}
                            </Typography>
                          </div>

                        </Paper>
                    </Grid>
                    </Link>

                  )
                  }
                  })
                  }
                </Grid>
          </Grid>
          </Grid>

          <Grid item xs={1} md={2}></Grid>
        </Grid>


      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Search));
