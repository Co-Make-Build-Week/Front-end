import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssuePage = (props) => {
    const [issue, setIssue] = useState();
    console.log("selected movie", props.match.params.id);
    useEffect(() => {
        const id = props.match.params.id;
        // change ^^^ that line and grab the id from the URL
        // You will NEED to add a dependency array to this effect hook

        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setMovie(response.data);
                console.log("Working");
                console.log(response);
            })
            .catch(error => {
                console.log("error");
            })

    }, [props.match.params.id]);

    // Uncomment this only when you have moved on to the stretch goals
    // const saveMovie = () => {
    //   const addToSavedList = props.addToSavedList;
    //   addToSavedList(movie)
    // }

    if (!movie) {
        return <div > Loading movie information... < /div>;
    }


    const { title, director, metascore, stars } = movie;
    console.log("This is what were working with ", stars);
    return ( <
        div className = "save-wrapper" >
        <
        div className = "movie-card" >
        <
        h2 > { title } < /h2> <
        div className = "movie-director" >
        Director: < em > { director } < /em> < /
        div > <
        div className = "movie-metascore" >
        Metascore: < strong > { metascore } < /strong> < /
        div > <
        h3 > Actors < /h3>

        {
            stars.map(star => ( <
                div key = { star }
                className = "movie-star" > { star } <
                /div>
            ))
        } <
        /div> <
        div className = "save-button" > Save < /div> < /
        div >
    );
}

export default Movie;