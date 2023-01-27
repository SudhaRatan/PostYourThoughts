import "./componentStyle.css"

const MyButton = (props) => {

  const st = {
    btn:{
      color:`${props.color}`,
      height:`${props.height}`,
      display:"grid",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:"10px",
      fontSize:"20px",
      border:"1px solid #80808080",
      padding:props.padding ? props.padding : null,
      cursor:"pointer",
    }
  }

  return (
    
    <div style={st.btn} className="my-button" onClick={props.onClick}>
      {props.title}
    </div>
  )
}

export default MyButton;