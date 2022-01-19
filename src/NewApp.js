/* if i ever decide to return to this project in the future, i'll try to 
fully implement session storage, which is partially implemented here in 
NewApp; i have it so far for harp seal count and harp seal increase rate 
but not shop/clicker items owned counts
 */

import React, { useState, useEffect } from "react";
import './App.css';
import ShopItem from "./ShopItem.js";

import thonk from "./thonk.png";
import graceok from "./graceok.png";
import gymmons from "./gymmons.png";


function App() {
  const [harpSeals, setHarpSeals] = useState(sessionStorage.getItem('localSeals'));
  const [clickerValue, setClickerValue] = useState(1);
  const [incRate, setIncRate] = useState(sessionStorage.getItem('sealIncRate'));


  // increase harp seals by clicking
  const increaseHarpSeals = () => {
    setHarpSeals(parseInt(harpSeals) + clickerValue);
  };
  // increase harp seals without clicking (when shop items are bought)
  const incrementSeals = (time, cost) => {
    // check if enough seals are owned to purchase item
    if ((parseInt(harpSeals) - cost) >= 0) {
      setHarpSeals(parseInt(harpSeals) - cost);  
      // set the increase rate
      setIncRate(parseFloat(incRate) + time);

      // increase seals
      setInterval(() => {
        setHarpSeals(harpSeals => parseInt(harpSeals) + 1)
      }, 1000/time);
    }
    else {
      // window.alert("You do not possess enough harp seals to purchase this item!");
    };
  };

  // retrieve the seal increase rate upon page reload
  useEffect(() => {
      setInterval(() => {
        setHarpSeals(harpSeals => parseInt(harpSeals) + 1)
      }, 1000/incRate);
  }, []);

  // store seal increase rate upon change in incRate
  useEffect(() => {
    sessionStorage.setItem("sealIncRate", incRate);
  }, [incRate]);

  useEffect(() => {
    setInterval(() => {
      sessionStorage.setItem("localSeals", harpSeals);
    }, 1000);
  }, [harpSeals]);

  // debugging for initial state when app is first started
  if (isNaN(sessionStorage.getItem('localSeals')) || 
    (harpSeals === null)) {
      sessionStorage.setItem("localSeals", 2000);
  };
  if (isNaN(sessionStorage.getItem('sealIncRate')) || 
  (incRate === null)) {
    sessionStorage.setItem("sealIncRate", 0.0000001);
};


  return (
    <div className="App">
      <div className="App-leftColumn"> </div>

      <div className="App-middleColumn">
        <div className="App-title noselect">
          Simmons 3C Clicker
        </div>
        <div className="App-mainRect">
          <div className="App-harpSeals noselect">harp seals: {harpSeals}</div>
          <div 
          className="App-mainImage" 
          onClick={() => {
            increaseHarpSeals();
          }}/> 
        </div>
        <div className="placeholder"></div>
      </div>

      <div className="App-rightColumn">
        <ShopItem harpSeals={harpSeals} _id="thonkers"
        image={thonk} itemName="thonkers" 
        itemYield="0.1" itemCost="18" 
        incFunc={() => {incrementSeals(0.1, 18);}}/>
        <ShopItem harpSeals={harpSeals} _id="grace is ok"
        image={graceok} itemName="grace is ok" 
        itemYield="1" itemCost="150" 
        incFunc={() => {incrementSeals(1, 150);}}/>
        <ShopItem harpSeals={harpSeals} _id="gymmons meme"
        image={gymmons} itemName="gymmons meme" 
        itemYield="10" itemCost="1000"
        incFunc={() => {incrementSeals(10, 1000);}}/>
      </div>
    </div>
  );
}

export default App;
