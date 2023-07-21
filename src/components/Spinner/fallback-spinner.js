import { CircularProgress } from "@mui/material";
import React from "react";

function Spinner() {
  return (
    <div style={{ height:"100vh",display: "flex", justifyContent:"center", alignItems:"center"}}>
     
      <CircularProgress size={80} />
    </div>
  );
}

export default Spinner;
