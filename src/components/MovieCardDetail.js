import React from 'react';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import '../styles/details.css';

export default function MovieCard(props) {
    const {title, overview, vote_average, vote_count} = props.details
    return (
        <Card className ="movie-container"> 
            <CardActionArea onClick={props.flipped}>     
            <CardContent sx={{height: "480px", padding: "0px"}}>
                    <div>
                    <Typography id="movie-detail-title" variant="h5" component="h2">
                        {title}
                    </Typography>
                    <div className = 'rating'>
                        <StarIcon sx={{fontSize : "2.5em" ,marginRight: "8px"}}/>
                        <div className = 'average-count'>
                            <Typography id="modal-modal-title-count" variant="h6" component="h2">
                            <strong>{(Math.round(vote_average * 10)/10).toFixed(1)} </strong>/10 
                            </Typography>
                            <Typography className ="vote-count">{vote_count} Votes</Typography>
                        </div>
                    </div>
                    </div>
                    <div className ='overview'>
                    <Typography id="overview-desc" sx={{fontSize:"0.8rem"}}>
                    {overview}
                    </Typography>
                    </div>
                    </CardContent>
            </CardActionArea>

        </Card>
    )
}