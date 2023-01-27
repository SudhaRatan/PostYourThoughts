import "./componentStyle.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../App";
import Loading from "./loadingAnim";

const Card = (props) => {

  const [img, setImg] = useState(null)

  useEffect(() => {
    axios
      .get(`${API}/home/images/${props.id}`)
      .then(res => {
        setImg(res.data.imageData)
        // console.log(res)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card" onClick={props.onClick}>
      <div className="card-img">
        {
          img ? <img className="imgCard" alt="Card Img" src={img} /> :
            <div>
              <Loading />
            </div>

        }

      </div>
      <div className="card-body">
        <div className="card-title"><b>{props.title}</b></div>
        <div className="card-desc">{props.description}</div>
        <div className="card-author">- {props.by}</div>
      </div>
    </div>
  )
}

export default Card;