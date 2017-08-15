import React from 'react';
import Nav from './Component/Nav';


export class HomePage extends React.Component {
  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <div className="masthead clearfix">
              <div className="inner">
                <h3 className="masthead-brand" style={{marginTop: 30}}>Post It</h3>
                <Nav />
              </div>
            </div>
            <div className="inner cover">
              <h1 className="cover-heading">Post Your Messages</h1>
              <p className="lead">Get Notifications from your group members via sms and email</p>
              <p className="lead">
                <a href="#0" className="btn btn-lg btn-secondary cd-signup">Create Account</a>
              </p>
            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Created by Johnson Chinonso<a href="https://twitter.com/johnprog"> @johnprog</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
