// npm packages
import { useState } from 'react'
import { createPortal } from 'react-dom'

// css
import styles from './ExpenseCard.module.css'

// components
import CategoryIcon from '../CategoryIcon/CategoryIcons'
import EditExpenseForm from '../EditExpenseForm/EditExpenseForm.jsx'
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

      {showUpdate && createPortal(
        <EditExpenseForm 
          handleSubmitUpdateExpense={handleSubmitUpdateExpense}
          handleChange={handleChange}
          setShowUpdate={setShowUpdate}
          expense={expense}
          formData={formData}
        />,
        document.body
      )}

    </div>
  )
}

export default ExpenseCard