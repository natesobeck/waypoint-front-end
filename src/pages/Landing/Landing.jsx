// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <section className={styles['welcome-section']}>
        <div className={styles['welcome-section-container']}>
          <h1>Welcome to Waypoint, {user ? user.name[0].toUpperCase() + user.name.slice(1).toLowerCase() : 'friend'}</h1>
          {!user && <Link to='/auth/signup'>Get Started Now!</Link>}
        </div>
      </section>
      <section className={styles['features-section']}>
        <h1>This will list the freatures of the app.</h1>
      </section>
      <section className={styles['about-section']}>
        <h1>This will be the about section</h1>
      </section>
    </main>
  )
}

export default Landing
