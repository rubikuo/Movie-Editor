import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Movie from "./movie.png";
import { Redirect, Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// this page is rendered by clicking  info icon in the movie table

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { moive: [], redirect: false, error: false, dataLoaded: false };
    this.infoUrl =
      "http://3.120.96.16:3001/movies/" + this.props.match.params.id;
    this.starsTotal = 5;
  }

  componentDidMount() {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios
      .get(this.infoUrl, {
        cancelToken: this.source.token
      })
      .then(response => {
        this.setState({ movie: response.data, dataLoaded:true});
        
      })
      .catch(error =>{
        this.setState({error: true});
      })
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
    let movieContent;
    let id = this.props.match.params.id;
    const editUrl = "/edit-movies/" + id;

    if (this.state.redirect) return <Redirect to="/" />;

    if (this.state.error) {
      return (
        <div className="container">
          <div className="center">
            <h1>404</h1>
            <p>PAGE NOT FOUND</p>
            <Link to="/" className="goBackLink">
              {`>> Back to Home <<`}
            </Link>
          </div>
        </div>
      );
    }
    if(this.state.dataLoaded){
     movieContent = this.state.movie ? (
      <div>
        <Helmet>
          <title>{this.state.movie.title}</title>
        </Helmet>
        <div className="eachMovieInfo">
          <Link to={editUrl} style={{ width: "2rem" }}>
            <div className="tooltip">
              <span className="tooltiptext">Edit</span>
              <FaEdit size={22} color="lightblue" style={{ margin: "5px" }} />
            </div>
          </Link>
          <button className="deleteBtn" onClick={() => this.deleteMovie()}>
            <div className="tooltip">
              <span className="tooltiptext">Delete</span>
              <FaTrashAlt
                size={22}
                color="lightblue"
                style={{ margin: "5px" }}
              />
            </div>
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
          </div>
          <div className="descriptionDiv">
            <h3>Description</h3>
            <p className="descriptionContent">{this.state.movie.description}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="center">
        <p>Movie not found</p>
      </div>
    );
    }

    return <div className="container">{movieContent}</div>;
  }
}

export default MovieInfo;
