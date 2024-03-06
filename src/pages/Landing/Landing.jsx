// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './Landing.module.css'

// pages
import LoginPage from '../Login/Login'

const Landing = (props) => {

  return (
    <main className={styles.container}>
      <section className={styles['welcome-section']}>
        <div className={styles['welcome-section-container']}>
          <div className={styles['headers-container']}>
            <h1 className={styles["landing-header"]}>Where are you off to next?</h1>
            <h3 className={styles["landing-subheader"]}>We'll help make sure you're good to go.</h3>
          </div>
          <div className={styles["login-container"]}>
            {!props.user && (
              <div className={styles['login-subcontainer']}>
                <LoginPage handleAuthEvt={props.handleAuthEvt} />
              </div>
            )}
            {props.user && <Link to='/trips/new' className={styles['add-trip-btn-big']}><span className={styles.underline}>Add a Trip</span></Link>}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
