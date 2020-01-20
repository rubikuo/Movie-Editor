import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

// a form for user to add a movie
// post request

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

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeDirector = e => {
    this.setState({ director: e.target.value });
  };

  onChangeRating = e => {
    this.setState({
      rating: e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3")
    });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    let warningTitle;
    let warningDirector;
    let warningRating;
    let rating;
    let warningDescription;

    if (this.state.title.length >= 1 && this.state.title.length <= 40) {
      warningTitle = { color: "blue" };

    } else {
      warningTitle = { color: "red" };
   
    }

    if (this.state.director.length >= 1 && this.state.director.length <= 40) {
    
      warningDirector = { color: "blue" };
    } else {
      warningDirector = { color: "red" };

    }

    if (this.state.rating === "") {
      rating = 0;
    } else {
      rating = parseFloat(this.state.rating);
    }

    if (
      parseFloat(this.state.rating) >= 0.0 &&
      parseFloat(this.state.rating) <= 5.0
    ) {
      warningRating = { color: "blue" };
     
    } else if (this.state.rating === undefined) {
      warningRating = { color: "red" };

    } else {
      warningRating = { color: "red" };

    }

    if (this.state.description.length >= 1 && this.state.description <= 300) {
      warningDescription = { color: "blue" };
    } else {
      warningDescription = { color: "red" };
    }

    return (
      <div className="container">
        {this.state.redirect ? <Redirect to="/" /> : null}
        <Helmet>
          <title>Add Movies</title>
        </Helmet>
        <form className="addForm" onSubmit={this.onSubmit}>
          <div className="formWrapDiv">
            <label>
              Title
              <input
                type="text"
                value={this.state.title}
                placeholder="title"
                onChange={this.onChangeTitle}
              />
              <span className="warning" style={warningTitle}>
                {this.state.title.length}/40
              </span>
            </label>
            <label>
              Director
              <input
                type="text"
                value={this.state.director}
                placeholder="director"
                onChange={this.onChangeDirector}
              />
              <span className="warning" style={warningDirector}>
                {this.state.director.length}/40
              </span>
            </label>
            <label>
              Rating
              <input
                type="number"
                id="rating-control"
                className="form-control"
                step={0.1}
                min={1}
                max={5}
                value={this.state.rating}
                placeholder="0.0 - 5.0"
                onChange={this.onChangeRating}
              />
              <span className="warning" style={warningRating}>
                {rating}/5.0
              </span>
            </label>
            <label>
              Description
              <textarea
                className="descriptionCtn"
                type="text"
                placeholder="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
              ></textarea>
              <span className="warning" style={warningDescription}>
                {this.state.description.length}/300
              </span>
            </label>
          </div>
          <button id="addBtn" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddMovie;
