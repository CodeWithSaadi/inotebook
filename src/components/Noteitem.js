import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';



const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;





    return (
        <div className='col-md-3 my-3' >
            <div className="card" >
                <div className="card-body ">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title} </h5>
                        <i className="fa-solid fa-trash mx-3" onClick={() => { deleteNote(note._id); showAlert("Note is Deleted", "warning"); }}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                    </div>

                    <p className="card-text"> <u> Description:</u> &nbsp;{note.description} </p>
                    <p className="card-text"><u>Tag:</u> &nbsp; {note.tag} </p>

                </div>
            </div>

        </div>
    )
}

export default Noteitem