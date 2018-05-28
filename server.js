const express = require('express')
const cors = require('cors')
const data = require('./data.json')

const app = express();
app.use(cors());
const port = 4000 || process.env.PORT;

const router = express.Router();

//Match routes
router.get('/', (req, res) => res.json(data), error => res.json(error) );


// Set default URL
app.use('/api', router);

//Run server
app.listen(port, function () {
  console.log('the server running on http://localhost:' + port);
});
