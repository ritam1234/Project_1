import React from 'react'
import { useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { create } from '../../Redux/Authslice'
import img1 from "../../../image/Logo.png"
import { useNavigate} from 'react-router-dom'
export default function CreateProduct() {
  const Dispatch = useDispatch();
  const navigate=useNavigate();
  const{redirectToList}=useSelector((state)=>state.contents);
  const [image, setImage] = useState()
  const [user, setUser] = useState({
    title: "",
    description: "",
  })
  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "title") {
      if (value.length === 0) {
        setUser({ ...user, title: "" });
      }
      else {
        setUser({ ...user, title: value });
      }
    }
    if (name === "description") {
      if (value.length === 0) {
        setUser({ ...user, description: "" });
      }
      else {
        setUser({ ...user, description: value });
      }
    }
  }
  const SubmitInfo = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", user.title);
    formData.append("description", user.description);
    formData.append("image", image);
    Dispatch(create(formData));
  }
  const RedirectUser = () => {
    let title = localStorage.getItem("title");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/createproduct";

    if (title !== null && title !== undefined && title !== "") {
        // window.location.pathname = getPathname;
        isInLoginPage && navigate("/ProductList");
    }
};

useEffect(()=>{
  RedirectUser()
},[redirectToList]
  
)
  return (
    <>
      <div className='container' style={{ marginTop: "70px auto", marginBottom: "50px" }}>
        <div className='row'>
          <div className="col-md-4" style={{margin:"40px auto"}}>
            <div class="card" style={{ textAlign: "center", fontSize: "20px" }}>
             
            <div className='box'style={{marginTop:"20px"}}>
            <img src={img1} class="card-img-top" alt="..."style={{repeat:"no-repeat",height:" 100px",width:" 200px"}}/>
            </div>
              

              <div class="card-body">
                <div style={{ paddingTop: "20px" }}>
                  <form class="container" >
                    <div class="form-group">
                      <div >
                        <label>Title</label>
                        <input type="text"
                          class="form-control"
                          name="title"
                          value={user.title}
                          onChange={(e) => postUserData(e)}
                        />
                      </div>
                      <div>
                        <label>description</label>
                        <textarea
                          class="form-control"
                          name="description"
                          value={user.description}
                          onChange={(e) => postUserData(e)}

                        />

                      </div>
                      <label>Img</label>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        name="img"
                        accept="image/*"
                        class="form-control"
                      />

                    </div>

                    <button type="submit" class="btn btn-primary" onClick={SubmitInfo}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>


  )
}
