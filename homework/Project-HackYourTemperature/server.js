//server.js
import app from "./routes.js";


import routes from './routes.js';
import fetch from 'node-fetch';

// const app = express();
// app.use(express.json());



const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



