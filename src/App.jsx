// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
// import Login from './pages/Login/Login'
import LoginPage from './pages/LoginPage/LoginPage'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import TripList from './pages/TripList/TripList'
import TripDetails from './pages/TripDetails/TripDetails'
import NewTrip from './pages/NewTrip/NewTrip'
import Footer from './components/Footer/Footer'
import EditTrip from './pages/EditTrip/EditTrip'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// services
import * as authService from './services/authService'
import * as tripService from './services/tripService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddTrip = async (formData) => {
    const newTrip = await tripService.create(formData)
    setTrips([newTrip, ...trips])
    navigate(`/trips/${newTrip._id}`)
  }

  const handleDeleteTrip = async (tripId) => {
    const deletedTrip = await tripService.delete(tripId)
    const filteredTrips = trips.filter(trip => trip._id !== deletedTrip._id)
    setTrips(filteredTrips)
    navigate('/trips')
  }

  const handleUpdateTrip = async (updateFormData) => {
    const updatedTrip = await tripService.update(updateFormData)
    const updatedTrips = trips.map(trip => (
      trip._id === updateFormData._id ? updatedTrip : trip
    ))
    setTrips(updatedTrips)
    navigate('/trips')
  }

  useEffect(() => {
    const fetchAllTrips = async () => {
      const tripsData = await tripService.index()
      const usersTripsData = tripsData.filter(trip => user.profile === trip.addedBy)
      setTrips(usersTripsData)
    }
    if (user) fetchAllTrips()
  }, [user])

  return (
    <>
      <ScrollToTop />
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<LoginPage handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute user={user}>
              <TripList trips={trips} handleDeleteTrip={handleDeleteTrip} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips/:tripId"
          element={
            <ProtectedRoute user={user}>
              <TripDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips/new"
          element={
            <ProtectedRoute user={user}>
              <NewTrip handleAddTrip={handleAddTrip} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips/:tripId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditTrip handleUpdateTrip={handleUpdateTrip} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <Landing handleAuthEvt={handleAuthEvt} user={user}/>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
