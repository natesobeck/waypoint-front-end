// npm modules
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from "react-icons/fa"

// css
import * as styles from './footer.module.css'

const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <footer className={styles.footer}>
          <ul>
            <li><Link to="https://natesobeck.netlify.app/">MY PORTFOLIO</Link></li>
            <li><Link to="https://www.linkedin.com/in/n-sobeck/"><FaLinkedin className={styles.icon}/></Link></li>
            <li><Link to="https://github.com/natesobeck"><FaGithub className={styles.icon}/></Link></li>
          </ul>
        </footer>
      </div>
    </>  
  )
}

export default Footer