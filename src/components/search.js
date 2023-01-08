import imgg from "./search.png"
import { useState } from "react"
import axios from "axios"

const SearchBar = () => {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.value)
    if (search !== "" && search != null) {
      
    }
  }

  return (
    <div style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      padding: "10px",

    }}>
      <div style={{
        // backgroundColor: "white",
        flex: "1",
        display: "flex",
        border: "1px solid #80808080",
        borderRadius: "10px"
      }}>
        <input
          onChange={handleChange}
          value={search}
          name="search"
          style={{
            flex: "1",
            // margin: "5px",
            outline: "none",
            fontSize: "18px",
            padding: "10px",
            backgroundColor: "#20212450",
            backdropFilter: "blur(10px)",
            color: "#808080",
            border: "none",
            borderRadius: "10px",
          }} type="text" placeholder="Search author names" />
        <div
          style={{
            display: "grid",
            padding: "5px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }} >
          <img
            style={{
              opacity: "0.4",
              backdropFilter: "blur(5px)",
              width: "30px",
            }}
            src={imgg}
            alt="Search"
          />
        </div>

      </div>
    </div>
  )
}

export default SearchBar;