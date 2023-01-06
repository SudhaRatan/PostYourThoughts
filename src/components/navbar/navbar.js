import { Link } from "react-router-dom"
import "../componentStyle.css"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
	const navigate = useNavigate()

	const logout = async() => {
		await localStorage.removeItem("token")
		navigate("/")
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<ul className="nav">
				<li className="Nav-Link"><Link className="Link" to="/" >Home</Link></li>
				<li className="Nav-Link"><Link className="Link" to="/post" >Post</Link></li>
				<li className="Nav-Link"><Link className="Link" to="/yourposts">Your Posts</Link></li>
				{
					localStorage.getItem('token') ? (
						<li className="Nav-Link" ><div className="Link" onClick={logout}>Logout</div></li>
					) : (
						<li className="Nav-Link"><Link className="Link" to={"/login"}>Login</Link></li>
					)
				}

			</ul>
		</div>
	)
}
export default Navbar;