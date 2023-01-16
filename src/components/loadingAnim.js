import { TrinitySpinner } from "loading-animations-react"

export default function Loading(){
    return (
        <div style={{display:"grid",justifyContent:"center",alignItems:"center",margin:"auto",height:"fit-content"}}>
                    <div style={{ height: "50px", width: "50px",padding:"50px"}}>
                        <TrinitySpinner color="#808080" text="" />
                    </div>
                </div>
    )
}