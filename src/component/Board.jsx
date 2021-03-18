import { useState } from "react";
import Card from "./Card";

// shuffle the cardValue array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// method to check {} is empty or not
function isObjectEmpty(value) {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}"
  );
}

function Board() {
  const cardLevel = 16;
  const card = [];

  // initialinzing state
  const [cardDeck, setCardDeck] = useState(card);
  const [compareCardArr, setCompareCardArr] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [heading, setHeading] = useState("Memory Game!");
  const [pairCounter, setPairCounter] = useState(1);
  const [movesCounter, setMovesCounter] = useState(0);

  // creating values of the card
  const createCardValue = (cardLevel) => {
    for (let i = 1; i <= cardLevel; i++) {
      card.push({
        flip: false,
        value: Math.ceil(i / 2),
      });
    }
  };

  createCardValue(cardLevel); // generating card value
  shuffle(card); //initial game start

  // resetting game state on game over and on reset button click
  const restartGame = () => {
    resetGame();
    setHeading("Memory Game!");
    setGameOver(false);
  };

  const resetGame = () => {
    shuffle(card);
    setCardDeck(card);
    setCompareCardArr({});
    setPairCounter(1);
    setMovesCounter(0);
  };

  // function to check game is ended or not
  const gameEnd = () => {
    if (pairCounter >= cardLevel / 2) {
      setHeading("Congratulation you Won!");
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
        setMovesCounter(movesCounter + 1);
        console.log("Match Found", pairCounter);
        gameEnd();
        return {};
      } else {
        setMovesCounter(movesCounter + 1);
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
      <header className="board-header">
        <h2 className="board-heading score">Moves: {movesCounter}</h2>
        <h2 className="board-heading">{heading}</h2>

        <button className="btn" onClick={resetGame} disabled={gameOver}>
          Reset
        </button>
      </header>
      <div className="board-body">
        {gameOver ? (
          <div className="winnerContainer">
            <iframe
              title="winner Gif"
              src="https://giphy.com/embed/l0HlSDiA6WUytl9oA"
              className="winnerGif"
            ></iframe>
            <button className="btn" onClick={restartGame}>
              Play Again
            </button>
          </div>
        ) : (
          <div className="board-game">
            {cardDeck.map((item, id) => (
              <Card
                key={id}
                cardDeck={cardDeck}
                {...item}
                id={id}
                compareCardArr={compareCardArr}
                setCompareArr={setCompareArr}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Board;
