import * as React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import './People.css';
import getData from '../util/GetData';

export default function PeopleModal(prop) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
    
    // Fetch extra person info by username
    const rolePath = prop.title.includes('Staff') ? 'staff' : 'faculty';
    getData(`people/${rolePath}/username=${prop.username}`).then((data) => {
      setDetails(data);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(null);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: '#f76902',
          color: 'white',
          '&:hover': { backgroundColor: '#d65f00' },
          padding: '8px 16px',
          borderRadius: '8px',
          textTransform: 'none',
        }}
      >
        {prop.name}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff',
            border: '2px solid #f76902',
            boxShadow: 24,
            p: 4,
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
        {/* Makes it so it does not show up if they do not have one */}
        {/* I took the idea from the react documentation website*/}
          {details ? (
            <>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {details.name}
              </Typography>

              {details.imagePath && (
                <img
                  src={details.imagePath}
                  alt="Person"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '50%', marginBottom: 16 }}
                />
              )}

              {details.tagline && (
                <Typography sx={{ mb: 1, fontStyle: 'italic', color: '#666' }}>
                  {details.tagline}
                </Typography>
              )}

              {details.title && (
                <Typography sx={{ mb: 1 }}>
                  <strong>Title:</strong> {details.title}
                </Typography>
              )}

              {details.interestArea && (
                <Typography sx={{ mb: 1 }}>
                  <strong>Interests:</strong> {details.interestArea}
                </Typography>
              )}

              {details.email && (
                <Typography sx={{ mb: 1 }}>
                  <strong>Email:</strong> {details.email}
                </Typography>
              )}

              {details.office && (
                <Typography sx={{ mb: 1 }}>
                  <strong>Office:</strong> {details.office}
                </Typography>
              )}

              {details.phone && (
                <Typography sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {details.phone}
                </Typography>
              )}

              {details.website && (
                <Typography sx={{ mt: 2 }}>
                  Website: <a href={details.website} target="_blank" rel="noreferrer" style={{ color: '#f76902' }}>My Homepage</a>
                </Typography>
              )}

              {details.twitter && (
                <Typography>
                  Twitter: <a href={`https://twitter.com/${details.twitter}`} target="_blank" rel="noreferrer">@{details.twitter}</a>
                </Typography>
              )}

              {details.facebook && (
                <Typography>
                  Facebook: <a href={details.facebook} target="_blank" rel="noreferrer">{details.facebook}</a>
                </Typography>
              )}
          </>
          ) : (
            <Typography>Loading details...</Typography>
          )}

        </Box>
      </Modal>
    </div>
  );
}
