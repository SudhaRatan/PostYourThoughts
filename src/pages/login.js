import LoginForm from "../components/loginForm";
import "./pageStyle.css"

const Login = () => {
  return (
    <div className="post-form">
      <h1 style={{
        transform:"translateY(-40px)"
      }}>Login</h1>
      <div style={{
        transform:"translateY(-100px)"
      }}>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;