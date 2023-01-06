import Card from "../components/card";
import "./pageStyle.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const YourPosts = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios
      .get(`${API}/post/your`)
      .then((res) => {
        // console.log("called")
        try {
          if (res.data.auth) {
            console.log(res.data.posts)
            setPosts(res.data.posts)
          } else {
            navigate("/login", { state: { msg: "Login to continue" } })
          }
        } catch (error) {
          console.log(error)
        }

      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="your-posts">
      {
        posts ? (
          posts.map((post) => {
            return (
              //cards
              <Card key={post._id} title={post.title} description={post.description} imageData={post.imageData} by={post.authorId.username} />
            )
          })

        ) : <Loader loading={true} />
      }
    </div>

  )
}

export default YourPosts;
