import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const ContactUs = () => {
  return (
    <>
        <Typography variant="h2" component="h2" gutterBottom>
          Contact Us
        </Typography>
    <div className="flex justify-center h-[77vh]">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" gutterBottom>
          Welcome to Tools by Richard! Im  glad you're here.
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom>
          Get in Touch
        </Typography>
        
       <div className=" flex lg:flex-row flex-col">
        <div className="m-2"><Button  className="p-2 m-2" variant="contained" href="mailto:culestfrosh@gmail.com">
          Email
        </Button></div>
        <div className="m-2"><Button  className="p-2 m-2" variant="contained" href="tel:09152694711">
          Call us
        </Button></div>
        <div className="m-2"><Button  className="p-2 m-2" variant="contained" href="https://wa.me/+2349152694711">
          Whatsapp
        </Button></div>
        </div>
      </Box>
    </div>
    </>
  );
};

export default ContactUs;
