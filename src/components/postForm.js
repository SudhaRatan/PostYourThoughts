import "./componentStyle.css"
import MyButton from "../components/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import Compressor from "compressorjs"

const PostForm = (props) => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.put['x-access-token'] = localStorage.getItem('token')


  const navigate = useNavigate()
  const [auth, setAuth] = useState(null)
  const [check, setCheck] = useState(false)
  const [update, setUpdate] = useState(false)
  const [post, setPost] = useState({
    title: "",
    description: "",
    anonymous: false
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stat, setStat] = useState(null)

  const [uid, setUid] = useState(null)

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
    setLoading(true)
    const image123 = e.target.files[0]
    new Compressor(image123, {
      quality: 0.8,
      success: (compressedImage) => {
        // const imgFile = compressedImage
        convertFile(compressedImage)
      }
    })
  }

  const convertFile = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result.toString())
      setInterval(() => {
        setLoading(false)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!props.data) {
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
    } else {
      setLoading(true)
      axios
        .get(`${API}/post/your/${props.data.id}`)
        .then((res) => {
          // console.log(res.data.thought)
          setPost({
            title: res.data.thought.title,
            description: res.data.thought.description,
          })
          setImage(res.data.thought.imageData)
          setUid(res.data.thought._id)
          setCheck(res.data.thought.anonymous)
          setUpdate(true)
          setLoading(false)
        })
      setAuth(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const postThought = () => {
    setLoading(true)
    if (post.title !== "" && post.description !== "" && image != null) {
      axios
        .post(`${API}/post`, { post, image, check })
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

  const updateThought = () => {
    setLoading(true)
    if (post.title !== "" && post.description !== "" && image != null) {
      axios
        .put(`${API}/post/your/${uid}`, { post, image, check })
        .then((res) => {
          if (res.data.stat) {
            navigate("/", { state: { message: "Post updated...!" } })
          } else {
            setStat("Error occured please try again")
          }
        })
    } else {
      setStat("Fill all details")
    }
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
              <div>
                <input
                  name="anonymous"
                  type="checkbox"
                  checked={check}
                  onChange={()=>{setCheck(!check)}}
                />&nbsp;
                <label htmlFor="anonymous">Anonymous Post</label>
              </div>
              <Loader loading={loading} />
            </div>
            {
              update ? (
                <MyButton title="Update" height="40px" color="#a7a7a7" onClick={updateThought} />
              ) : (
                <MyButton title="Post" height="40px" color="#a7a7a7" onClick={postThought} />
              )
            }

            <MyButton title="Cancel" height="35px" color="#a7a7a7" />
          </div>
        ) : (
          <Loader loading={true} />
        )
      }
    </>

  )
}

export default PostForm;