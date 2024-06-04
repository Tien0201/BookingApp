import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js"

const Navbar = () => {

  const {user} = useContext(AuthContext)
  const logOut = ()=>{
    localStorage.removeItem("user");
    window.location.reload();

  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}> 
        <span className="logo">BookingApp</span>
        </Link>
        {user ? (
        <div>
            Hello {user.username}
          <button onClick={logOut} className="navButton">Logout</button>
        </div>
      ) : (
        <div className="navItems">
          <a href="/register"><button className="navButton">Register</button></a>
          <a href="/login"><button className="navButton">Login</button></a>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar