const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/movies
    axios.get('http://localhost:3000/api/movies')
        .then(function (response) {
            res.render('index', {
                movies: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_movie = (req, res) => {
    res.render('add_movie');
}

exports.update_movie = (req, res) => {
    axios.get('http://localhost:3000/api/movies', {
            params: {
                id: req.query.id
            }
        })
        .then(function (moviedata) {
            res.render("update_movie", {
                movie: moviedata.data
            })
        })
        .catch(err => {
            res.send(err);
        })
}