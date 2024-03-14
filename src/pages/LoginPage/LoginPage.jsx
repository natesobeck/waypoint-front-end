// components
import Login from "../Login/Login"

// css
import styles from './LoginPage.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  return (
    <main className={styles.container}> 
      <Login handleAuthEvt={handleAuthEvt}/>
    </main> 
  )
}

export default LoginPage