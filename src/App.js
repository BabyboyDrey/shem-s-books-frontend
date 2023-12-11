import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage.js/HomePage'
import CategoriesPage from './Pages/CategoriesPage/CategoriesPage.jsx'
import BestSellingPage from './Pages/BestSellingPage/BestSellingPage.jsx'
import AllEventsPage from './Pages/AllEventsPage/AllEventsPage.jsx'
import MostAffordablePage from './Pages/MostAffordablePage/MostAffordablePage.jsx'
import SignUpPage from './Pages/SignUpPage/SignUpPage.jsx'
import LoginPage from './Pages/LoginPage/LoginPage.jsx'
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage.jsx'
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage.jsx'
import SingleEventPage from './Pages/SingleEventPage/SingleEventPage.jsx'
import CheckOutPage from './Pages/CheckOutPage/CheckOutPage.jsx'
import OrderSuccessPage from './Pages/OrderSuccessPage/OrderSuccessPage.jsx'
import ActivationPage from './Pages/ActivationPage/ActivationPage.jsx'
import SellerSignUpPage from './Pages/SellerRoutes/SellerSignUpPage/SellerSignUpPage.jsx'
import SellerLoginPage from './Pages/SellerRoutes/SellerLoginPage/SellerLoginPage.jsx'
import SellerDashboardPage from './Pages/SellerRoutes/SellerDashboardPage/SellerDashboardPage.jsx'
import SellerActivationPage from './Pages/SellerRoutes/SellerActivationPage/SellerActivationPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Store from './redux/store.js'
import { loadUser } from './redux/actions/users.js'
import { loadSeller } from './redux/actions/sellers.js'
import UserProtectedRoute from './routes/UserProtectedRoute.js'
import SellerProtectedRoute from './routes/SellerProtectedRoute.js'

function App () {
  const [active, setActive] = useState(0)
  const scrollTopRef = useRef(null)
  useEffect(() => {
    scrollTopRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller())
  }, [])

  //shh trail

  return (
    <BrowserRouter>
      <span ref={scrollTopRef} />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route
          path='/'
          element={<HomePage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path='/categories'
          element={<CategoriesPage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path='/best-selling'
          element={<BestSellingPage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path='/all-events'
          element={<AllEventsPage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path='/most-affordable'
          element={<MostAffordablePage active={active} setActive={setActive} />}
        ></Route>
        <Route
          path='/book/:id'
          element={<SingleProductPage active={active} setActive={setActive} />}
        ></Route>
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/seller/sign-up' element={<SellerSignUpPage />}></Route>
        <Route path='/seller/login' element={<SellerLoginPage />}></Route>
        <Route
          path='/profile'
          element={
            <UserProtectedRoute>
              <UserProfilePage />
            </UserProtectedRoute>
          }
        ></Route>
        <Route path='/event/:id' element={<SingleEventPage />}></Route>
        <Route
          path='/checkout'
          element={
            <UserProtectedRoute>
              <CheckOutPage />
            </UserProtectedRoute>
          }
        ></Route>
        <Route
          path='/success'
          element={
            <UserProtectedRoute>
              <OrderSuccessPage />
            </UserProtectedRoute>
          }
        ></Route>
        <Route
          path='/activation/:activation_token'
          element={<ActivationPage />}
        ></Route>
        <Route
          path='/seller/activation/:activation_token'
          element={<SellerActivationPage />}
        ></Route>
        <Route
          path='/seller/dashboard'
          element={
            <SellerProtectedRoute>
              <SellerDashboardPage />
            </SellerProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
