import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Movie from "./movie.png";
import { FaEdit, FaTrashAlt, FaInfo, FaSearch } from "react-icons/fa";

// create a table for showing all the movies

class MovieTable extends Component {
  constructor(props) {
    super(props);
    this.state = { movieDatas: [], search: "" };
    this.url = "http://3.120.96.16:3001/movies";
    this.starsTotal = 5;
    this.source = undefined;
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    axios.get(this.url, { cancelToken: this.source.token }).then(response => {
      // console.log(response.data);
      let datas = response.data;
      this.setState({ movieDatas: datas });
    });
  };

  // to store search input value in state
  onChangeSearch(e) {
    this.setState({ search: e.target.value });
  }

  // cancel axios
  componentWillUnmount() {
    this.source.cancel();
  }

  deleteMovie = id => {
    axios.delete("http://3.120.96.16:3001/movies/" + id).then(() => {
      this.fetchData();
    });
  };

  render() {
    const { movieDatas } = this.state;
    const copyData = [];
    copyData.push(movieDatas.map(data => data));
    console.log(copyData);

    const renderTbody = movieDatas.length ? (
      movieDatas.map(movie => {
        const infoUrl = "/movie-info/" + movie.id;
        const editUrl = "/edit-movies/" + movie.id;

        const content = (
          <tr key={movie.id}>
            <td>
              <img src={Movie} alt="movieImg" className="movieImg" />
            </td>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>
              <div className="stars-outer">
                <div
                  className="stars-inner"
                  style={{
                    width: `${Math.round(
                      ((movie.rating / this.starsTotal) * 100) / 10
                    ) * 10}%`
                  }}
                ></div>
              </div>
            </td>
            <td>
              <Link to={infoUrl}>
                <div className="tooltip">
                  <span class="tooltiptext">Info</span>
                  <FaInfo
                    size={22}
                    color="lightblue"
                    style={{ margin: "5px" }}
                  />
                </div>
              </Link>

              <Link to={editUrl}>
                <div className="tooltip">
                  <span class="tooltiptext">Edit</span>
                  <FaEdit
                    className="editIcon"
                    size={22}
                    color="lightblue"
                    style={{ margin: "5px" }}
                  />
                </div>
              </Link>

              <button
                className="deleteBtn"
                onClick={() => this.deleteMovie(movie.id)}
              >
                <div className="tooltip">
                  <span class="tooltiptext">Delete</span>
                  <FaTrashAlt
                    size={22}
                    color="lightblue"
                    style={{ margin: "5px" }}
                  />
                </div>
              </button>
            </td>
          </tr>
        );

        if (this.state.search === "") {
          return content;
        } else if (
          movie.title.toLowerCase().includes(this.state.search) ||
          movie.director.toLowerCase().includes(this.state.search)
        ) {
          return content;
        } else {
          return null;
        }
      })
    ) : (
      <tr className="center">
        <td> No Post Yet </td>
      </tr>
    );

    return (
      <div className="container">
        <Helmet>
          <title>Home: MoviePedia</title>
        </Helmet>
        <div style={{ position: "relative" }}>
          <input
            className="searchInput"
            type="text"
            placeholder="search by title or director"
            value={this.state.search}
            onChange={this.onChangeSearch}
          />
          <FaSearch
            color="darkGrey"
            style={{ position: "absolute", left: "25%", top: "35%" }}
          />
        </div>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTbody}</tbody>
        </table>
      </div>
    );
  }
}

export default MovieTable;
