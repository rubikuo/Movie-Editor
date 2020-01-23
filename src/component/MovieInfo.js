import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Movie from "./movie.png";
import { Redirect, Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { moive: [], id: null, redirect: false, error: false };
    this.starsTotal = 5;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ id: id });
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios
      .get("http://3.120.96.16:3001/movies/" + id, {
        cancelToken: this.source.token
      })
      .then(response => {
        console.log(response);
        this.setState({ movie: response.data });
      });
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  deleteMovie = () => {
    const id = this.props.match.params.id;
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(() => {
      this.setState({ redirect: true });
    });
  };

  render() {
    let id = this.props.match.params.id;
    const editUrl = "/edit-movies/" + id;

    if (this.state.redirect) return <Redirect to="/" />;

    const movie = this.state.movie ? (
      <div>
        <Helmet>
          <title>{this.state.movie.title}</title>
        </Helmet>
        <div className="eachMovieInfo">
          {" "}
          <Link to={editUrl} style={{ width: "2rem" }}>
            <FaEdit />
          </Link>
          <button className="deleteBtn" onClick={() => this.deleteMovie()}>
            <FaTrashAlt />
          </button>
          <div className="imgCtn">
            <img src={Movie} alt="MovieImg" className="movieImg" />
          </div>
          <div className="movieTitleCtn">
            <h1>{this.state.movie.title}</h1>
            <h3>{this.state.movie.director}</h3>
            <div className="stars-outer">
              <div
                className="stars-inner"
                style={{
                  width: `${Math.round(
                    ((this.state.movie.rating / this.starsTotal) * 100) / 10
                  ) * 10}%`
                }}
              ></div>
            </div>
            <span className="number-rating"></span>
          </div>
          <p>{this.state.movie.description}</p>
        </div>
      </div>
    ) : (
      <div className="center"> Loading ... </div>
    );

    return <div className="container">{movie}</div>;
  }
}

export default MovieInfo;
