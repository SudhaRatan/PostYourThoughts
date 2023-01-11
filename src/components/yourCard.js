import Card from "./card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgg from "./options.png";
import deleteButton from "./delete.png"
import editButton from "./edit.png"
import axios from "axios";
import { API } from "../App";


const YourCard = (props) => {
  axios.defaults.headers.get['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.post['x-access-token'] = localStorage.getItem('token')
  axios.defaults.headers.delete['x-access-token'] = localStorage.getItem('token')

  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const deleteFunc = () => {
    // console.log(props.id)
    axios
      .delete(`${API}/post/your/${props.id}`, { data: props.id })
      .then((res) => {
        if (res.data.stat) {
          props.change(props.id)
        }
      })
  }

  const editFunc = async () => {
    // console.log("Edit")
    navigate("/post", { state: { id: props.id } })
  }

  return (
    <div style={{
      position: "relative"
    }}>
      <Card
        title={props.title} description={props.description} imageData={props.imageData} by={props.by}
      />
      <div style={{
        visibility: visible ? "visible" : "hidden",
        position: "absolute",
        top: "0",
        transform: "translateY(-15px)",
        // backgroundColor: "#202124",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "300px",
        color: "#808080",
      }}>
        <div style={{
          backgroundColor: "#20212499",
          backdropFilter: "blur(10px)",
          width: "100%",
          display: "flex",
          gap: "50px",
          borderRadius: "10px",
          boxShadow: "5px 5px 10px 1px #00000050",
          // opacity:0.5,
        }}>
          <div style={st.btn} onClick={deleteFunc}>
            <img style={{ padding: "80px 50px" }} src={deleteButton} alt="delete" />
            <div style={st.btnText}>Delete</div>
          </div>
          <div style={st.btn} onClick={editFunc}>
            <img style={{ padding: "80px 50px" }} src={editButton} alt="edit" />
            <div style={st.btnText}>Edit</div>
          </div>
        </div>
      </div>
      <div>
        <img
          onClick={() => setVisible(!visible)}
          style={{
            position: "absolute",
            bottom: "0",
            transform: "translateY(-30px)",
            marginLeft: "30px",
            cursor: "pointer",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            opacity: "0.4",
            backdropFilter: "blur(10px)",
          }} src={imgg} alt="options" />
      </div>
    </div>
  )
}

export default YourCard;

const st = {
  btn: {
    textAlign: "center",
    cursor: "pointer",
  },
  btnText: {
    color: "#a7a7a7",
    transform: "translateY(-80px)",
  }
}