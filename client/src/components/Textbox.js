import React from "react";

function Textbox(props) {
  return (
    <form>
      <input
        style={{...props.style}} 
        type="text"
        placeholder={props.title} 
      />
    </form>
  );
}


export default Textbox;
