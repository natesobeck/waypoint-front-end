// css
import styles from './ExpenseCard.module.css'

// components
import CategoryIcon from '../CategoryIcon/CategoryIcons'

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
      <p className={styles.cost}>${expense.cost}</p>
    </div>
  )
}

export default ExpenseCard