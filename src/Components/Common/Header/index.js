import React from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

/**
 * Header component.
 * Represents the header section of the application.
 * @param {Object} props - Component props.
 * @param {function} props.setMode - Function to set the theme mode.
 * @param {'dark' | 'light'} props.mode - Current theme mode ('dark' or 'light').
 * @returns {JSX.Element} Header component JSX.
 */
const Header = ({ setMode, mode }) => {
  // Determine if the mode is dark
  const isDark = mode === 'dark'

  return (
    <Paper className="flex flex-col !rounded-none">
      <div className="flex flex-col gap-3 p-6 text-center">
        <h1 className="text-4xl font-bold">Brand Name</h1>
        <Typography>Resize the browser window to see the effect.</Typography>
      </div>
      <div className="flex items-center justify-between px-3 bg-black">
        <div className="flex items-center gap-3">
          {/* Navigation links */}
          <Link to="/" className="block float-left p-3 text-white hover:text-black hover:bg-white">
            Home
          </Link>
          <Link
            to="/about-us"
            className="block float-left p-3 text-white hover:text-black hover:bg-white"
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="block float-left p-3 text-white hover:text-black hover:bg-white"
          >
            Contact Us
          </Link>
        </div>
        {/* Dark mode / Light mode toggle button */}
        <IconButton onClick={() => setMode(isDark ? 'light' : 'dark')} className="float-right">
          {isDark ? <LightMode color="warning" /> : <DarkMode color="info" />}
        </IconButton>
      </div>
    </Paper>
  )
}

export default Header
