import React, {Component} from "react";
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
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios.get(this.infoUrl, {cancelToken: this.source.token}).then(response => {
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
        this.props.history.goBack(); //because edit want to go back to the
    });
  };

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
   
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
              <span>0/40</span>
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
                placeholder="0.0 - 5.0"
                onChange={this.onChangeRating}
              />
            </label>
            <label>
              Description
              <textarea 
                className="descriptionCtn"
                type="text"
                placeholder="Max 300 characters"
                value={this.state.description}
                onChange={this.onChangeDescription}
              >
              </textarea>
            </label>
          </div>
          <button id="updateBtn" type="submit">
            Update
          </button>
        </form>
      </div>
    );
  }
}
export default EditMovie;
