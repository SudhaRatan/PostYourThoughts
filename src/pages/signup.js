import SignupForm from "../components/signupForm";
import "./pageStyle.css"

const Signup = () => {
  return (
    <div className="post-form">
      <h1 style={{
        margin:"20px"
      }}>Signup</h1>
      <div style={{
      }}>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup;