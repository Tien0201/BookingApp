import { useState } from "react"
import "./login.scss"
import { useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password : undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()


    const handleChange = (e) =>{
        setCredentials(prev =>({...prev , [e.target.id] : e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:8800/api/auth/login" , credentials)
            
            if(res.data.isAdmin){
                dispatch({type:"LOGIN_SUCCESS" , payload : res.data.details})   
                navigate("/") 
            }else{
                dispatch({type:"LOGIN_FAILURE" , payload : {message : "You Are Not Allowed"} })   
            }


        }catch (err){
            dispatch({type:"LOGIN_FAILURE" , payload : err.response.data})
        }
    }

    // console.log("user",user)
  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username"  id="username" onChange={handleChange} className="lInput" />
            <input type="password" placeholder="password"  id="password" onChange={handleChange} className="lInput" />
            <button disabled={loading} onClick = {handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login
