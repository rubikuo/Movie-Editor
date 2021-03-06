import React, { PureComponent } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Form from "./Form";
import Footer from "./Footer";

// using axios put
class EditMovie extends PureComponent {
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

  fetchData = () => {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios
      .get(this.infoUrl, { cancelToken: this.source.token })
      .then(response => {
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

  // control the rating input value
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
        this.props.history.goBack();
      })
      .catch(error => {
        this.setState({ error: true });
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
export default EditMovie;
