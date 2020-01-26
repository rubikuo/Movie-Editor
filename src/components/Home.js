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
    this.state = { movieDatas: [], search: "", error: false };
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
    axios
      .get(this.url, { cancelToken: this.source.token })
      .then(response => {
        // console.log(response.data);
        let datas = response.data;
        this.setState({ movieDatas: datas });
      })
      .catch(error => {
        this.setState({ error: true });
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
    axios
    .delete("http://3.120.96.16:3001/movies/" + id)
    .then(() => {
      this.fetchData();
    });
  };

  render() {
    const { movieDatas } = this.state;
    const { search } = this.state;

    // to check if the request is bad then there is an error
    if (this.state.error) {
      return (
        <div className="container">
        <div className="center">
          <p>Something is wrong</p>
        </div>
        </div>
      );
    }

    // to check if there is any movie in the movieDatas array
    // if yes render table content, if not render no post yet
    const renderContent = movieDatas.length ? (
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
        <tbody>
          {movieDatas.map(movie => {
            const infoUrl = "/movie-info/" + movie.id;
            const editUrl = "/edit-movies/" + movie.id;

            const content = (
              <tr key={movie.id}>
                <td>
                  <img src={Movie} 
                  alt="movieImg" 
                  className="movieImg" 
                  />
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
                      <span className="tooltiptext">Info</span>
                      <FaInfo
                        size={22}
                        color="lightblue"
                        style={{ margin: "5px"}}
                      />
                    </div>
                  </Link>

                  <Link to={editUrl}>
                    <div className="tooltip">
                      <span className="tooltiptext">Edit</span>
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
                      <span className="tooltiptext">Delete</span>
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

            if (search === "") {
              return content;
            } else if (
              movie.title.toLowerCase().includes(search.toLowerCase()) ||
              movie.director.toLowerCase().includes(search.toLowerCase())
            ) {
              return content;
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    ) : (
      <div className="center">
        <p>No post yet</p>
      </div>
    );

    return (
      <div className="container">
        <Helmet>
          <title>Home: MoviePedia</title>
        </Helmet>

        <div style={{ position: "relative" }}>
          {" "}
          {/*the position relative is for the search icon to be absolute */}
          <input
            className="searchInput"
            type="text"
            maxlength="10"
            placeholder="search by title or director"
            value={this.state.search}
            onChange={this.onChangeSearch}
          />
          <FaSearch
            color="darkGrey"
            style={{ position: "absolute", left: "25%", top: "35%" }}
          />
        </div>
        {renderContent}
      </div>
    );
  }
}

export default MovieTable;
