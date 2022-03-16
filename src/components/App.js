import React from "react";
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){
    this.setState({ isLoggedIn: false });
  }

  handleLogin(userData) {
    this.setState({ isLoggedIn: true, userData: userData });
  }

  render() {
    let content = "";
    if (this.state.isLoggedIn) {      
      content = <>
                  <Header />
                  <Dashboard userData={ this.state.userData } />
                  <Footer />
                </>;    
    }

    return (
      <div className="app">
        { !this.state.isLoggedIn && <Login onLogin={this.handleLogin} /> }
        { content }
      </div>
    );
  }

}
