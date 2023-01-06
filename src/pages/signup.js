import SignupForm from "../components/signupForm";
import "./pageStyle.css"

const Signup = () => {
  return (
    <div className="post-form">
      <h1 style={{
        transform:"translateY(-40px)"
      }}>Signup</h1>
      <div style={{
        transform:"translateY(-100px)"
      }}>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup;