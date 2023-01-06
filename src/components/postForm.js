import "./componentStyle.css"
import MyButton from "../components/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";

const PostForm = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')


  const navigate = useNavigate()
  const [auth, setAuth] = useState(null)
  const [post, setPost] = useState({
    title: "",
    description: "",
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stat, setStat] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleFileUpload = (e) => {
    const imgFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
    }
    reader.readAsDataURL(imgFile)
  }

  useEffect(() => {
    axios
      .get(`${API}/post`)
      .then((res) => {
        // console.log("call")
        if (!res.data.auth) {
          navigate("/login", { state: { msg: "Login to continue" } })
        } else {
          setAuth(true)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postThought = () => {
    setLoading(true)
    if (post.title !== "" && post.description !== "" && image != null) {
      axios
        .post(`${API}/post`, { post, image })
        .then((res) => {
          if (res.data.stat) {
            navigate("/", { state: { message: "Posted...!" } })
          } else {
            setStat("Error occured please try again")
          }
        })
    } else {
      setStat("Fill all details")
    }
    setLoading(false)

  }

  return (
    <>
      {
        auth ? (
          <div className="postForm">
            {
              stat ? (
                <div style={{ fontSize: "20px", color: "red" }}>{stat}</div>
              ) : null
            }
            <div className="pform">
              <input
                className="ptitle"
                type="text"
                placeholder="Title"
                name="title"
                value={post.title}
                onChange={handleChange}
              />
              <textarea
                className="pdesc"
                placeholder="Description"
                name="description"
                value={post.description}
                onChange={handleChange}

              />
              {
                image ? <img style={{ width: "100%" }} src={image} alt="Your pic" /> : null
              }
              <label className="ptitle">

                <input type="file" onChange={(e) => handleFileUpload(e)} />
                <div style={{
                  color: "#a1a1a1",
                }}>
                  Upload Image
                </div>
              </label>
              <Loader loading={loading} />
            </div>
            <MyButton title="Post" height="40px" color="#a7a7a7" onClick={postThought} />
            <MyButton title="Cancel" height="35px" color="#a7a7a7" />
          </div>
        ) : (
          <Loader loading={true}/>
        )
      }
    </>

  )
}

export default PostForm;