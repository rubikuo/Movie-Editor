import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

// using axios put
class EditMovie extends Component {
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
    this.infoUrl =
      "http://3.120.96.16:3001/movies/" + this.props.match.params.id;
  }

  componentDidMount() {
    this.fetchData();
  }
  // fat arrow function is to bind this to the component
  fetchData = () => {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios
      .get(this.infoUrl, { cancelToken: this.source.token })
      .then(response => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          director: response.data.director,
          rating: response.data.rating,
          description: response.data.description
        });
      }).catch((error) => {
        this.setState({error: true})
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
      this.props.history.goBack(); //because edit want to go back to the
    }).catch((error) => {
      this.setState({error: true})
    });
  };

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    let warningTitle;
    let warningDirector;
    let warningRating;
    let ratingNum;
    let warningDescription;

    let title = false;
    let director = false;
    let rating = false;
    let description = false;

    if (this.state.title.length >= 1 && this.state.title.length <= 40) {
      warningTitle = { color: "blue" };
      title = true;
    } else {
      warningTitle = { color: "red" };
      title = false;
    }

    if (this.state.director.length >= 1 && this.state.director.length <= 40) {
      warningDirector = { color: "blue" };
      director = true;
    } else {
      warningDirector = { color: "red" };
      director = false;
    }

    if (this.state.rating === "") {
      ratingNum = 0;
    } else {
      ratingNum = parseFloat(this.state.rating);
    }

    if (
      parseFloat(this.state.rating) >= 0.0 &&
      parseFloat(this.state.rating) <= 5.0
    ) {
      warningRating = { color: "blue" };
      rating = true;
    } else if (this.state.rating === undefined) {
      warningRating = { color: "red" };
      rating = false;
    } else {
      warningRating = { color: "red" };
      rating = false;
    }

    if (
      this.state.description.length >= 1 &&
      this.state.description.length <= 300
    ) {
      warningDescription = { color: "blue" };
      description = true;
    } else {
      warningDescription = { color: "red" };
      description = false;
    }
     
    // to check if all the condition is true
    let warningMsg;
    if (title && director && rating && description) {
      warningMsg = null;
    } else if (this.state.error) {
      warningMsg = <p>"Oooppps Something is wrong"</p>;
    } else {
      warningMsg = null;
    }

    // if (this.state.error) {
    //   return <div> <p>Error</p> </div>;
    // }

    return (
      <div className="container">
        <Helmet>
          <title>Edit Movies</title>
        </Helmet>

        <form className="editForm" onSubmit={this.onSubmit}>
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
                {ratingNum}/5.0
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
        {warningMsg}
      </div>
    );
  }
}
export default EditMovie;
