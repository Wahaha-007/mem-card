import React, { useState, useLayoutEffect, useEffect } from "react";
import './App.css';

// 16 Dec 2021, 

const App = () => {

  const totalPos = [4, 6, 10, 12];
  let pickedCard = [];

  // let pos = {}; if place temp var here, the value with always = the last assignment in final loop !

  const [posArray, setPosArray] = useState([]);
  const [glevel, setGlevel] = useState(0);
  const [bestMark, setBestmark] = useState(0);
  const [mark, setMark] = useState(0);
  const [mtext, setMtext] = useState("Start !");

  useEffect(() => {

    placeCard();

  }, []);

  const genCard = (numOfPos) => {

    // 1. Generate array of cards

    let tempPosArray = [];

    // Generate random location
    const cName = ["Obanai", "Tanjiro", "Zenitsu", "Inosuke",
      "Nezuko", "Giyu", "Sakonji", "Mitsuri",
      "Kanae", "Kanao", "Aoi", "Kyojuro"];

    let cardList = [];
    let cCard = 0;

    for (let i = 0; i < numOfPos; i++) {

      let pos = {};  // Must be here under this scope, if place outer scope, the result will be wrong ! 16 Dec 21

      do {
        cCard = Math.floor((Math.random() * numOfPos));
      } while (cardList.indexOf(cCard) !== -1) // Value aready exist !

      cardList.push(cCard);

      pos.id = i;
      pos.cardId = cCard;
      pos.cardName = cName[cCard];
      pos.output = <Card key={pos.id} cid={pos.cardId} cname={pos.cardName} onClickCard={clickCard} />;

      // console.log(pos);

      tempPosArray.push(pos);
    }

    //console.log(tempPosArray);

    // 2. Copy value of array to state var

    setPosArray(tempPosArray);

    //console.log(posArray);
  }

  const placeCard = () => {
    genCard(totalPos[glevel]);
  }

  const upLevel = () => {
    setGlevel(glevel + 1);
  }

  useEffect(() => {   // Just secure Level update

    setMark(0);
    setBestmark(0);

    pickedCard = [];
    placeCard();

  }, [glevel]);


  useLayoutEffect(() => {  // Just secure Mark update

    if (mark >= bestMark) setBestmark(mark);


    if (mark == totalPos[glevel]) { // You pass the level
      if (glevel < 3) {   // Proceeed to the next level

        setMtext(`You are trying to pick ${totalPos[glevel + 1]} different cards! `);
        setGlevel(prev => prev + 1);

      } else {

        setMtext(`You pass all levels !`);

        setMark(0);
        pickedCard = [];
        placeCard();

        // Clear all var or ask user to press F5 
      }
    } else {
      // Do nothing, just play the game
    }

  }, [mark]);

  const clickCard = (n) => {

    if (pickedCard[n] == null) { // Good pick

      pickedCard[n] = 1;

      setMark(prev => prev + 1);

      placeCard();

    } else { // Bad pick

      setMtext(`Oopps, this card was picked ! Try again.`);

      setMark(0);
      pickedCard = [];
      placeCard();
    }
  }

  return (
    <div className="mcenter">
      <h1><i>Memory Card</i></h1>
      <h3>Current Level : {glevel}</h3>
      <h3>Current Mark / Best : {mark} / {bestMark}</h3>
      <p>{mtext}</p>
      <div className="container">
        {posArray.map(ele => ele.output)}
      </div>
    </div>
  );
}

const Card = (props) => {

  return (
    <div className="card2" onClick={e => props.onClickCard(props.cid)}>
      <img src={`./pic/${props.cid}.jpg`} alt={`${props.cid}`} />
      <p className="cName">{props.cname}</p>
    </div>
  );
}

export default App;