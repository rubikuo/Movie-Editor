import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import Form from "./Form";
import Footer from "./Footer";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      rating: "",
      description: "",
      redirect: false,
      error: false
    };
  }

  onSubmit = e => {
    let movie = {
      title: this.state.title,
      director: this.state.director,
      rating: this.state.rating,
      description: this.state.description
    };
    e.preventDefault();
    this.addMovie(movie);
  };

  addMovie = data => {
    axios
      .post("http://3.120.96.16:3001/movies", data)
      .then(response => {
        console.log(response);
      })
      .then(() => this.setState({ redirect: true })) // we must have a function to run this.setState() here because
      // OBS this must be a big fat arrow so the "this" will be defined automatically
      .catch(error => {
        console.log(error);
        this.setState({ redirect: false, error: true });
      });
  };
  // to make the state property name dynamic by using object["sting"]
  // in this case [e.target.id] is a dynamic varible to state object
  handleOnchange = e => {
    if (e.target.id === "rating") {
      this.setState({
        // eslint-disable-next-line no-useless-escape
        rating: e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3")
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.redirect ? <Redirect to="/" /> : null}
        <Helmet>
          <title>Add Movie</title>
        </Helmet>
        <Form
          handleOnchange={this.handleOnchange}
          onSubmit={this.onSubmit}
          {...this.state}
        />
        <Footer />
      </div>
    );
  }
}

export default AddMovie;
