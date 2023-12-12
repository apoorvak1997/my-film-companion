const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors());


//Error handling 
let serverFavorites = [];

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(
    { 
      status: 'error', 
      message: 'Internal Server Error' 
    }
    );
});

// validate request body
const validateRequestBody = (req, res, next) => {
  const { favorites } = req.body;

  if (!req.body||!favorites) {
    res.status(400).json(
      { 
        status: 'error', 
        message: 'Invalid request body: Missing or invalid "favorites" property.' 
      });
  }else if(!(favorites instanceof Array)){
    res.status(400).json(
      { 
        status: 'error', 
        message: '"favorites" should be an array of valid movie-ids' 
      });
  }
  else {
    next();
  }
};




app.get('/api/favorites', (req, res, next) => {
  try{
  res.json(serverFavorites);}
  catch(error) {
    next(error);
  }
});

app.post('/api/favorites',validateRequestBody, (req, res, next) => {
  try{
  const { favorites } = req.body;
  serverFavorites = favorites;
  
  res.json(
    { 
      status: 'success',
      favorites: favorites 
    });
  }catch(error) {
    next(error);
  }
});

app.listen(3000, () => console.log('server is running'));