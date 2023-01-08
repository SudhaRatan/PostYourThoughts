const PopUp = (props) => {
  // console.log(props)
  return(
    <div style={{
      textAlign:"center",
      zIndex:"12",
      position: "absolute",
      color: "white",
      width:"100%",
      backgroundColor:"#00000060",
      boxSizing:"border-box",
      margin:"5px",
      // transform:"translateY(30px)",
      backdropFilter:"blur(5px)",
      visibility:props.visible ? "visible" : "hidden"
      
    }}>
      <h1>{props.message}</h1>
    </div>
  )
}
export default PopUp;