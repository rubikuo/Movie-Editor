import React, {Component} from "react";
import { Link } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <nav>
        <h1>MoviePedia</h1>
        <div className="wrapLinksDiv">
        <Link to="/"  className="links">Home</Link>{/* main page*/}
        <Link to="/add-movies" className="links">Add Movie</Link> {/* add page*/}
        </div>
      </nav>
    );
  }
}

export default Navigation;
