import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Edit, io } from '../../Redux/Crudslice';
import img1 from "../../../image/Logo.png"
import { create } from '../../Redux/Authslice';
export default function Editdetails() {
  const { data } = useSelector((s) => s.crud);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(Edit(id))
  }, [id]);
  const [image, setImage] = useState("");
  const [user, setUser] = useState({
    title: "",
    description: ""
  });

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





  console.log("DETAILS", data);
  useEffect(() => {

    if (data !== null) {
      setUser({
        title: data?.title,
        description: data?.description,

      });
    }
  }, [data])


  const SubmitInfo = (e) => {
    e.preventDefault();
    console.log("nill")
    let formData = new FormData();
    formData.append("title", user.title);
    formData.append("description", user.description);
    formData.append("id",id);
    formData.append("image", image);
    dispatch(io(formData));
  }
  return (
    <>
      <div>
        <div className='container'>
          <div className='row'>
            <div className="col-md-4"  style={{ margin: " auto",marginTop:"40px" }}>
              <div class="card"  style={{width:"25rem"}}>
                <div class="card-body">

                  <div style={{ textAlign: "center", fontSize: "20px" }}>
                    <form class="container" >
                      <img src={img1} class="card-img-top" alt="..." style={{height:"100px",width:"180px",marginBottom:"20px"}} />
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
                        <label>Image</label>
                        <input type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                          name="img"
                          accept="image/*"
                          class="form-control" />

                        {image !== "" &&
                          image !== undefined &&
                          image !== null ? (
                          <img
                            height="40px"
                            src={URL.createObjectURL(image)}
                            alt=""
                            className="upload-img"
                          />

                        ) : (
                          <>
                            {data?.image === "" ? (
                              <img
                                height="70px"
                                // src={image}
                                alt=""
                                className="upload-img"
                              />
                            ) : (
                              <img
                                height="60px"
                                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data?.image}`}
                                alt=""
                                className="upload-img"
                              />
                            )}
                          </>
                        )}
                        {image === "" && (
                          <p>Drag or drop content here</p>
                        )}


                      </div>

                      <button type="submit" class="btn btn-primary" onClick={SubmitInfo}>
                        UPDATE
                      </button>
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
