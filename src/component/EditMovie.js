import React, {Component} from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

// using axios put
class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      rating: "",
      description: "",
      redirect: false
    };
    this.infoUrl =
      "http://3.120.96.16:3001/movies/" + this.props.match.params.id;
  }

  componentDidMount() {
    this.fetchData();
  }
  // fat arrow function is to bind this to the component
  fetchData = () => {
    axios.get(this.infoUrl).then(response => {
      console.log(response.data);
      this.setState({
        title: response.data.title,
        director: response.data.director,
        rating: response.data.rating,
        description: response.data.description
      });
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

  onSubmit = e => {
    let movie = {
      title: this.state.title,
      director: this.state.director,
      rating: this.state.rating,
      description: this.state.description
    };
    e.preventDefault();
    axios.put(this.infoUrl, movie).then(() => {
      this.setState({ redirect: true });
    });
  };

  render() {
    console.log(this.state.redirect);
    return (
      <div>
        {this.state.redirect ? <Redirect to="/movies" /> : null}
        <Helmet>
          <title>Edit Movies</title>
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
              min={0}
              max={5}
              value={this.state.rating}
              placeholder="rating"
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
export default EditMovie;
