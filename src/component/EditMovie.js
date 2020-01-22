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
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

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

  onSubmit = e => {
    let movie = {
      title: this.state.title,
      director: this.state.director,
      rating: this.state.rating,
      description: this.state.description
    };
    e.preventDefault();
    axios
      .put(this.infoUrl, movie)
      .then(() => {
        this.props.history.goBack(); //because edit want to go back to the
      })
      .catch(error => {
        this.setState({ error: true });
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

    let titleValidation = false;
    let directorValidation = false;
    let ratingValidation = false;
    let descriptionValidation = false;

    if (this.state.title.length >= 1 && this.state.title.length <= 40) {
      warningTitle = { color: "rgb(82, 223, 242)" };
      titleValidation = true;
    } else {
      warningTitle = { color: "rgb(245, 29, 26)" };
      titleValidation = false;
    }

    if (this.state.director.length >= 1 && this.state.director.length <= 40) {
      warningDirector = { color: "rgb(82, 223, 242)" };
      directorValidation = true;
    } else {
      warningDirector = { color: "rgb(245, 29, 26)" };
      directorValidation = false;
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
      warningRating = { color: "rgb(82, 223, 242)" };
      ratingValidation = true;
    } else if (this.state.rating === undefined) {
      warningRating = { color: "rgb(245, 29, 26)" };
      ratingValidation = false;
    } else {
      warningRating = { color: "rgb(245, 29, 26)" };
      ratingValidation = false;
    }

    if (
      this.state.description.length >= 1 &&
      this.state.description.length <= 300
    ) {
      warningDescription = { color: "rgb(82, 223, 242)" };
      descriptionValidation = true;
    } else {
      warningDescription = { color: "rgb(245, 29, 26)" };
      descriptionValidation = false;
    }

    // to check if all the input condition is true
    let warningMsg;
    if (
      titleValidation &&
      directorValidation &&
      ratingValidation &&
      descriptionValidation
    ) {
      warningMsg = null;
    } else if (this.state.error) {
      warningMsg = <p className="warningMsg">"Invalid Input please check and try again!"</p>;
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

        <form className="addForm" onSubmit={this.onSubmit}>
          <div className="formWrapDiv">
            <label htmlFor="name">
              {" "}
              {/*look for input field with id of Name and associate the label with input field */}
              Title
              <input
                type="text"
                value={this.state.title}
                id="title"
                placeholder="title"
                onChange={this.handleOnchange}
              />
              <span className="warning" style={warningTitle}>
                {this.state.title.length}/40
              </span>
            </label>
            <label htmlFor="name">
              Director
              <input
                type="text"
                value={this.state.director}
                id="director"
                placeholder="director"
                onChange={this.handleOnchange}
              />
              <span className="warning" style={warningDirector}>
                {this.state.director.length}/40
              </span>
            </label>
            <label htmlFor="name">
              Rating
              <input
                type="number"
                value={this.state.rating}
                id="rating"
                className="form-control"
                step={0.1}
                min={1}
                max={5}
                placeholder="0.0 - 5.0"
                onChange={this.handleOnchange}
              />
              <span className="warning" style={warningRating}>
                {ratingNum}/5.0
              </span>
            </label>
            <label htmlFor="name">
              Description
              <textarea
                type="text"
                id="description"
                className="descriptionCtn"
                value={this.state.description}
                placeholder="description"
                onChange={this.handleOnchange}
              ></textarea>
              <span className="warning" style={warningDescription}>
                {this.state.description.length}/300
              </span>
            </label>
          </div>
          <button id="updateBtn" type="submit">
            Update
          </button>
        </form>
        {warningMsg}
      </div>
    );
  }
}
export default EditMovie;
