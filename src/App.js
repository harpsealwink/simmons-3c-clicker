import React, { useState, useEffect } from "react";
import ReactHover, { Trigger, Hover } from 'react-hover'

import './App.css';
import ShopItem from "./ShopItem.js";
import ClickerItem from "./ClickerItem";
import Popup from './Popup';
import TinySeal from "./TinySeal";

import thonk from "./assets/thonk.png";
import graceok from "./assets/graceok.png";
import gymmons from "./assets/gymmons.JPG";
import gingerbread from "./assets/gingerbread.png";
import snacks from "./assets/snacks.png";
import bears from "./assets/bears.png";
import hangseal from "./assets/hangseal.png";
import message from "./assets/message.png";


function App() {
  const [harpSeals, setHarpSeals] = useState(0);
  const [clickerValue, setClickerValue] = useState(1);
  const [tinySeals, setTinySeals] = useState([]); 
  const [incRate, setIncRate] = useState(0);

  // increase harp seals by clicking
  const increaseHarpSeals = () => {
    setHarpSeals(parseInt(harpSeals) + clickerValue);
    setTinySeals(tinySeals.concat(<TinySeal/>)); // new tiny seal pops up
    setTimeout(() => {setTinySeals(tinySeals.slice(1))}, 500); // remove tiny seal after half a second
    console.log(tinySeals)
  };
  // increase harp seals without clicking (when shop items are bought)
  const incrementSeals = (time, cost) => {
    // check if enough seals are owned to purchase item
    if ((parseInt(harpSeals) - cost) >= 0) {
      setHarpSeals(parseInt(harpSeals) - cost);
      // set the increase rate
      setIncRate(incRate + time);
    }
    else {
      // window.alert("You do not possess enough harp seals to purchase this item!");
    };
  };
  // increase clicker worth (when clicker shop items are bought)
  const increaseClicker = (inc, cost) => {
    if ((parseInt(harpSeals) - cost) >= 0) {
      setHarpSeals(parseInt(harpSeals) - cost);
      setClickerValue(clickerValue+inc);
    }
  };

  // change harp seal increase rate when incRate changes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      setHarpSeals(harpSeals => harpSeals + (incRate/100))
    }, 10);
    return () => clearInterval(interval);
  }, [incRate]); 

  // set hovering options for shop items
  const HoverOptions = {
    followCursor: true,
    shiftX: -103,
    shiftY: 40,
  };
  const HoverOptions2 = {
    followCursor: true,
    shiftX: -103,
    shiftY: 40,
  };

  

  return (
    <div className="App">
      <div className="App-leftColumn"> 
      <div className="App-shopTitle"> clicker shop </div>
        <div className="App-shopItem">
        <ReactHover options={HoverOptions}>
           <Trigger type="trigger">
            <ClickerItem harpSeals={harpSeals} 
              image={thonk} itemName="thonkers" 
              itemYield="1" itemCost="210" 
              incFunc={() => {increaseClicker(1, 210);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="Who knows what this does? Thonk."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions}>
           <Trigger type="trigger">
           <ClickerItem harpSeals={harpSeals} 
            image={snacks} itemName="snack drawer" 
            itemYield="5" itemCost="990" 
            incFunc={() => {increaseClicker(5, 990);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="After consuming 3 million snacks, you 
               possess the energy and power to click the harp seal with 
               greater force, generating additional seals every click."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions}>
           <Trigger type="trigger">
           <ClickerItem harpSeals={harpSeals} 
            image={bears} itemName="pile o' bears" 
            itemYield="20" itemCost="3660" 
            incFunc={() => {increaseClicker(20, 3660);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="You recruit the pile of giant stuffed bears 
               to help you click the seals. They have big fingertips (paws?)
               and succeed to an extent far exceeding your expectations."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions}>
           <Trigger type="trigger">
           <ClickerItem harpSeals={harpSeals} 
            image={hangseal} itemName="hanging seal" 
            itemYield="50" itemCost="8220" 
            incFunc={() => {increaseClicker(50, 8220);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="Only a seal would know how to click seals
               best. Maybe it flops its blubbery body to click, maybe it 
               shoots a laser from its eyes to generate 50 more seals per 
               click. But to this day, nobody understands the true 
               capabilities of this almighty hanging seal. "/>
           </Hover>
       </ReactHover>
        </div>
      </div>

      <div className="App-middleColumn">
        <div className="App-title noselect">
          Simmons 3C Clicker
        </div>
        <div className="App-mainRect">
          <div className="App-harpSeals noselect">harp seals: {parseInt(harpSeals)}</div>
          <div 
          className="App-mainImage" 
          onClick={() => {increaseHarpSeals();}}/> 
        </div>
        <div className="placeholder"></div>
        {/* {isOpen && <TinySeal/>} */}
        {tinySeals}
      </div>

      <div className="App-rightColumn">
        <div className="App-shopTitle"> item shop </div>
        <div className="App-shopItem">
        <ReactHover options={HoverOptions2}>
           <Trigger type="trigger">
            <ShopItem harpSeals={harpSeals} 
            image={message} itemName="chalk message" 
            itemYield="0.1" itemCost="18" 
            incFunc={() => {incrementSeals(0.1, 18);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="What's that!? A message on the 
               wall? I wonder what it says..."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions2}>
           <Trigger type="trigger">
            <ShopItem harpSeals={harpSeals}
            image={graceok} itemName="grace is ok" 
            itemYield="1" itemCost="160"
            incFunc={() => {incrementSeals(1, 160);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="Grace is okay, so she clicks one 
               seal per second."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions2}>
           <Trigger type="trigger">
            <ShopItem harpSeals={harpSeals}
            image={gingerbread} itemName="gingerbread" 
            itemYield="10" itemCost="1250"
            incFunc={() => {incrementSeals(10, 1250);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="In this Halloween-themed gingerbread
               house, we have: 1) bright orange frosting, 2) a bunch 
               of other yummy treats, and 3) a humble setting where 
               automatic harp seal clicks are generated."/>
           </Hover>
       </ReactHover>
        </div>

        <div className="App-shopItem">
        <ReactHover options={HoverOptions2}>
           <Trigger type="trigger">
            <ShopItem harpSeals={harpSeals}
            image={gymmons} itemName="gymmons meme" 
            itemYield="100" itemCost="9000"
            incFunc={() => {incrementSeals(100, 9000);}}/>
           </Trigger>
           <Hover type="hover">
               <Popup popupInfo="This time-honored artifact of the 
               Simmons 3C lounge is here to stay. Forever. In the 
               meantime, it generates 100 seals per second out of 
               pure epicness."/>
           </Hover>
       </ReactHover>
        </div>
      </div>
    </div>
  );
}

export default App;
