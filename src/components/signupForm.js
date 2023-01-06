import "./componentStyle.css"
import MyButton from "../components/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../App";
import "axios";
import axios from "axios";
import Loader from "./loader";

const SignupForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [post, setPost] = useState({
    username: "",
    password: "",
  })

  const [loading,setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleClick = () => {
    setLoading(true)
    if (post.username !== "" && post.password !== "") {
      axios
        .post(`${API}/login/signup`, post)
        .then((res) => {
          if(res.data.status){
            navigate('/login',{state:{msg:"Login to continue"}})
          } else{
            setError(res.data.error)
          }
        })
    } else {
      setError("Enter all details")
    }
    setLoading(false)
  }

  return (
    <div className="postForm">
      <Loader loading={loading} />
      {
        error ? (
          <div style={{ fontSize: "20px" }}>{error}</div>
        ) : null
      }
      <div className="pform">
        <input
          className="ptitle"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={post.username}

        />
        <input
          className="ptitle"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={post.password}
        />
        <MyButton onClick={handleClick} title="Signup" height="40px" color="#a7a7a7" />
        <span style={{ fontSize: "18px" }}>Already a User?</span>
        <MyButton onClick={() => navigate('/login')} title="Login" height="35px" color="#a7a7a7" />
      </div>

    </div>
  )
}

export default SignupForm;