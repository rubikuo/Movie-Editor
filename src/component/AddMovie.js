import React, {Component} from "react";
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
      redirect: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let movie = {
      title: this.state.title,
      director: this.state.director,
      rating: this.state.rating,
      description: this.state.description
    };
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
        this.setState({ redirect: false });
      });
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeDirector = e => {
    this.setState({ director: e.target.value });
  };

  onChangeRating = e => {
    this.setState({ rating: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/" /> : null}
        <Helmet>
          <title>Add Movies</title>
        </Helmet>
        <form onSubmit={this.onSubmit}>
          <label>
            Title
            <input
              type="text"
              value={this.state.title}
              placeholder="title"
              onChange={this.onChangeTitle}
            />
          </label>
          <label>
            Director
            <input
              type="text"
              value={this.state.director}
              placeholder="director"
              onChange={this.onChangeDirector}
            />
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
              placeholder="rating 1.0 - 5.0"
              onChange={this.onChangeRating}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={this.state.description}
              placeholder="description"
              onChange={this.onChangeDescription}
            />
          </label>
          <button id="AddBtn" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddMovie;
