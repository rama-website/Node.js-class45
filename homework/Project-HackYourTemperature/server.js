//server.js
import Express from 'express';
import { json } from 'express';
import routes from './routes.js';

const app = Express();
app.use(json());

// Use the routes defined in the separate module
app.use('/', routes);

const port = process.env.PORT || 3050;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


