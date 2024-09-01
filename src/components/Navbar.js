// type --> rfc --> automatically generate the snippet
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { FaShoppingCart } from 'react-icons/fa'; 

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -10, 
      top: 5, 
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    let data = useCart()
    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    return (
        <div>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 " to="/">FoodieFind</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto ">
                            <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
                            {(localStorage.getItem("authToken")) ?
                                <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">My Orders</Link>
                                : ""
                            }
                        </div>
                        <div>
                            {(!localStorage.getItem("authToken")) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-2" to="/createUser">SignUp</Link>
                                </div>
                                :
                                <div>
                                    <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                                        My Cart {"     "}
                                        <StyledBadge badgeContent={data.length} color="error">
                                            <FaShoppingCart />
                                        </StyledBadge>
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                    <div className="btn bg-danger text-white mx-2" onClick={signOut}>
                                        LogOut
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
