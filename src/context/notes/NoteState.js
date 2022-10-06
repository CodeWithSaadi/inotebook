import noteContext from './noteContext';
import { useState } from 'react';


const NoteState = (props) => {

const host = "http://localhost:5000"

  const notesInitial = []
  const userInitial = []


let [notes, setNotes ] = useState(notesInitial)
let [user, setUser ] = useState(userInitial)


//   // FETCH ALL NOTES ------------------------------------------------------------------
const getNotes = async () =>{
 

  //api call
  const response = await fetch(`${host}/api/note/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
     'auth-token': localStorage.getItem('token')
    },
  });

 const json = await response.json()

setNotes(json) 
}






  // ADD NOTES ------------------------------------------------------------------
 const addNote = async (title, description, tag) =>{


  // api call
  const response = await fetch(`${host}/api/note/addnote`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
     'auth-token': localStorage.getItem('token')
    },
    
    body: JSON.stringify({title, description, tag}) 
  });
  const note = await response.json();
  setNotes=(notes.concat(note));           

}






  // DELETE A NOTE ------------------------------------------------------------------
const deleteNote = async (id) =>{
 const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)


  //api call
  const response = await fetch(`${host}/api/note/deletenote/${id}`, {
    method: 'DELETE',     
    headers: {
      'Content-Type': 'application/json',
     'auth-token': localStorage.getItem('token')
    },
  });

 const json = await response.json()
console.log(json)
}





// EDIT A NOTE   ------------------------------------------------------------------
  const editNote = async(id, title, description, tag) =>{
  
//api call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
      },
     
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
  console.log(json);


let newNotes = JSON.parse(JSON.stringify(notes))     // this function is used to update note on front end
    // logic to edit note 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;        
        newNotes[index].description = description;        
        newNotes[index].tag = tag;        
        break;
      }
    }
    setNotes(newNotes);
  }



  // FETCH USER ------------------------------------------------------------------
  const getUser = async () =>{
 

    //api call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
      },
    });
  
   const json = await response.json()
  
  setUser(json) 
  }
  
   
// EDIT A USER  ------------------------------------------------------------------
const editUser = async(id, name) =>{
  // const newUser = notes.filter((note)=>{return note._id!==id})
  //api call
      const response = await fetch(`${host}/api/note/updateuser/${user}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
         'auth-token': localStorage.getItem('token')
        },
       
        body: JSON.stringify({name})
      });
      const json = await response.json(); 
    console.log(json);
  
  
  let newUser = JSON.parse(JSON.stringify(user))     // this function is used to update note on front end
      // logic to edit note 
      for (let index = 0; index < newUser.length; index++) {
        const element = newUser[index];
        if (element._id === id) {
          newUser[index].name = name;        
          // newNotes[index].description = description;        
          // newNotes[index].tag = tag;        
          break;
        }
      }
      setUser(newUser);
    }












  
    return (
        <noteContext.Provider value={{notes, addNote , deleteNote, editNote, getNotes, getUser, user, editUser}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;








                                           //We can call this useState and/or value here and use everywhere we need 
  // import { useState } from 'react';
  // const s1 = {
  //     "name": "Harry",
  //     "class": "5b"
  // }


    // ____________________________________________________
                                              // import { useContext, useEffect } from 'react'
// import noteContext from '../context/notes/noteContext'
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {                      //UseState  -- 
    //         setState({
    //             "name": "Saadi",
    //             "class": "0.5b"
    //         })
    //     }, 3000);
    // }




// This will used where we want to use useState    
  // const a = useContext(noteContext)        //Context  
  // useEffect(() => {                        //UseEffect -- because useState is defined in 'NoteState.js'
  //   a.update();
  //   /* eslint-disable */                  // to remove warning
  // }, [])