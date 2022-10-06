import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
    const { showAlert } = props  //destructuring method

    const context = useContext(noteContext)
    let navigate = useNavigate();                            // Hook To redirect authtoken and save (useHistory())
    const { notes, getNotes, editNote } = context;

    useEffect(() => {       //fetch notes

        if (localStorage.getItem('token')) {           // for authtoken -- if condition is true (authtoken match) access notes else go back to login
            getNotes();
        }
        else {
            navigate('/login');

        }

        // eslint-disable-next-line
    }, [])



    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updateNote = (currentNote) => {
        ref.current.click()                       //To open Modal --From Modal JS
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }



    // Functions inside 'form '



    const handleSubmit = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
    }
    const onChangeNote = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <>
            <AddNote showAlert={showAlert} />

            {/* <!-- Button trigger modal    -- This Modal is used to update notes--> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChangeNote} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChangeNote} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChangeNote} minLength={3} required />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length < 3} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>





{/* Div of Fitch All Nottes */}

            <div className="container row my-3 py-3 justify-content-center bg-light">
                <h2>Your Notes </h2>
                {/* if there is nothing in 'else' then use && in condition */}
                {notes.length === 0 && 'No notes to display'}
                {notes.map((note) => {

                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
                })}

            </div>
        </>
    )
}
  
export default Notes