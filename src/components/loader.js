import { PushSpinner } from "react-spinners-kit";
import "./componentStyle.css"

const Loader = (props) => {
  return (
    <div className="spinner" style={{ visibility: props.loading ? "visible" : "hidden" }}>
      <PushSpinner className="sp" size={30} color="#FF8820" loading={props.loading} />
    </div>
  )
}

export default Loader;