// routes.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello from backend to frontend');
});

router.post('/weather', (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send('City name is required.');
  } else {
    res.send(`${cityName} is the city.`);
  }
});

export default router;
