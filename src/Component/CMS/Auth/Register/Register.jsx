import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { register } from '../../../Redux/Authslice';
import img1 from '../../../../image/Logo.png'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  // var settings={
  //  marginLeft: "200px", 

  // }
  const dispatch = useDispatch();
  const [image, setImage] = useState()
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const{redirectTooo}=useSelector((state)=>state.contents);
  // const [img, setimg] = useState("");
  const [error, setError] = useState({});

  console.log(error, "error")
  const validation = () => {
    let error = {};
    if (!user.first_name) {
      error.first_name = "fisrt_name is Required";
    }

    if (!user.last_name) {
      error.last_name = "last_name is Required";
    }


    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    )
    {
      error.email = "Enter a valid Email";
    }
      if (!user.password) {
        error.password = "Password  is Required";
      }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "first name is Required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "last name is Required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    // if (!user.email) {
    //   error.email = "Email is Required";
    // } else if (
    //   !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //     user.email
    //   )
    // ) {
    //   error.email = "Enter a valid Email";
    // }
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email name is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "@School name is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());
    let formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", image);
    dispatch(register(formData));

  };

  const RedirectUser = () => {
    let email = localStorage.getItem("email");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/register";

    if (email !== null && email !== undefined && email !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/Login");
    }
};

useEffect(()=>{
  RedirectUser()
},[redirectTooo]
  
)
  // const sendData = async (e) => {
  //   e.preventDefault();
  //   const data = { name: user.name, mobile: user.mobile,email:user.email,password:user.password };
  //   try {
  //     const response = await fetch('https://wtsacademy.dedicateddevelopers.us/api/user/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return <>
    <div>
      <div className='container'>
        <div className='row'>
          <div className="col-md-4" style={{ margin: "40px auto" }} >
            <div class="card" >
              <div className='box' style={{ marginTop: "20px",paddingLeft:"70px"}}>
                <img src={img1} class="card-img-top" alt="..." style={{ repeat: "no-repeat", height: " 100px", width: " 200px" }} />
              </div>
              <div class="card-body">
              <div style={{ paddingTop: "20px", textAlign: "center", fontSize: "20px" }}>
                <form >
                  <div class="form-group" >
                    <div class="d-flex flex-column mb-3">
                      <label>First name</label>
                      <input type="text" class="form-control" name="first_name"  onChange={(e) => postUserData(e)} />
                    <span>{error.first_name}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                      <label>Last name</label>
                      <input type="last name" class="form-control" name="last_name"  onChange={(e) => postUserData(e)} />
                      <span>{error.last_name}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                      <label>Email Address</label>
                      <input type="email" class="form-control" name="email"
                        value={user.email}
                        onChange={(e) => postUserData(e)} required />
                        <span>{error.email}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                      <label>Password</label>
                      <input type="password" class="form-control" name="password"
                        value={user.password}
                        onChange={(e) => postUserData(e)} required />
                        <span>{error.password}</span>
                    </div>
                    <div class="d-flex flex-column mb-3">
                      <label>Img</label>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        name="img"
                        accept="image/*"
                        class="form-control"
                      />
                      <span style={{ color: "red", marginLeft: "24px" }}>
                        {" "}
                        {error.password}{" "}
                      </span>
                    </div>

                    <button class="btn btn-primary" type="submit" onClick={SubmitInfo} style={{margin:"20px"}}>Submit</button>
                  </div>

                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>


}