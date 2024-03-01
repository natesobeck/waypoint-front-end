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
    category: 'food',
    cost: '',
    note: ''
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleShowAddExpense = () => {
    setShowAddExpense(!showAddExpense)
  }

  return (  
    <div className={styles.container}>
      {!showAddExpense &&
        <button 
          className={styles['add-expense-btn']}
          onClick={handleShowAddExpense}
        >
          <div 
            className={styles['btn-text-icon-container']}
          >
            Add an Expense 
            <IoIosAddCircleOutline 
              className={styles.icon}
            />
          </div>
        </button>
      }
      {showAddExpense &&
        <form className={styles.form}>
          <h3>Add an Expense</h3>
          <input 
            type="text"
            name="expense"
            onChange={handleChange}
            value={formData.expense}
            placeholder="What expense are you adding? i.e. plane tickets"
          />
          <input 
            type="number"
            name="cost"
            onChange={handleChange}
            value={formData.cost}
            placeholder="What did it cost?"
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
            <option value="" disabled selected>Select a Category</option>
            <option value="food" default>Food</option>
            <option value="lodging">Lodging</option>
            <option value="activity">Activity</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <button className={styles['create-expense-btn']}>Create Expense</button>
        </form>
      }
      <h1>Expenses</h1>
    </div>
  )
}

export default ExpenseList