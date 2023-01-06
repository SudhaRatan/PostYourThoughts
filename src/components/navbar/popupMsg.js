const PopUp = (props) => {
  // console.log(props)
  return(
    <div style={{
      textAlign:"center",
      zIndex:"12",
      position: "absolute",
      color: "white",
      width: "50vh",
      backgroundColor:"#00000080",
      boxSizing:"border-box",
      margin:"5px",
      borderRadius:"20px",
      // transform:"translateY(30px)",
      backdropFilter:"blur(10px)",
      visibility:props.visible ? "visible" : "hidden"
      
    }}>
      <h1>{props.message}</h1>
    </div>
  )
}
export default PopUp;