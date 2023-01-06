import PostForm from "../components/postForm";
import "./pageStyle.css"

const Post = () => {
    return (
        <div className="post-form">
            <h1>Post your thoughts</h1>
            <div>
                Please post landscape images instead of portrait
            </div>
            <PostForm />
        </div>
    )
}

export default Post;