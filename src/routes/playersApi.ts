import express from 'express';
import { readAllPlayers, readPlayerById } from '../models/players-database';

const routes = express.Router();

routes.get('/', (req, res) => {
  const players = readAllPlayers();
  res.json(players);
});

routes.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const player = readPlayerById(id);
  if (player) {
    res.json(player);
  } else {
    res.status(404);
    res.json({error: `No player with ID ${id}.`});
  }
});

export default routes;