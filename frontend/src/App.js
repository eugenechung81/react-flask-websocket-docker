import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import Websocket from "react-websocket";
import io from "socket.io-client";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import * as Config from "./Config"

// export let BASE_URL = "http://localhost:5000";
// export let BASE_URL = "http://popups.endorse.gg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      msg: "t"
    }
  }

  componentDidMount() {
    const socket = io(Config.BASE_URL + '/dd');
    socket.on('city', msg => {
      console.log(msg);
      this.setState({
        //'msg': msg.city
        show: true
      })
      setTimeout(() => {
        this.setState({
          //'msg': msg.city
          show: false
        })
      }, 3000);
      // $("#cities-list").prepend('<h3>' + msg.city + '<h3>');
    });
  }

  render() {
    var PopUp = null;
    if(this.state.show)
      PopUp = <div>
            <img src="https://scontent-frx5-1.cdninstagram.com/t/18723515_1431069163642074_1969842615226466304_a.jpg" style={{ width: "120px" }}/>
        <div key={this.state.msg}>{this.state.msg}</div>
        <div>
          Eugene has purchased $25 Sneak
        </div>
      </div>;
    return (
      <div className="App">
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        <p className="App-intro">
          Socket Testing
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionLeave={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {PopUp}
        </ReactCSSTransitionGroup>

        {/*<ProductDetail />*/}
      </div>
    );
  }
}

class ProductDetail extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        count: 90
      };
    }

    handleData(data) {
      console.log(data);
      let result = JSON.parse(data);
      // this.setState({count: this.state.count + result.movement});
    }

    render() {
      return (
        <div>
          Count: <strong>{this.state.count}</strong>

          <Websocket url='ws://localhost:5000/dd'
              onMessage={this.handleData.bind(this)}/>
        </div>
      );
    }
  }

export default App;
