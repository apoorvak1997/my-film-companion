const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.get('origin')); // Update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());

// app.get("/",(req,res)=>{
//     res.json(JSON.parse(favoriteMovies));
// })

let serverFavorites = [];

app.get('/api/favorites', (req, res) => {
  res.json(serverFavorites);
});

app.post('/api/favorites', (req, res) => {
  const { favorites } = req.body;
  serverFavorites = favorites; // Update server-side storage

  res.json({ success: true });
});

app.listen(3000, () => console.log('server is running'));