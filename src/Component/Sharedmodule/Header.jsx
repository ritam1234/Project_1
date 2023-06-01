import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import img1 from "../../image/Logo.png"
import { handlelogout } from '../Redux/Authslice'
import { useDispatch, useSelector } from 'react-redux'
export default function Header() {
  const{isloggedIn}=useSelector((state)=>state.contents);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logout=()=>{
    dispatch(handlelogout())
    navigate("/Login")
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/"> <div className='box'style={{marginTop:"auto"}}>
            <img src={img1} class="card-img-top" alt="..."style={{repeat:"no-repeat",height:" 60px",width:" 120px"}}/>
            </div></Link>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
 <div className='container' >
  <div className="row"style={{fontSize:"22px",fontFamily:"cursive"}}>

    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
    
      <li class="nav-item">
        <Link class="nav-link" to="/Login">Login</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/CreateProduct">List Products</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/ProductList">Products</Link>
      </li>
     
    </ul>
   
  </div>
 

    </div>

    {isloggedIn ?<button onClick={logout}>logout</button> : <button>Login</button>}
  
  </div>
 
 
</nav>
    </>
  )
}
