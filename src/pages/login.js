import LoginForm from "../components/loginForm";
import "./pageStyle.css"

const Login = () => {
  return (
    <div className="post-form">
      <h1 style={{margin:"20px"}}>Login</h1>
      <div style={{margin:"20px"}}>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;