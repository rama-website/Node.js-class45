// __tests__/routes.test.js

import app from '../routes.js'; // Import  Express app from server.js
import supertest from 'supertest';
import keys from '../sources/keys.js';


const request = supertest(app);

describe('POST /weather', () => {
  it('Should return city name and temperature if city is found', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'London' });
  
    expect(response.status).toBe(200);
    expect(response.text).toContain('London is the city');
  });

  it('Should return 400 Bad Request if city name is missing', async () => {
    const response = await request.post('/weather').send({});
    expect(response.status).toBe(400);
  });

  it('Should return 404 Not Found if city is not found', async () => {
    const response = await request.post('/weather').send({ cityName: 'NonexistentCity' });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toContain('City is not found');
  });

  it('Should return an error message for server errors', async () => {
    // Mock an error by using a wrong API key in your keys.js
    const response = await request.post('/weather').send({ cityName: 'London&APPID=1234' });
    expect(response.status).toBe(500);
    expect(response.text).toContain('Failed to fetch weather data');
  });
});


