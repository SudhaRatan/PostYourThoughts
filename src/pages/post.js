import PostForm from "../components/postForm";
import "./pageStyle.css"

const Post = () => {
    return (
        <div className="post-form">
        <h1>Post your thoughts</h1>
            <PostForm />
        </div>
    )
}

export default Post;