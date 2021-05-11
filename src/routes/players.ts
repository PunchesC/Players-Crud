import express from 'express';
import Player from '../models/Player';
import { createPlayer, deletePlayer, readAllPlayers, readPlayerById, updatePlayer } from '../models/players-database';

//creates a new router object
const routes = express.Router();

routes.get('/', (req, res) => {
  const players = readAllPlayers();
  res.render('player-list', { 
    players
  });
});

routes.get('/add', (req, res) => {
  res.render('add-player-form');
});

routes.post('/add-submit', (req, res) => {
  const player: Player = {
    name: req.body.name,
    jersey: parseInt(req.body.jersey)
  }
  createPlayer(player);
  res.render('add-player-confirmation', { player });
});


/// Rebuild the route to show edit form
//method? get why? 1) we're not getting fata from a form. 2) it's from a <a>
//path? /:id/edit
//params, body, query? param (id)
//hbs file? edit-player-form.hbs
//model?  (Player imterface) player

routes.get("/:id/edit", (req,res)=>{
  const id:number = parseInt(req.params.id);
  const player = readPlayerById(id);
  res.render("edit-player-form", {player})
});

// Handle form submit
routes.post('/:id/edit-submit', (req, res) => {
  const player: Player = {
    id: parseInt(req.params.id),
    name: req.body.name,
    jersey: parseInt(req.body.jersey)
  }
  if(updatePlayer(player)) {
    res.render('edit-player-confirmation', { player });
  } else {
    res.status(404).render('error/not-found');
  }
});

routes.get('/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  const player = readPlayerById(id)
  if (player) {
    deletePlayer(id);
    res.render('delete-player-confirmation', { name: player.name });
  } else {
    res.status(404).render('error/not-found');
  }
});

export default routes;