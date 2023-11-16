//server.js
import Express from 'express';
import { json } from 'express';

import routes from './routes.js';
import fetch from 'node-fetch';

const app = Express();
app.use(json());



const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



