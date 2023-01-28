import "./pageStyle.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../App";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import YourCard from "../components/yourCard";
import MyButton from "../components/button";

const YourPosts = () => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadMsg, setLoadMsg] = useState(null)

  const childData = (id) => {
    setData(id)
  }

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const getPosts = () => {
    try {
      axios
        .get(`${API}/post/your/pages/${page}`)
        .then((res) => {
          // console.log("called")
          try {
            if (res.data.auth) {
              if (posts) {
                if (res.data.posts.length === posts.length) {
                  setLoadMsg("No more posts")
                }
              }
              setPosts(res.data.posts)
              setLoading(false)
              setPage(page + 1)
            } else {
              navigate("/login", { state: { msg: "Login to continue" } })
            }
          } catch (error) {
            console.log(error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const loadMore = () => {
    setLoading(true)
    getPosts(page)
  }
  return (
    <>
      <h2 style={{ color: "#a7a7a7", textAlign: "center" }}>Your Posts</h2>
      <div >
        {
          posts ? (
            <>
              <div className="your-posts">
                {
                  posts.map((post) => {
                    return (
                      //cards
                      <YourCard change={childData} key={post._id} id={post._id}
                        title={post.title} description={post.description}
                        by={post.authorId.username} anonymous={post.anonymous} />
                    )
                  })
                }
              </div>
              {
                !loadMsg ?
                  loading ? 
                  <>
                  <h2 style={{
                    textAlign: "center",
                    margin: "10px",
                    color: "white",
                  }}>
                    Loading...
                  </h2> 
                  <div style={{backgroundColor:"#00000000",height:"60px"}}></div>
                  </>
                  :
                    <div style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                      flexDirection:"column"
                    }}>
                      <MyButton onClick={loadMore} title="Load more posts" color="#ffffee" padding="10px" />
                      <div style={{backgroundColor:"#00000000",height:"60px"}}></div>
                    </div>
                  : 
                  <>
                  <h2 style={{
                    textAlign: "center",
                    margin: "10px",
                    color: "white",
                  }}>
                    {loadMsg}
                  </h2>
                  <div style={{backgroundColor:"#00000000",height:"60px"}}></div>
                  </>
              }
            </>

          ) : <Loader loading={true} />
        }
      </div>

    </>

  )
}

export default YourPosts;
