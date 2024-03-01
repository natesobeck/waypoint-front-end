// npm modules
import { useState } from 'react'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'

// css
import styles from './ExpenseList.module.css'

const ExpenseList = () => {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [formData, setFormData] = useState({
    expense: '',
    location: '',
    category: '',
    cost: 0,
    note: ''
  })
  // const handleChange = evt => {
  //   setFormData({ ...formData, [evt.target.name]: evt.target.value})
  // }

  const handleShowAddExpense = async (evt) => {
    evt.preventDefault()
    setShowAddExpense(!showAddExpense)
  }

  return (  
    <div className={styles.container}>
      {!showAddExpense &&
      <button 
        className={styles['add-expense-btn']}
        onClick={setShowAddExpense}
      >
        <div 
          className={styles['btn-text-icon-container']}
        >
          Add an Expense <IoIosAddCircleOutline 
            className={styles.icon}
          />
        </div>
      </button>}
      {showAddExpense &&
        <h1>THis is an add expense form</h1>
      }
      <h1>Expenses</h1>
    </div>
  )
}

export default ExpenseList