const express = require("express");
const routes = express.Router();

const ongsCotroller = require("./controllers/ongsController")
const incidentsCotroller = require("./controllers/incidentsController")
const profileCotroller = require("./controllers/profileController")
const sessionCotroller = require("./controllers/sessionController")

routes.post('/sessions',sessionCotroller.create);

routes.get('/incidents', incidentsCotroller.index);
routes.post('/incidents', incidentsCotroller.create);
routes.delete('/incidents/:id', incidentsCotroller.delete);

routes.get('/profile', profileCotroller.index);

routes.get('/ongs', ongsCotroller.index);
routes.post('/ongs', ongsCotroller.create);


module.exports = routes;
