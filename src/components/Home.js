
import Notes from './Notes';



const Home = (props) => {



  const { showAlert } = props  // destructuring method


  return (
    <div>



      <Notes showAlert={showAlert} />

    </div>
  )
}

export default Home