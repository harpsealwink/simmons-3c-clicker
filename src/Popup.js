import React from "react";
import './Popup.css';
import './App.css';

function Popup(props) {
  return (
    <div className="Popup-container">
        <div className="Popup-text">
            {props.popupInfo}
        </div>
    </div>
  );
}

export default Popup;