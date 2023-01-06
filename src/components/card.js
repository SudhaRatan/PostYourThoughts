import "./componentStyle.css"
import img from "./card-img.png"

const data = {
  title: "Title 1",
  desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae saepe magni perferendis enim deserunt at, sunt, reiciendis consectetur inventore, eligendi repudiandae explicabo sint et eveniet! Et placeat quibusdam nulla officiis?",
  author: "Author 1",
  Aid: "1",
}

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-img">
        <img className="imgCard"  alt="Card Img" src={props.imageData} />
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