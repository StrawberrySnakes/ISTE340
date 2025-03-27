import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import {Box, Button, Typography, Modal} from '@mui/material'

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

export default function PeopleModal(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{prop.name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {prop.title}
          </Typography>
          <img src ={prop.imagePath} alt="a Person"></img>

          {/*if it exists it will put it out */}
          {prop.website&& 
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Personal Website: <a href={prop.website} target='_blank'>My Homepage</a>
            </Typography>
          }
        </Box>
      </Modal>
    </div>
  );
}
