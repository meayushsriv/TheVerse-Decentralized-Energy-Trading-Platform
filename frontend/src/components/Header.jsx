import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser,FaEthereum } from 'react-icons/fa'
import {AiFillDashboard} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>BCEnergy</Link>
      </div>
      <ul>
        {user ? (
            <>
            <li>
              <Link to='/dashboard'>
                <AiFillDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to='/payment'>
                <FaEthereum /> payment
              </Link>
            </li>
            <li>
                <button className="btn" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header