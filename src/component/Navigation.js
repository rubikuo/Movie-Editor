import React, {Component} from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Movies</Link> {/* main page*/}
        <Link to="/add-movies">Add Movies</Link>  {/* add page*/}
      </nav>
    );
  }
}

export default Navigation;
