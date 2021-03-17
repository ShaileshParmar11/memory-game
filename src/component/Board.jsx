import { useState } from "react";
import Card from "./Card";

const cardValue = [];
const cardLevel = 8;
let card = [];

// creating values of the card
const createCardValue = (cardLevel) => {
  for (let i = 1; i <= cardLevel; i++) {
    cardValue.push(Math.ceil(i / 2));
  }
};

// shuffle the cardValue array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// creating card
const createCards = (cardValue) => {
  for (let i = 0; i < cardValue.length; i++) {
    card.push({
      flip: false,
      value: cardValue[i],
      id: i, // id updated
    });
  }
};

const createGame = () => {
  createCardValue(cardLevel);
  shuffle(cardValue);
  createCards(cardValue);
};

createGame();

function Board() {
  const [cardDeck, setCardDeck] = useState(card);
  const [compareCardArr, setCompareCardArr] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [pairCounter, setPairCounter] = useState(1);

  // method to check {} is empty or not
  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }
  // function to check game is ended or not
  const gameEnd = () => {
    if (pairCounter >= cardLevel / 2) {
      setGameOver(true);
    }
  };

  const setCompareArr = (newState) => {
    // updating CardDeck value according to new state value
    setCardDeck(
      cardDeck.map((item, id) => {
        if (id === newState.id) {
          item.flip = newState.flip;
          return item;
        } else {
          return item;
        }
      })
    );

    // comparring previous click with new click and assigning value accordingly
    setCompareCardArr((preState) => {
      if (isObjectEmpty(preState)) {
        return newState; // prev state is empty so returing new state value
      } else if (preState.id === newState.id) {
        return preState; // prev click and new click on same card, returning same value
      } else if (preState.value === newState.value) {
        setPairCounter(pairCounter + 1); // increasing pairCounter if preValue and newValue is same.
        console.log("Match Found", pairCounter);
        gameEnd();
        return {};
      } else {
        setTimeout(() => {
          // setting card value to previous state as pair is not found
          setCardDeck(
            cardDeck.map((item, id) => {
              if (id === preState.id || id === newState.id) {
                item.flip = false;
                return item;
              } else {
                return item;
              }
            })
          );
        }, 500);
        return {};
      }
    });
  };

  return (
    <>
      <header>
        <h2 className="board-heading">
          {gameOver ? "Congratulation you Won!" : "Memory Game!"}
        </h2>
      </header>
      <div className="board">
        {cardDeck.map((item, id) => (
          <Card
            key={id}
            cardDeck={cardDeck}
            {...item}
            compareCardArr={compareCardArr}
            setCompareArr={setCompareArr}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
