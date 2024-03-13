// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './NavBar.module.css'

const handleActiveSelection = (evt) => {
  const liEls = document.querySelectorAll(`.${styles.item}`)
  liEls.forEach(li => {
    if (li === evt.target || li.children === evt.target) {
      li.classList.add(`${styles['active']}`)
    } else if (li.classList.contains(`${styles['active']}`) && li !== evt.target) {
      li.classList.remove(`${styles['active']}`)
    }
  })
}

const NavBar = ({ user, handleLogout }) => {
  return (
    <div className="nav-container">
      <nav className="main-nav">
        {user ?
          <ul>
            {/* <li>Welcome, {user.name}</li> */}
            <li><Link className={`${styles.item} ${styles.active}`} onClick={handleActiveSelection} to="/">HOME</Link></li>
            <li><Link className={styles.item} onClick={handleActiveSelection} to="/trips">MY TRIPS</Link></li>
            <li><Link className={styles.item} onClick={handleActiveSelection} to="/trips/new">ADD</Link></li>
            <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          </ul>
        :
          <ul>
            <li><Link onClick={handleActiveSelection} className={`${styles.item} ${styles.active}`} to="/">HOME</Link></li>
            <li><Link onClick={handleActiveSelection} className={styles.item} to="/auth/login">LOG IN</Link></li>
            <li><Link onClick={handleActiveSelection} className={styles.item} to="/auth/signup">SIGN UP</Link></li>
          </ul>
        }
      </nav>
      <h1 className="main-title">Waypoint</h1>
    </div>
  )
}

export default NavBar
