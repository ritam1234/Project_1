import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { login, reset_redirectTo,reset_redirectTooo, reset_register } from '../../../Redux/Authslice';
import img1 from '../../../../image/Logo.png'
export default function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const{redirectTo,redirectTooo}=useSelector((state)=>state.contents);
  const register=()=>{
    dispatch(reset_register());
    navigate("/Register")
  };
  const [user, setUser] = useState({
    // name: "",
    email: "",
    // mobile: "",
    password: "",
  });
  const [error, setError] = useState({})
 

  const validation = () => {
    let error = {};

    // if (!user.name) {

    //   error.name = "Name is Required";
    // }

    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a valid Email";
    }

    // if (!user.mobile) {
    //   error.mobile = "Phone is Required";
    // }

    if (!user.password) {
      error.password = "password is Required";
    }
    // else if(user.password!=value){
    //   error.password="invalid password";
    // }

    // if (!user.img) {
    //   error.img = "Image name is Required";

    // }
    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    // if (name === "name") {
    //   if (value.length === 0) {
    //     setError({ ...error, name: "Name is Required" });
    //     setUser({ ...user, name: "" });
    //   } else {
    //     setError({ ...error, name: "" });
    //     setUser({ ...user, name: value });
    //   }
    // }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "@Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    // if (name === "mobile") {
    //   if (value.length === 0) {
    //     setError({ ...error, mobile: "@Phone is Required" });
    //     setUser({ ...user, mobile: "" });
    //   } else {
    //     setError({ ...error, mobile: "" });
    //     setUser({ ...user, mobile: value });
    //   }
    // }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "@password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
    // if (name === "img") {
    //   if (value.length === 0) {
    //     setError({ ...error, img: "@School name is Required" });
    //     setUser({ ...user, img: "" });
    //   } else {
    //     setError({ ...error, img: "" });
    //     setUser({ ...user, img: value });
    //   }
    // }
  };

  const submit = (e) => {
    e.preventDefault()
    setError(validation())
    let formdata = new FormData();
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    dispatch(login(formdata));
  };


  const RedirectUser = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token !== null && token !== undefined && token !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/productlist");
    }
};

useEffect(()=>{
  RedirectUser()
},[redirectTo]
)

useEffect(()=>{
  dispatch(reset_redirectTooo(null))
},[redirectTooo])


  return (

    <>


      <div >.
        <div className='container'>
          <div className='row'>
            <div className="col-md-4" style={{ margin: "40px auto" }} >
              <div class="card" >
                <div className='box' style={{ marginTop: "20px", paddingLeft: "70px" }}>
                  <img src={img1} class="card-img-top" alt="..." style={{ repeat: "no-repeat", height: " 100px", width: " 200px" }} />
                </div>
                <div class="card-body">
                  <div style={{ paddingTop: "20px", textAlign: "center", fontSize: "20px" }}>
                    <form>
                      <div class="form-group" >
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" value={user.email} name="email" onChange={postUserData} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <span style={{ color: "red" }}>{error.email}</span>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" value={user.password} onChange={postUserData} name="password" class="form-control" id="exampleInputPassword1" />
                        <span style={{ color: "red" }}>{error.password}</span>
                      </div>
                      <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>

                      <Link to="/Register" onClick={register}>Go For Registration</Link>
                      <button type="submit" onClick={submit} class="btn btn-primary">Login</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
