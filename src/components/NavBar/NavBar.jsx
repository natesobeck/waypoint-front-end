// npm modules
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <div className="nav-container">
      <nav className="main-nav">
        {user ?
          <ul>
            <li>Welcome, {user.name}</li>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/profiles">Profiles</NavLink></li>
            <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
            <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
            <li><NavLink to="/trips">All Trips</NavLink></li>
          </ul>
        :
          <ul>
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/auth/login">LOG IN</NavLink></li>
            <li><NavLink to="/auth/signup">SIGN UP</NavLink></li>
          </ul>
        }
      </nav>
      <h1 className="main-title">Waypoint</h1>
    </div>
  )
}

export default NavBar
