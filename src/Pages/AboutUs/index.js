import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <>
        <Typography variant="h2" component="h2" gutterBottom>
          About Tool
        </Typography>
    <div className="flex justify-center h-[77vh]">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" gutterBottom>
          Welcome to Tools by Richard! Im  glad you're here.
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom>
          Learn about Tools
        </Typography>
        
       <Box className="">
        <Typography variant="body2"> Lorem ipsum lorme</Typography>
        </Box>
      </Box>
    </div>
    </>
  );
};

export default AboutUs;
