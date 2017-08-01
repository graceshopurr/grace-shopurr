import React from 'react';
import {withRouter, Link} from 'react-router-dom';


export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    console.log(event.target.value);
    this.setState({inputValue: event.target.value});
  }

  render(){
    return (
      <div id="sidebar" className="sidebar-offcanvas">
          <div className="col-md-12">
            <ul className="sidebarUl">
              <li className="active"><Link to ="/">Home</Link></li>
              <li><Link to="/cats">Cats</Link></li>
              <li><Link to="/products">Donations</Link></li>

            </ul>
            <form>
              Search: <br />
              <input
              onChange={this.handleChange}
              type="text" name="Search"
              value = {this.state.inputValue} />
              <Link to={`search/${this.state.inputValue}`}>
              <button className="btn btn-primary" type="button">Go</button>
              </Link>
            </form>
          </div>
      </div>
    );
  }

}


