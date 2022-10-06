import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

import { useSelector } from 'react-redux'

const Navbar = (props) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const handleProfile = () => {
      
        navigate('/profile');
    }

    const amount = useSelector(state => state.amount )

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <img src={logo} alt="" />
                    {props.inotebook}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                {props.home}
                            </li>
                            <li className="nav-item active">
                                {props.about}

                            </li>


                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" >
                            <Link to="/login" className="btn btn-outline-info mx-1" role="button">LogIn</Link>
                            <Link to="/signup" className="btn btn-outline-info mx-1" role="button">SignUp</Link>
                        </form> : <div> 
                        <div disabled ={ true }className=" btn btn-success mx-5">Your Notes: {amount} </div>
                           <button onClick={handleLogout} className="btn btn-outline-info mx-2">Logout</button>
                            <button onClick={handleProfile} className="btn btn-outline-info mx-2">Profile</button>
                        </div>}
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar