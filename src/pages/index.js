import './pageStyle.css'
import Card from '../components/card';
import PopUp from '../components/navbar/popupMsg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import Loader from '../components/loader';
import MyButton from '../components/button';


const Index = () => {
    // const navigate = useNavigate()
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState(null)
    const [posts, setPosts] = useState(null)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadMsg, setLoadMsg] = useState(null)

    useEffect(() => {
        getHome(page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const getHome = () => {
        try {
            // console.log(location.state)
            axios
                .get(`${API}/home/${page}`)
                .then((res) => {
                    try {
                        if (res.data.posts.length === 0) {
                            setLoadMsg("No more posts")
                        } else {
                            var temp
                            if (posts == null) {
                                temp = []
                            }
                            else {
                                temp = posts
                            }
                            temp.push(...res.data.posts)
                            setPosts(temp)
                            setLoading(false)
                            setPage(page + 1)
                        }

                    } catch (error) {
                        console.log(error)
                    }
                })
            if (location.state.message) {
                setMsg(location.state.message)
                setVisible(true)
                setTimeout(() => {
                    location.state.message = null
                    setVisible(false)
                }, 2000)
            }
        } catch (error) {
        }
    }

    const loadMore = () => {
        setLoading(true)
        getHome(page)
    }

    return (
        <div>
            <PopUp message={msg} visible={visible} />
            <div >
                {
                    posts ? (
                        <>
                            <div className='home'>
                                {
                                    posts.map((post) => {
                                        return (
                                            <Card key={post._id} id={post._id} title={post.title} description={post.description}
                                                by={post.authorId.username} />
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
                                            flexDirection:"column",
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

        </div>
    )
}

export default Index;