import React from 'react'
import NoteLists from "Components/Common/NoteLists"
import {
  Box,
  Typography
} from "@mui/material"
const Notes = () => {
  return <Box className="flex items-center justify-center h-[87vh]">
    <Typography variant="h3"> All Notes</Typography>
    <NoteLists />
    
  </Box>
}

export default Notes
