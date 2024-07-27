import NotFound from 'NotFound'
import { AboutUs, ContactUs, Home } from 'Pages'

/**
 * Array of route objects defining the routes for the application.
 * @type {Array<{
 *   id: number,
 *   path: string,
 *   element: JSX.Element,
 *   title: string,
 *   status: boolean
 * }>}
 */
const routes = [
  {
    id: 0,
    path: '*',
    element: <NotFound />,
    title: '404 Not Found',
    status: true,
  },
  {
    id: 1,
    path: '/',
    element: <Home />,
    title: 'Home',
    status: true,
  },
  {
    id: 2,
    path: '/about-us',
    element: <AboutUs />,
    title: 'About Us',
    status: true,
  },
  {
    id: 3,
    path: '/contact-us',
    element: <ContactUs />,
    title: 'Contact Us',
    status: true,
  },
]

export default routes
