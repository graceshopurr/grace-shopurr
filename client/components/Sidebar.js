import React from 'react';
import {withRouter, Link} from 'react-router-dom';


export default class Sidebar extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange (event) {
    console.log(event.target.value);
    this.setState({inputValue: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  render(){
    return (
      <div id="sidebar" className="sidebar-offcanvas">
          <div className="col-md-12">
            <h3>Sidebar</h3>
            <ul className="nav ">
              <li className="active"><Link to ="/home">Home</Link></li>
              <li><Link to="/cats">Cats</Link></li>
              <li><Link to="/products">Donations</Link></li>

            </ul>
            <form onSubmit={this.handleSubmit}>
              Search: <br />
              <input
              onChange={this.handleChange}
              type="text" name="Search"
              value = {this.state.inputValue} />

              <button className="btn btn-primary" type="button">GO</button>
            </form>
          </div>
      </div>
    );
  }

}


