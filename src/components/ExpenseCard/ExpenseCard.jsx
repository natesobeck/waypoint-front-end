// npm packages
import { useState } from 'react'

// css
import styles from './ExpenseCard.module.css'

// components
import CategoryIcon from '../CategoryIcon/CategoryIcons'
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

// services
import * as tripService from '../../services/tripService.js'

const ExpenseCard = ({ expense, expenses, setExpenses, tripId }) => {

  const [showUpdate, setShowUpdate] = useState(false)
  const [formData, setFormData] = useState({
    expense: expense.expense,
    location: expense.location,
    category: expense.category,
    cost: expense.cost,
    note: expense.note
  })

  const handleDeleteExpense = async (evt) => {
    evt.preventDefault()
    const deletedExpense = await tripService.deleteExpense(tripId, expense._id)
    const filteredExpenses = expenses.filter(expense => expense._id !== deletedExpense._id)
    setExpenses(filteredExpenses)
  }

  const handleToggleUpdateForm = () => {
    setShowUpdate(!showUpdate)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmitUpdateExpense = async (evt) => {
    evt.preventDefault()
    const updatedExpense = await tripService.updateExpense(tripId, expense._id, formData)
    const updatedExpenses = expenses.map(expense => expense._id === updatedExpense._id ? updatedExpense : expense)
    setExpenses(updatedExpenses)
    setShowUpdate(!setShowUpdate)
  }

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
          <button className={`${styles['delete-btn']} ${styles.btn}`} onClick={handleDeleteExpense}><MdDelete className={styles['delete-icon']}/></button>
          <button className={`${styles['edit-btn']} ${styles.btn}`} onClick={handleToggleUpdateForm}><MdEdit className={styles['edit-icon']}/></button>
        </div>
        <p className={styles.cost}>${expense.cost}</p>
      </div>

      {showUpdate &&
        <form 
          onSubmit={handleSubmitUpdateExpense}
          className={styles.form}
        >
          <h4>Update this Expense</h4>
          <input 
            type="text"
            name="expense"
            onChange={handleChange}
            value={formData.expense}
            placeholder="What expense are you adding? i.e. plane tickets"
            required
          />
          <input 
            type="number"
            name="cost"
            onChange={handleChange}
            value={formData.cost}
            placeholder="What did it cost?"
            required
          />
          <input 
            type="text"
            name="location"
            onChange={handleChange}
            value={formData.location}
            placeholder="Where did you pay it?"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" disabled >Select a Category</option>
            <option value="food" default>Food</option>
            <option value="lodging">Lodging</option>
            <option value="activity">Activity</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <textarea
            name="note"
            onChange={handleChange}
            value={formData.note}
            placeholder="Additional note"
          />
          <button className={styles['update-expense-btn']}>Save</button>
        </form>
      }

    </div>
  )
}

export default ExpenseCard