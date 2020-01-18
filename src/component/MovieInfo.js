import React, {Component} from "react";
import axios from "axios";
import { Helmet } from "react-helmet";


// this is rendered by clicking a movie in the movie table


class MovieInfo extends Component{
    constructor(props){
        super(props);
        this.state = {moive: [], id: null};
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.setState({id: id});
        
         this.timer = setInterval(()=>{
            axios.get("http://3.120.96.16:3001/movies/"+ id).then(
                response => {
                    console.log(response);
                    this.setState({movie: response.data})
                }
              
            )
        }, 2000)
   
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        const movie = this.state.movie ? (
            <div>
                <h4>{this.state.movie.title}</h4>
                <p>{this.state.movie.director}</p>
            </div>

        ) : (
            <div className="center"> Loading ... </div> 

        )
          

        return(
            <div>
                <Helmet>Movie Info</Helmet>
                <h1>{this.state.id}</h1>
                <div>{movie}</div>
            </div>

        )
    }
}

export default MovieInfo;
