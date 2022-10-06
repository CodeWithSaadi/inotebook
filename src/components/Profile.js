import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";



const Profile = () => {

  const context = useContext(noteContext);
  let navigate = useNavigate(); // Hook To redirect authtoken and save (useHistory())
  const { user, getUser, editUser } = context;



  useEffect(() => {
    //fetch notes

    if (localStorage.getItem("token")) {
      // for authtoken -- if condition is true (authtoken match) access notes else go back to login
      getUser();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);





//   Update note function 

const ref = useRef(null)
 const refClose = useRef(null)
const [userup, setUserup] = useState({ ename: ""})


const updateUser = (currentUser) => {
    ref.current.click()                       //To open Modal --From Modal JS
    setUserup({ id: currentUser._id, ename: currentUser.name})
}


    // Functions inside 'form to edit '
    const handleSubmit = (e) => {
        editUser(userup.id, userup.ename)
        refClose.current.click();
        // props.showAlert("Updated Successfully", "success")
    }
    const onChangeUser = (e) => {
        setUserup({ ...userup, [e.target.name]: e.target.value })
    }





  return (
    <div>
      <div className="container row my-3 py-3 justify-content-center bg-light">
        <h2>Your Profile </h2>

   
          <div className="card">
            <div className="card-body ">
              <div className="d-flex">
                <h5 className="card-title"><u> Name:</u> &nbsp;{user.name} </h5>
              </div>

              <p className="card-text"><u> Description:</u> &nbsp;{user.email}</p>
              <p className="card-text"><u>Id:</u> &nbsp; {user._id}</p>
            </div>
          </div>
          
          <i className="fa-solid fa-pen-to-square" onClick={() => { updateUser(userup) }}></i>

      </div>






    {/* <!-- Button trigger modal    -- This Modal is used to update notes--> */}
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='ename' aria-describedby="emailHelp" value={userup.ename} onChange={onChangeUser} minLength={3} required />
                                </div>
                                {/* <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChangeNote} minLength={5} required />
                                </div> */}

                                {/* <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChangeNote} minLength={3} required />
                                </div> */}


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

















    </div>
  );
};

export default Profile;
