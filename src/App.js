import React from "react";
import io from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:3001");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      msg: "",
      user: ""
    };
  }

  componentWillMount() {
    const name = prompt("please enter your name");
    this.setState({ user: name });
  }

  handleClick = event => {
    event.preventDefault();
    socket.emit("msg", { name: this.state.user, text: this.state.msg });
    this.setState({ msg: "" });
  };

  handleChange = event => {
    this.setState({ msg: event.target.value });
  };

  render() {
    socket.on("chat", data => {
      this.setState({ messages: [...data] });
      socket.emit("chat", data);
    });
    return (
      <div className="container">
        <form action={this.handleClick} className="form-row mt-3">
          <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            value={this.state.msg}
            onChange={this.handleChange}
          />
          </div>
          <div className="col-md-2">
          <input type="submit" value="Send" className="btn btn-primary btn-block" onClick={this.handleClick} />
          </div>
        </form>
        <div className="mt-4">
          {this.state.messages.map((item, i) => {
            return (<div className="card mt-3">
            <div className="card-body" key={i}>
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.text}</p>
            </div>
          </div>);


          })}
        </div>

      </div>
    );
  }
}

export default App;
