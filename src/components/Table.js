import React, { Component } from "react";
import { Link } from "react-router-dom";
import Movie from "./movie.png";
import { FaEdit, FaTrashAlt, FaInfo } from "react-icons/fa";

class Table extends Component {
  render() {
    const { search } = this.props;
    const { movieDatas } = this.props;
    return (
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
                          ((movie.rating / this.props.starsTotal) * 100) / 10
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
                        style={{ margin: "5px" }}
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
                    onClick={() => this.props.deleteMovie(movie.id)}
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
    );
  }
}

export default Table;
