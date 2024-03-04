// components
import { IoFastFoodSharp } from "react-icons/io5"
import { MdBedroomParent } from "react-icons/md"
import { FaTruckPlane } from "react-icons/fa6"
import { GiCardRandom } from "react-icons/gi"
import { FaHiking } from "react-icons/fa"
import { MdSportsEsports } from "react-icons/md"

// css
import styles from './CategoryIcon.module.css'

const CategoryIcon = ({ category }) => {

    if (category === 'food') {
      return <IoFastFoodSharp className={styles.icon}/>
    } else if (category === 'lodging') {
      return <MdBedroomParent className={styles.icon}/>
    } else if (category === 'activity') {
      return <FaHiking className={styles.icon}/>
    } else if (category === 'transportation') {
      return <FaTruckPlane className={styles.icon} />
    } else if (category === 'entertainment') {
      return <MdSportsEsports className={styles.icon}/>
    } else if (category === 'miscellaneous') {
      return <GiCardRandom className={styles.icon}/>
    }

}

export default CategoryIcon