import React, { useState } from 'react';
import '../styles/moviecard.css';
import Favorite from '../components/Favorite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import MovieCardDetail from '../components/MovieCardDetail';


export default function MovieCard(props) {
    const { title, overview, release_date, poster_path, id, isFavorite } = props.movie;
    const [open, setOpen] = React.useState(false);
    const [movieDetail, setMovieDetail] = React.useState({});
    const handleOpen = (e) => {
        setMovieDetail(e);
        setOpen(true);}
    const handleClose = () => setOpen(false);



    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w300"
    return (
    <Card className ="movie-container">
        
        
        <CardActionArea onClick={() =>handleOpen(props.movie)}>
        
        <CardMedia
        component="img"
        alt="img"
        height="380"
        image={`${baseImgUrl}/${size}${poster_path}`}
        sx={{  objectFit: "inherit" }}
        value={props.movie}
      />
      </CardActionArea>
      <CardContent className ="movie-content">
        <div className = "title-year">

        


        <Button className="button-title" onClick={() =>handleOpen(props.movie)}><Typography gutterBottom component="p" className="movie-title" href="">
        {title}
        </Typography>
        </Button>
        <MovieCardDetail open={open} onClose={handleClose} movieDetail={movieDetail}/>
        <Typography className = "release-date" variant="body2" color="text.secondary">
        {new Date(release_date).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'})}
        </Typography>
        </div>
        <div>
        <Favorite handleClick={()=>props.handleFavorite(id)} isFavorite={isFavorite}/>
        </div>
      </CardContent>
      
    </Card>

    )

}