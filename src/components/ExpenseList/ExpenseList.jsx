// npm modules
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'
import ExpenseCard from '../ExpenseCard/ExpenseCard'
import AddExpenseForm from '../AddExpenseForm/AddExpenseForm'

// css
import styles from './ExpenseList.module.css'

// services
import * as tripService from '../../services/tripService'

const ExpenseList = ({ trip, expenses, setExpenses }) => {

  const [showAddExpense, setShowAddExpense] = useState(false)
  const [formData, setFormData] = useState({
    expense: '',
    location: '',
    category: 'food',
    cost: '',
    note: ''
  })
  const [totalExpense, setTotalExpense] = useState(null)

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleShowAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const newExpenses = await tripService.createExpense(formData, trip._id)
    setShowAddExpense(false)
    setExpenses([...newExpenses])
  }

  useEffect(() => {
    function getTotalExpense(expenses) {
      const total = expenses.reduce((totalExpenses, currentExpense) => {
        return totalExpenses + currentExpense.cost
      }, 0)
      return total
    }
    setTotalExpense(getTotalExpense(expenses))
  }, [expenses])

  return (  
    <div className={styles.container}>
      <button 
        className={styles['add-expense-btn']}
        onClick={handleShowAddExpense}
      >
        <div 
          className={styles['btn-text-icon-container']}
        >
          Add
          <IoIosAddCircleOutline 
            className={styles.icon}
          />
        </div>
      </button>
      {showAddExpense && createPortal(
        <AddExpenseForm 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          setShowAddExpense={setShowAddExpense}
        />,
        document.body
      )}
      <h2 className={styles['total-message']}>Total trip cost: <span className={styles.total}>${totalExpense}</span></h2>
      {expenses.length
        ? <div 
            className={styles['expense-list-container']}
          >
            {expenses.map(expense => (
            <ExpenseCard 
              expense={expense}
              key={expense._id}
              expenses={expenses}
              setExpenses={setExpenses}
              tripId={trip._id}
            />
            ))}
          </div>
        : <h3 className={styles.empty}>You don't have any expenses here yet!</h3>
      }
    </div>
  )
}

export default ExpenseList