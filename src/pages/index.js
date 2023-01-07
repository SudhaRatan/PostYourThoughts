import './pageStyle.css'
import Card from '../components/card';
import PopUp from '../components/navbar/popupMsg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import Loader from '../components/loader';


const Index = () => {
    // const navigate = useNavigate()
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [msg, setMsg] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        try {
            // console.log(location.state)
            axios
                .get(`${API}/home`)
                .then((res) => {
                    // console.log("called")
                    try {
                        console.log(res.data.posts)
                        setPosts(res.data.posts)

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

    }, [location]);

    return (
        <div>
            <PopUp message={msg} visible={visible} />
            <div className='home'>
                {
                    posts ? (
                        posts.map((post) => {
                            return (
                                <Card key={post._id} title={post.title} description={post.description} imageData={post.imageData} by={post.authorId.username} />
                            )
                        })

                    ) : <Loader loading={true} />
                }
            </div>

        </div>
    )
}

export default Index;