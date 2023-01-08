import "./componentStyle.css"

const Card = (props) => {
  return (
    <div className="card" onClick={props.onClick}>
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