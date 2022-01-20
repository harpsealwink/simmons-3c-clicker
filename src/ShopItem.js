import React, { useState } from "react";
import './ShopItem.css';
import './App.css';

function ShopItem(props) {
    const [numOwned, setNumOwned] = useState(0); // number owned of a specific shop item 

    const click = () => {
        props.incFunc();
        // check if enough seals are owned to purchase item
        if ((parseInt(props.harpSeals) - parseInt(props.itemCost)) >= 0) {
            setNumOwned(numOwned + 1);
            console.log(numOwned)
        }
    };

  return (
    <div
    className="ShopItem-container noselect" onClick={() => {click();}}>
        <img src={props.image} alt={props.itemName} className="ShopItem-image"/>

        <div className="ShopItem-textContainer">
            <div className="ShopItem-itemName">{props.itemName}</div>
            <div className="ShopItem-description"> 
                <div> +{props.itemYield} seals per second </div>
                <div> cost: {props.itemCost} seals </div>
                <div> owned: {numOwned} </div>
            </div>
        </div>
    </div>
  );
}

export default ShopItem;