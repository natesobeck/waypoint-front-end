// css
import styles from './ExpenseCard.module.css'

// components
import CategoryIcon from '../CategoryIcon/CategoryIcons'
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md";

const ExpenseCard = ({ expense }) => {
  return (  
    <div className={styles.card}>
      <div className={styles['expense-category-pair']}>
        <h3 className={styles.expense}>{expense.expense}</h3>
        <CategoryIcon category={expense.category} />
      </div>
      {expense.location &&
      <p className={styles.location}>{expense.location}</p>}
      {expense.note &&
      <p className={styles.note}>{expense.note}</p>}
      <div className={styles['footer-container']}>
        <div className={styles['btn-container']}>
          <button className={`${styles['delete-btn']} ${styles.btn}`}><MdDelete className={styles['delete-icon']}/></button>
          <button className={`${styles['edit-btn']} ${styles.btn}`}><MdEdit className={styles['edit-icon']}/></button>
        </div>
        <p className={styles.cost}>${expense.cost}</p>
      </div>
    </div>
  )
}

export default ExpenseCard