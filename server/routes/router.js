const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add movies
 *  @method GET /add-movie
 */
route.get('/add-movie', services.add_movie)

/**
 *  @description for update movie
 *  @method GET /update-movie
 */
route.get('/update-movie', services.update_movie)


// API
route.post('/api/movies', controller.create);
route.get('/api/movies', controller.find);
route.put('/api/movies/:id', controller.update);
route.delete('/api/movies/:id', controller.delete);


module.exports = route