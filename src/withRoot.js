import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import getPageContext from './getPageContext';
import SimpleAppBar from '../components/simpleAppBar';
import SimpleAppBarTiny from '../components/simpleAppBarTiny';
import SimpleAppBarTinyBack from '../components/simpleAppBarTinyBack';
import SimpleAppFooter from '../components/simpleAppFooter';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LinearProgress } from 'material-ui/Progress';
import Router from 'next/router'

const loadDelay = 2

function withRoot(Component) {
  class WithRoot extends React.Component {

    

    constructor(props, context) {
      super(props, context);
      this.state = {
        loading: true,
        loadTiny:false,
        loadTinyBack:false
      }
      this.pageContext = this.props.pageContext || getPageContext();
    }

    slowLoad = () => {
      //Start the timer
        this.setState({loading: false}) 
        
    }

    componentDidMount() {
        setTimeout(this.slowLoad(), loadDelay * 1000)
        if(Router.router.route == "/blog"){
        this.setState({
          loadTiny:true
        })
      }

        if(Router.router.route == "/post" || Router.router.route == "/project" ){
        this.setState({
          loadTiny:true,
          loadTinyBack:true
        })
      }

      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      return (
        <ParallaxProvider>
        <MuiThemeProvider
          theme={this.pageContext.theme}
          sheetsManager={this.pageContext.sheetsManager}
        >
        <CssBaseline />
        { this.state.loading ? <LinearProgress color="secondary" /> :
          <div style={{
             opacity: '0', animation: 'fadeIn 3.2s forwards', animationDelay: '.3s'
          }} >
            { this.state.loadTiny ?
              (
                <SimpleAppBarTiny />
              )
              :(<SimpleAppBar />)
            }

            {this.state.loadTinyBack ?
              (
                <SimpleAppBarTinyBack />
              )
              :<span></span>
            }

            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            
           
            <Component {...this.props} />

            <SimpleAppFooter />
            
          </div>
       }
          
        </MuiThemeProvider>
        </ParallaxProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,
  };

  WithRoot.getInitialProps = ctx => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
