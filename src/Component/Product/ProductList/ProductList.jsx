import React from 'react'
import { Link,useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Display, newproduct, reset_redirectproduct } from '../../Redux/Authslice';
import { image } from '../../Redux/Helper';
import { del } from '../../Redux/Crudslice';
import SweetAlertComponent from '../../SweetAlert/SweetAlert';
import { reset_redirectTo } from '../../Redux/Authslice';
export default function ProductList() {
  const Dispatch = useDispatch();
  const Navigate=useNavigate();
  const [delete_id, setDelete_id] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const { data } = useSelector((s) => s.contents);
  const { redirectTo } = useSelector((s) => s.contents);
  const { redirectToList } = useSelector((s) => s.contents);
  const add=()=>{
    Dispatch(newproduct())
    Navigate("/CreateProduct")
  }
  useEffect(() => {
    Dispatch(Display())
  }, [])
  // const Delete_func = (id) => {
  //   if (delete_id !== "") {
  //     Dispatch(del(delete_id)).then(Dispatch(Display()))
  //   }
  //   // if (delete_id !== "") {

  //   // }
  //   setDelete_id("");
  //   setIsDelete(false);

  
  // };
useEffect(()=>{
  Dispatch(reset_redirectTo(null))
},[redirectTo])

useEffect(()=>{
  Dispatch(reset_redirectproduct(null))

},[redirectToList])

  const delete_funcc = (id) => {
     if (delete_id !== "") {
       Dispatch(del({ id: delete_id })).then(() => { Dispatch(Display()) })
     }
     setDelete_id("");
     setIsDelete(false);
   }
  return (
    <>
     
        
            <div className='container' style={{ marginTop: "70px auto", marginBottom: "50px" }}>
              <div className='row'>
                <div className="col-md-4" >
                {data?.map((item) => {
                  return(
                  <div class="card" style={{ textAlign: "center", fontSize: "20px",width:"20rem" }}>
                    {/* <img src={} class="card-img-top" alt="..." height="250px" /> */}

                    <div class="card-body">
                      <img
                        height="200px"
                        width="200px"
                        src={
                          item?.image
                            ? image(item?.image)
                            : "error"
                        }
                        alt="No Image"
                      />
                      <div style={{ paddingTop: "50px" }}>
                        <h5 class="card-title">{item.title}</h5>
                        <p class="card-text">


                          {item.description}

                        </p>

                        <Link to={`/Editdetails/${item._id}`} class="btn btn-primary" style={{ marginRight: "30px", paddingRight: "30px" }}>
                          Edit
                        </Link>
                        <Link to='' onClick={() => {
                    setDelete_id(item?._id);
                    setIsDelete(true);
                  }} class="btn btn-primary mr">Delete</Link>

                      </div>
                    </div>
                  </div>
                  )
                })}
                </div>


              </div>
              
            </div>
            <div className='container'>
            <Link to="/CreateProduct" onClick={add} className='btn btn-primary'>Add New Product</Link>
            </div>
        
        {isDelete && (
        <SweetAlertComponent
          confirm={delete_funcc}
          cancle={() => setIsDelete(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
    </>

  )
}


