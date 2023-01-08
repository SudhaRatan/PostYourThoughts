import PostForm from "../components/postForm";
import "./pageStyle.css"
import { useLocation } from "react-router-dom";

const Post = () => {

    const location = useLocation()

    return (
        <div className="post-form">
            <h1>Post your thoughts</h1>
            <div>
                Please post landscape images instead of portrait
            </div>
            <PostForm data={location.state} />
        </div>
    )
}

export default Post;