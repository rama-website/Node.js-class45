// routes.js
import { Router } from 'express';
import Express from 'express';
import { json } from 'express';
import keys from './sources/keys.js';

const router = Router();


router.use(json());

router.get('/', (req, res) => {
  res.send('Hello from backend to frontend');
});

router.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    res.status(400).send('City name is required.');
  } else {
    const apiKey = keys.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === '404') {
       return res.status(404).send({ weatherText: 'City is not found!' });
      } else {
        const temperature = data.main.temp;
       return res.send(`${cityName} is the city, and the current temperature is ${temperature}°C.`);
      }
    } catch (error) {
      res.status(500).send('Failed to fetch weather data');
    }
  }
});
 
export default router;
