import React from 'react'
import Card from 'Components/Home/Card'
import RightColumn from 'Components/Home/RightColumn'

/**
 * Home component.
 * Represents the home page of the application.
 * @returns {JSX.Element} Home component JSX.
 */
const Home = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full p-4 md:w-3/4">
        {/* Display two cards */}
        <Card title="TITLE HEADING" date="Title description, Apr 4, 2024" imageHeight="200px" />
        <Card title="TITLE HEADING" date="Title description, Apr 4, 2024" imageHeight="200px" />
      </div>
      {/* Display right column component */}
      <RightColumn />
    </div>
  )
}

export default Home
