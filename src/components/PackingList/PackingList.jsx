// css
import styles from './PackingList.module.css'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'

// npm modules
import { useState } from 'react'

// services
import * as tripService from '../../services/tripService.js'

const PackingList = ({ trip }) => {
  const [showAddPackingListItem, setShowAddPackingListItem] = useState(false)
  const [formData, setFormData] = useState({
    name: ''
  })
  const [packingList, setPackingList] = useState(trip.packingList)
  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  } 

  const handleShowAddPackingListItem = () => {
    setShowAddPackingListItem(!showAddPackingListItem)
  }

  const handleSubmitPackingListItem = async (evt) => {
    evt.preventDefault()
    tripService.createPackingListItem(formData, trip._id)
    setPackingList([...packingList, formData])
  }

  return (
    <div> 
      {!showAddPackingListItem && 
        <button 
          onClick={handleShowAddPackingListItem}
          className={styles['add-list-item-btn']}>
            <div className={styles['btn-text-icon-container']}>
              <div>Add to my List</div>
              <IoIosAddCircleOutline className={styles.icon}/>
            </div>
        </button>
      }
      {showAddPackingListItem && 
      
        <form onSubmit={handleSubmitPackingListItem} className={styles['list-form']}>
          <input 
            placeholder="Name i.e. socks, phone charger"
            name="name"
            type="text"
            value={formData.name || ''}
            onChange={handleChange}
            className={styles['list-input']}
          />
          <button className={styles['submit-btn']}><IoIosAddCircleOutline /></button>
        </form>
      }
      <div className={styles['list-container']}>
        <h1 className={styles.header}>My List</h1>
        {packingList.length && packingList.map(item => (
          <div className={styles['list-item-container']} key={item._id}>
            <input type="checkbox" selected={item.packed ? true : false} className={styles.checkbox}/>
            <p className={styles['list-item']}>{item.name}</p>
          </div>
        ))}
      </div>
    </div> 
  )
}

export default PackingList