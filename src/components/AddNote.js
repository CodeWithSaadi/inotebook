import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {

    const context = useContext(noteContext)            //useContext
    const { addNote } = context;                         //p


    const [note, setNote] = useState({ title: "", description: "", tag: "" })




    const handleSubmit = (e) => {
        // e.preventDefault();         //    Ia used to not submit page at current time, But we don't use here
        addNote(note.title, note.description, note.tag);
        // setNote({ title: "", description: "", tag: "" })

        props.showAlert("Updated Successfully", "success")

    }
    //(... = Spread Operator = remains the previous property and change what comes next )
    const onChangeNote = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="my-3">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChangeNote} minLength={3} required value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChangeNote} minLength={5} required value={note.description} />
                </div>
{/* 
                <div className="mb-3">
                     <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChangeNote} minLength={3} required value={note.tag} />
                </div> */}

                <div className="form-group">
    <label htmlFor="tag">Select Tag</label>
   Tag: <select className="form-control" id="tag" name='tag' onChange={onChangeNote}>
      <option>111</option>
      <option>222</option>
      <option>3333</option>
      <option>4444</option>
      <option>5555</option>
    </select>
  </div>

                <button disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary mx-2 my-1" onClick={handleSubmit} >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote