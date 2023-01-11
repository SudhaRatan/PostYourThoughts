import "./componentStyle.css"
import MyButton from "../components/button";
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"
import { API } from "../App";
import Loader from "./loader";

const LoginForm = () => {
  const [authStat, setAuthStat] = useState(null)

  useEffect(() => {
    // console.log(location)
    if (!localStorage.getItem("token")) {
      try {
        if (location.state.msg) {
          setAuthStat(location.state.msg)
        }
      } catch (error) {

      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStat])

  const navigate = useNavigate()
  const location = useLocation()

  const [error, setError] = useState(null)
  const [post, setPost] = useState({
    username: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)

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
        .post(`${API}/login`, post)
        .then((res) => {
          if (res.data.auth) {
            setError(null)
            localStorage.setItem("token", res.data.token)
            navigate("/")
          } else {
            setError(res.data)
          }
        })
    } else {
      setError("Enter all details")
    }
    setLoading(false)
  }
  return (
    <div className="postForm">
      {
        authStat ? (
          <div style={{ color: "red" }}>{authStat}</div>
        ) : null
      }
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
          name="username"
          value={post.username}
          onChange={handleChange}

        />
        <input
          className="ptitle"
          type="password"
          placeholder="Password"
          name="password"
          value={post.password}
          onChange={handleChange}
        />
        <MyButton onClick={handleClick} title="Login" height="40px" color="#a7a7a7" />
        <span style={{ fontSize: "18px" }}>New user?</span>
        <MyButton onClick={() => navigate("/signup")} title="Signup" height="35px" color="#a7a7a7" />
      </div>

    </div>
  )
}

export default LoginForm;