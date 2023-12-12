import React, { useState } from 'react';
import '../styles/moviecard.css';
import Favorite from '../components/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import MovieCardDetail from '../components/MovieCardDetail';
import {BASEIMGURL,SIZE} from '../config';


export default function MovieCard(props) {
  const { title, overview, release_date, poster_path, id, isFavorite, vote_average, vote_count } = props.movie;
  const [flip, setFlip] = useState(false);

  function flipCard() {
    setFlip(flip => !flip);
  }

  return (

    (!flip) ?
      <Card className="movie-container">
        <CardActionArea onClick={flipCard} >
          <CardMedia
            component="img"
            alt="img"
            height="380"
            image={`${BASEIMGURL}/${SIZE}${poster_path}`}
            sx={{ objectFit: "inherit" }}
            value={props.movie}
          />
        </CardActionArea>
        <CardContent className="movie-content">
          <div className="title-year">
            <Button className="button-title" onClick={flipCard}><Typography gutterBottom component="p" className="movie-title" href="">
              {title}
            </Typography>
            </Button>
            <Typography className="release-date" variant="body2" color="text.secondary">
              {new Date(release_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </Typography>
          </div>
          <div>
            <Favorite handleClick={() => props.handleFavorite(id)} isFavorite={isFavorite} />
          </div>
        </CardContent>

      </Card>
      : <MovieCardDetail
        flipped={flipCard}
        details=
        {{ title, overview, vote_average, vote_count, release_date }} />

  )

}