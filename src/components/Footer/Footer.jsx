// npm modules
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub } from "react-icons/fa"

// css
import * as styles from './footer.module.css'

const Footer = () => {
  return (
    <>
      <div className="cover"></div>
      <footer className={styles.footer}>
        <ul>
          <li><Link to="https://natesobeck.netlify.app/">My Portfolio</Link></li>
          <li><Link to="https://www.linkedin.com/in/n-sobeck/"><FaLinkedin /></Link></li>
          <li><Link to="https://github.com/natesobeck"><FaGithub /></Link></li>
        </ul>
      </footer>
    </>  
  )
}

export default Footer