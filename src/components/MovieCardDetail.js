import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StarIcon from '@mui/icons-material/Star';
import '../styles/details.css';

export default function MovieCard(props) {
    const {title,overview, vote_average, vote_count} = props.movieDetail;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return (
        <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <div className="modal-top">
        <Typography id="modal-modal-title" variant="h6" component="h2">
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {overview}
        </Typography>
        </Box>
        </Modal>
    )
}