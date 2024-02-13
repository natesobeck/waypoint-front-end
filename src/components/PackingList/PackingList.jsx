// css
import styles from './PackingList.module.css'

// components
import { IoIosAddCircleOutline } from 'react-icons/io'

// npm modules
import { useState } from 'react'

const PackingList = ({ list }) => {
  const [showAddPackingListItem, setShowAddPackingListItem] = useState(false)

  const handleShowAddPackingListItem = () => {
    setShowAddPackingListItem(!showAddPackingListItem)
  }

  return (

    <> 
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
      <div className={styles['list-container']}>
        <h1 className={styles.header}>My List</h1>
        {list.length && list.map(item => (
          <div className={styles['list-item-container']} key={item.name}>
            <input type="checkbox" selected={item.packed ? true : false} className={styles.checkbox}/>
            <p className={styles['list-item']}>{item.name}</p>
          </div>
        ))}
      </div>
    </> 
  )
}

export default PackingList