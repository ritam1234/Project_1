import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "../src/Component/Sharedmodule/Footer";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect, useState } from "react";
// import Loader from "./Component/Loader/Loader";
import { check_token } from "./Component/Redux/Authslice";
import { ToastContainer } from "react-toastify";
import Header from "./Component/Sharedmodule/Header";
import Register from "./Component/CMS/Auth/Register/Register";
import Login from "./Component/CMS/Auth/Login/Login";
import ProductList from "./Component/Product/ProductList/ProductList"
import Editdetails from "./Component/Product/Editproduct/Editdetails";
const Home = lazy(() => import("../src/Component/CMS/Home/Home"));

const CreateProduct = lazy(() => import("./Component/Product/CreateProduct/CreateProduct"));

function App() {
  useEffect(() => {
  dispatch(check_token())
  }, [])
  const dispatch = useDispatch();
const [user,setUser]=useState(false)

  const name=()=>{
  setUser(user? "nill":"mm")
  }
  function PrivateRoute({ children }) {
    console.log(children, "children");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // useEffect(() => {
    //   localStorage.setItem("pathname", location?.pathname);
    // }, [location]);

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
        
   
      </>
    

    );
  }

  const PublicRouteNames = [
    {
      path: "/Register",
      Component: <Register/>,
    },
    {
      path: "/Login",
      Component: <Login/>,
    },
    {
      path: "/",
      Component: <Home/>,
    },

  ];

  const PrivateRouteNames = [
   
    // {
    //   path: "/createe",
    //   Component: <CreateProduct />,
    // },

    
      {
        path: "/CreateProduct",
        Component: <CreateProduct/>,
      },
      {
        path: "/productList",
        Component: <ProductList />,
      },
      {
        path: "/Editdetails/:id",
        Component: <Editdetails />,
      },

  
  ];


  return (
    <>
     <Suspense fallback={<h1>Loading.....</h1>}>
    <Router>
        <Header />
        <Routes>
          {PublicRouteNames?.map((route, index) => {
            return (
              <Route
              
                exact
                path={route.path}
                element={route.Component}
              />
            );
          })}

        
          {PrivateRouteNames?.map((route, index) => {
            return (
              <Route
               
                path={route.path}
                element={<PrivateRoute>{route.Component}</PrivateRoute>}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>

    </Suspense> 
{/* {user}
<button onClick={name}>button</button> */}

   
    </>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
// import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
// import { Component } from 'react';
// import ProductList from '../src/Component/ProductList/ProductList';
// import Register from './Component/CMS/Auth/Register/Register';
// import Login from './Component/CMS/Auth/Login/Login';
// import Home from './Component/CMS/Home/Home';
// import { Suspense } from 'react';
// import Footer from './Component/Sharedmodule/Footer';
// import Header from './Component/Sharedmodule/Header';

// function App() {

//   function PrivateRoute({children}){
//     console.log(children,"children");
//     const token= 
//     localStorage.getItem("token")||sessionStorage.getItem("token");

//     return token !== null && token !== undefined? (
//       children
//     ):(
//       <>
//       <Navigate to="/"/>
//       {alert("Please Login First")}
//       </>
//     );
// const pubghfhlic=[
//   {
//     path:"/",
//         Component:<Home/>

// }

// ]
//     const PrivateRouteNames=[
//       {

//         path:"/ProductList",
//         Component:<ProductList/>

//       }
//     ]

//   }

//   return (
//     <div className="App">
//        <Suspense fallback={<h2>Loading.....</h2>}>
//     <Router>
//         <Header />
//         <Routes>
//           {PublicRouteNames?.map((route, index) => {
//             return (
//               <Route
              
//                 exact
//                 path={route.path}
//                 element={route.Component}
//               />
//             );
//           })}

        
//           {PrivateRouteNames?.map((route, index) => {
//             return (
//               <Route
               
//                 path={route.path}
//                 element={<PrivateRoute>{route.Component}</PrivateRoute>}
//               />
//             );
//           })}
//         </Routes>
//         <Footer />
//       </Router>
//    </Suspense> 
//   </div>
//   );
// }


// export default App;
